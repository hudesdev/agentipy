import { Amman } from "@metaplex-foundation/amman-client";
import {
  keypairIdentity,
  Keypair,
  TransactionBuilder,
  Umi,
  PublicKey,
  publicKey
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  SPL_SYSTEM_PROGRAM_ID, MPL_SYSTEM_EXTRAS_PROGRAM_ID
} from "@metaplex-foundation/mpl-toolbox";
import {
  Connection,
  Keypair as Web3JsKeypair,
  LAMPORTS_PER_SOL,
  PublicKey as Web3JsPublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  PUMP_SCIENCE_PROGRAM_ID,
  ProgramStatus,
  // findPlatformVaultPda,
  // fetchCreatorVault,
  PumpScienceSDK,
} from "../clients/js/src";
import { findBondingCurvePda } from "../clients/js/src";
import {
  fromWeb3JsKeypair,
  toWeb3JsPublicKey,
  toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";
import { BankrunProvider } from "anchor-bankrun";
import { SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, MPL_TOKEN_EXTRAS_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox";
import assert from "assert";
import {
  INIT_DEFAULTS,
  PUMPSCIENCE,
  SIMPLE_DEFAULT_BONDING_CURVE_PRESET
} from "../clients/js/src/constants";
import {
  calculateFee,
  getSolPriceInUSD
} from "../clients/js/src/utils";
import { assertBondingCurve, assertGlobal } from "../tests/utils";
import { AMM } from "../clients/js/src/amm";
import {
  BanksClient,
  Clock,
  ProgramTestContext,
  startAnchor,
} from "solana-bankrun";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { AccountLayout } from "@solana/spl-token";
import { readFileSync } from "fs";
import path from "path";
import { BN } from "bn.js";

const USE_BANKRUN = true;
const INITIAL_SOL = 100 * LAMPORTS_PER_SOL;

const amman = Amman.instance({
  ammanClientOpts: { autoUnref: false, ack: true },
  knownLabels: {
    [PUMP_SCIENCE_PROGRAM_ID.toString()]: "PumpScienceProgram",
  },
});
const MPL_TOKEN_METADATA_PROGRAM_ID = publicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
// --- KEYPAIRS
const web3Keypair = Web3JsKeypair.fromSecretKey(Uint8Array.from(require("../pump_key.json")))
const masterKp = fromWeb3JsKeypair(
  web3Keypair
);
const simpleMintKp = fromWeb3JsKeypair(Web3JsKeypair.generate());
const creator = fromWeb3JsKeypair(Web3JsKeypair.generate());
const trader = fromWeb3JsKeypair(Web3JsKeypair.generate());
const withdrawAuthority = fromWeb3JsKeypair(Web3JsKeypair.generate());

amman.addr.addLabel("withdrawAuthority", withdrawAuthority.publicKey);
amman.addr.addLabel("simpleMint", simpleMintKp.publicKey);
amman.addr.addLabel("creator", creator.publicKey);
amman.addr.addLabel("trader", trader.publicKey);

// --- PROVIDERS
let bankrunContext: ProgramTestContext;
let bankrunClient: BanksClient;
let bankrunProvider: BankrunProvider;
let connection: Connection;
let rpcUrl = "http://localhost:8899";

let umi: Umi;

const programBinDir = path.join(__dirname, "..", ".bin");

function getProgram(programBinary) {
  return path.join(programBinDir, programBinary);
}
const loadProviders = async () => {
  process.env.ANCHOR_WALLET = "../pump_key.json";
  bankrunContext = await startAnchor(
    "./",
    [],
    [
      {
        address: toWeb3JsPublicKey(masterKp.publicKey),
        info: {
          lamports: INITIAL_SOL,
          executable: false,
          data: Buffer.from([]),
          owner: toWeb3JsPublicKey(SPL_SYSTEM_PROGRAM_ID),
        },
      },
      {
        address: toWeb3JsPublicKey(creator.publicKey),
        info: {
          lamports: INITIAL_SOL,
          executable: false,
          data: Buffer.from([]),
          owner: toWeb3JsPublicKey(SPL_SYSTEM_PROGRAM_ID),
        },
      },
      {
        address: toWeb3JsPublicKey(trader.publicKey),
        info: {
          lamports: INITIAL_SOL,
          executable: false,
          data: Buffer.from([]),
          owner: toWeb3JsPublicKey(SPL_SYSTEM_PROGRAM_ID),
        },
      },
      {
        address: toWeb3JsPublicKey(withdrawAuthority.publicKey),
        info: {
          lamports: INITIAL_SOL,
          executable: false,
          data: Buffer.from([]),
          owner: toWeb3JsPublicKey(SPL_SYSTEM_PROGRAM_ID),
        },
      },
      {
        address: toWeb3JsPublicKey(MPL_TOKEN_METADATA_PROGRAM_ID),
        info: await loadBin(getProgram("mpl_token_metadata.so")),
      },
      {
        address: toWeb3JsPublicKey(MPL_SYSTEM_EXTRAS_PROGRAM_ID),
        info: await loadBin(getProgram("mpl_system_extras.so")),
      },
    ]
  );
  console.log("bankrunCtx: ", bankrunContext);
  bankrunClient = bankrunContext.banksClient;
  bankrunProvider = new BankrunProvider(bankrunContext);

  console.log("anchor connection: ", bankrunProvider.connection.rpcEndpoint);

  //@ts-ignore
  bankrunProvider.connection.rpcEndpoint = rpcUrl;
  const conn = bankrunProvider.connection;

  umi = createUmi(rpcUrl).use(web3JsRpc(conn));
  connection = conn;
  console.log("using bankrun payer");
};

export const loadBin = async (binPath: string) => {
  const programBytes = readFileSync(binPath);
  const executableAccount = {
    lamports: INITIAL_SOL,
    executable: true,
    owner: new Web3JsPublicKey("BPFLoader2111111111111111111111111111111111"),
    data: programBytes,
  };
  return executableAccount;
};

// pdas and util accs

const labelKeypairs = async (umi) => {
  amman.addr.addLabel("master", masterKp.publicKey);
  amman.addr.addLabel("simpleMint", simpleMintKp.publicKey);
  amman.addr.addLabel("creator", creator.publicKey);
  amman.addr.addLabel("trader", trader.publicKey);
  amman.addr.addLabel("withdrawAuthority", withdrawAuthority.publicKey);

  const curveSdk = new PumpScienceSDK(
    // master signer
    umi.use(keypairIdentity(masterKp))
  ).getCurveSDK(simpleMintKp.publicKey);

  amman.addr.addLabel("global", curveSdk.PumpScience.globalPda[0]);
  amman.addr.addLabel("eventAuthority", curveSdk.PumpScience.evtAuthPda[0]);
  amman.addr.addLabel("simpleMintBondingCurve", curveSdk.bondingCurvePda[0]);
  amman.addr.addLabel(
    "simpleMintBondingCurveTknAcc",
    curveSdk.bondingCurveTokenAccount[0]
  );
  amman.addr.addLabel("metadata", curveSdk.mintMetaPda[0]);

};

import { transactionBuilder } from "@metaplex-foundation/umi";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";

async function processTransaction(umi, txBuilder: TransactionBuilder) {
  let txWithBudget = await transactionBuilder().add(
    setComputeUnitLimit(umi, { units: 600_000 })
  );

  const fullBuilder = txBuilder.prepend(txWithBudget);
  if (USE_BANKRUN) {
    let tx: VersionedTransaction;
    try {
      const bhash = await bankrunClient.getLatestBlockhash();
      tx = toWeb3JsTransaction(
        await fullBuilder.setBlockhash(bhash?.[0] || "").build(umi)
      );
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
    return await bankrunClient.processTransaction(tx);
  } else {
    return await fullBuilder.sendAndConfirm(umi);
  }
}

const getBalance = async (umi: Umi, pubkey: PublicKey) => {
  // cannot use umi helpers in bankrun
  if (USE_BANKRUN) {
    const balance = await bankrunClient.getBalance(toWeb3JsPublicKey(pubkey));
    return balance;
  } else {
    const umiBalance = await umi.rpc.getBalance(pubkey);
    return umiBalance.basisPoints;
  }
};
const getTknAmount = async (umi: Umi, pubkey: PublicKey) => {
  // cannot use umi helpers and some rpc methods in bankrun
  if (USE_BANKRUN) {
    const accInfo = await bankrunClient.getAccount(toWeb3JsPublicKey(pubkey));
    const info = AccountLayout.decode(accInfo?.data || Buffer.from([]));
    return info.amount;
  } else {
    const umiBalance = await connection.getAccountInfo(
      toWeb3JsPublicKey(pubkey)
    );
    const info = AccountLayout.decode(umiBalance?.data || Buffer.from([]));
    return info.amount;
  }
};

describe("pump-science", () => {
  before(async () => {
    await loadProviders();
    await labelKeypairs(umi);
  });

  it("is initialized", async () => {
    const adminSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
    ).getAdminSDK();
    const solPrice = await getSolPriceInUSD();
    INIT_DEFAULTS.migrateFeeAmount = Math.floor(INIT_DEFAULTS.migrateFeeAmount / solPrice) * LAMPORTS_PER_SOL;

    const txBuilder = adminSdk.initialize(INIT_DEFAULTS);
    await processTransaction(umi, txBuilder);

    const global = await adminSdk.PumpScience.fetchGlobalData();
    assertGlobal(global, INIT_DEFAULTS);
  });

  it("is update wl: add", async () => {
    const wlSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
    ).getWlSDK(creator.publicKey);
  
    const txBuilder = wlSdk.addWl();
  
    await processTransaction(umi, txBuilder);
  
    const wl = await wlSdk.fetchWlData();
    console.log("whitelist data ===>>>", wl);
  });

  it("creates simple bonding curve", async () => {
    const curveSdk = new PumpScienceSDK(
      // creator signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    console.log("globalPda[0]", curveSdk.PumpScience.globalPda[0]);
    console.log("bondingCurvePda[0]", curveSdk.bondingCurvePda[0]);
    console.log("bondingCurveTknAcc[0]", curveSdk.bondingCurveTokenAccount[0]);
    console.log("metadataPda[0]", curveSdk.mintMetaPda[0]);

    const txBuilder = curveSdk.createBondingCurve(
      SIMPLE_DEFAULT_BONDING_CURVE_PRESET,
      // needs the mint Kp to create the curve
      simpleMintKp
    );

    await processTransaction(umi, txBuilder);

    const bondingCurveData = await curveSdk.fetchData();
    console.log("bondingCurveData", bondingCurveData);
  });

  it("is update wl: remove", async () => {
    const wlSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
    ).getWlSDK(creator.publicKey);

    const txBuilder = wlSdk.removeWl();

    await processTransaction(umi, txBuilder);

    const wl = await wlSdk.fetchWlData();
    console.log("whitelist data ===>>>", wl);
  });

  it("swap: buy", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    const bondingCurveData = await curveSdk.fetchData();
    const amm = AMM.fromBondingCurve(bondingCurveData);
    let minBuyTokenAmount = 793_100_000_000_000n // 100,000 Tokens -> 0.01% total supply
    let solAmount = amm.getBuyPrice(minBuyTokenAmount);

    // should use actual fee set on global when live
    console.log("solAmount", solAmount);
    console.log("buyTokenAmount", minBuyTokenAmount);
    let buyResult = amm.applyBuy(minBuyTokenAmount);
    console.log("buySimResult", buyResult);

    const txBuilder = curveSdk.swap({
      direction: "buy",
      exactInAmount: solAmount,
      minOutAmount: minBuyTokenAmount,
    });

    await processTransaction(umi, txBuilder);

    const bondingCurveDataPost = await curveSdk.fetchData();
    const traderAtaBalancePost = await getTknAmount(
      umi,
      curveSdk.userTokenAccount[0]
    );

    console.log("pre.realTokenReserves", bondingCurveData.realTokenReserves);
    console.log(
      "post.realTokenReserves",
      bondingCurveDataPost.realTokenReserves
    );
    console.log("buyTokenAmount", minBuyTokenAmount);
    const tknAmountDiff = BigInt(
      bondingCurveData.realTokenReserves -
      bondingCurveDataPost.realTokenReserves
    );
    console.log("real difference", tknAmountDiff);
    console.log(
      "buyAmount-tknAmountDiff",
      tknAmountDiff - minBuyTokenAmount,
      tknAmountDiff > minBuyTokenAmount
    );
    assert(tknAmountDiff > minBuyTokenAmount);
    assert(
      bondingCurveDataPost.realSolReserves ==
      bondingCurveData.realSolReserves + solAmount
    );
    assert(traderAtaBalancePost >= minBuyTokenAmount);
  });

  // it("swap: sell", async () => {
  //   const curveSdk = new PumpScienceSDK(
  //     // trader signer
  //     umi.use(keypairIdentity(creator))
  //   ).getCurveSDK(simpleMintKp.publicKey);

  //   const bondingCurveData = await curveSdk.fetchData();
  //   console.log("bondingCurveData", bondingCurveData);
  //   const traderAtaBalancePre = await getTknAmount(
  //     umi,
  //     curveSdk.userTokenAccount[0]
  //   );

  //   const amm = AMM.fromBondingCurve(bondingCurveData);
  //   let sellTokenAmount = 100_000_000_000n; // 100,000 Tokens -> 0.01% total supply
  //   let solAmount = amm.getSellPrice(sellTokenAmount);

  //   // should use actual fee set on global when live
  //   let fee = calculateFee(solAmount, 10_000);
  //   const solAmountAfterFee = solAmount - fee;
  //   console.log("solAmount", solAmount);
  //   console.log("fee", fee);
  //   console.log("solAmountAfterFee", solAmountAfterFee);
  //   console.log("sellTokenAmount", sellTokenAmount);
  //   let sellResult = amm.applySell(sellTokenAmount);
  //   console.log("sellSimResult", sellResult);
  //   const txBuilder = curveSdk.swap({
  //     direction: "sell",
  //     exactInAmount: sellTokenAmount,
  //     minOutAmount: solAmountAfterFee,
  //   });

  //   await processTransaction(umi, txBuilder);

  //   // Post-transaction checks
  //   const bondingCurveDataPost = await curveSdk.fetchData();
  //   const traderAtaBalancePost = await getTknAmount(
  //     umi,
  //     curveSdk.userTokenAccount[0]
  //   );
  //   assert(
  //     bondingCurveDataPost.realTokenReserves ==
  //     bondingCurveData.realTokenReserves + sellTokenAmount
  //   );
  //   assert(traderAtaBalancePost == traderAtaBalancePre - sellTokenAmount);
  // });

  // it("set_params: status:SwapOnly, migrateFeeAmount", async () => {
  //   const adminSdk = new PumpScienceSDK(
  //     // admin signer
  //     umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
  //   ).getAdminSDK();

  //   const txBuilder = adminSdk.setParams({
  //     status: ProgramStatus.SwapOnly,
  //     migrateFeeAmount: 500
  //   });

  //   await processTransaction(umi, txBuilder);
  //   const global = await adminSdk.PumpScience.fetchGlobalData();
  //   console.log("Global Data", global);

  //   assertGlobal(global, {
  //     ...INIT_DEFAULTS,
  //     status: ProgramStatus.SwapOnly,
  //   });
  // });


  // it("set_params: status:Running", async () => {
  //   const adminSdk = new PumpScienceSDK(
  //     // admin signer
  //     umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
  //   ).getAdminSDK();

  //   const txBuilder = adminSdk.setParams({
  //     status: INIT_DEFAULTS.status,
  //   });

  //   await processTransaction(umi, txBuilder);
  //   const global = await adminSdk.PumpScience.fetchGlobalData();
  //   console.log("global", global);
  //   assertGlobal(global, {
  //     ...INIT_DEFAULTS,
  //   });
  // });
});
