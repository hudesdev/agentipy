import { Amman } from "@metaplex-foundation/amman-client";
import {
  keypairIdentity,
  createAmount,
  none,
  Keypair,
  createSignerFromKeypair,
  generateSigner,
  TransactionBuilder,
  Umi,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMint,
  createSplAssociatedTokenProgram,
  createSplTokenProgram,
  findAssociatedTokenPda,
  SPL_SYSTEM_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
  SPL_TOKEN_PROGRAM_ID,
} from "@metaplex-foundation/mpl-toolbox";
import {
  Connection,
  Keypair as Web3JsKeypair,
  LAMPORTS_PER_SOL,
  PublicKey as Web3JsPublicKey,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
  Keypair as Web3JsKp,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  createPumpScienceProgram,
  fetchGlobal,
  findGlobalPda,
  initialize,
  PUMP_SCIENCE_PROGRAM_ID,
  ProgramStatus,
  createBondingCurve,
  safeFetchBondingCurve,
  fetchBondingCurve,
  findBondingCurvePda,
  withdrawFees,
  swap,
  findBrandVaultPda,
  findCreatorVaultPda,
  findPlatformVaultPda,
  findPresaleVaultPda,
  claimCreatorVesting,
  fetchCreatorVault,
  PumpScienceSDK,
} from "../clients/js/src";
import {
  fromWeb3JsKeypair,
  fromWeb3JsPublicKey,
  toWeb3JsPublicKey,
  toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";
import { BankrunProvider } from "anchor-bankrun";
import {
  findMetadataPda,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import assert from "assert";
import * as anchor from "@coral-xyz/anchor";
import {
  INIT_DEFAULTS,
  SIMPLE_DEFAULT_BONDING_CURVE_PRESET,
} from "../clients/js/src/constants";
import { Program } from "@coral-xyz/anchor";
import {
  calculateFee,
  findEvtAuthorityPda,
  getTransactionEventsFromDetails,
  getTxDetails,
  getTxEventsFromTxBuilderResponse,
  logEvent,
} from "../clients/js/src/utils";
import { assertBondingCurve, assertGlobal } from "../tests/utils";
import { getGlobalSize } from "../clients/js/src/generated/accounts/global";
import { AMM } from "../clients/js/src/amm";
import { Pda, PublicKey, unwrapOption } from "@metaplex-foundation/umi";
import {
  BanksClient,
  Clock,
  ProgramTestContext,
  start,
  startAnchor,
} from "solana-bankrun";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { AccountLayout } from "@solana/spl-token";
import { readFileSync } from "fs";
import path from "path";
import { MPL_SYSTEM_EXTRAS_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox";

const USE_BANKRUN = true;
const INITIAL_SOL = 100 * LAMPORTS_PER_SOL;

const amman = Amman.instance({
  ammanClientOpts: { autoUnref: false, ack: true },
  knownLabels: {
    [PUMP_SCIENCE_PROGRAM_ID.toString()]: "PumpScienceProgram",
  },
});

// --- KEYPAIRS
const masterKp = fromWeb3JsKeypair(
  Web3JsKeypair.fromSecretKey(Uint8Array.from(require("../keys/test-kp.json")))
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
let rpcUrl = "http://127.0.0.1:8899";

let umi: Umi;

const programBinDir = path.join(__dirname, "..", ".programsBin");

function getProgram(programBinary) {
  return path.join(programBinDir, programBinary);
}
const loadProviders = async () => {
  process.env.ANCHOR_WALLET = "./keys/test-kp.json";
  console.log("using bankrun");
  bankrunContext = await startAnchor(
    "./",
    [
      // even though the program is loaded into the test validator, we need
      // to tell banks test client to load it as well
      // {
      //   name: "mpl_token_metadata",
      //   programId: toWeb3JsPublicKey(MPL_TOKEN_METADATA_PROGRAM_ID),
      // },
      // {
      //   name: "mpl_system_extras",
      //   programId: toWeb3JsPublicKey(MPL_SYSTEM_EXTRAS_PROGRAM_ID),
      // },
      // {
      //   name: "system_program",
      //   programId: toWeb3JsPublicKey(SPL_SYSTEM_PROGRAM_ID),
      // },
      // {
      //   name: "associated_token_program",
      //   programId: toWeb3JsPublicKey(SPL_ASSOCIATED_TOKEN_PROGRAM_ID),
      // },
      // {
      //   name: "token_program",
      //   programId: toWeb3JsPublicKey(SPL_TOKEN_PROGRAM_ID),
      // },
      // {
      //   name: "billy_bonding_curve",
      //   programId: toWeb3JsPublicKey(BILLY_BONDING_CURVE_PROGRAM_ID),
      // },
    ],
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
  // console.log("bankrunCtx: ", bankrunContext);
  bankrunClient = bankrunContext.banksClient;
  // console.log("bankrunClient: ", bankrunClient);
  bankrunProvider = new BankrunProvider(bankrunContext);
  // console.log("provider: ", provider);
  // console.log(provider.connection.rpcEndpoint);

  console.log("anchor connection: ", bankrunProvider.connection.rpcEndpoint);

  //@ts-ignore
  bankrunProvider.connection.rpcEndpoint = rpcUrl;
  const conn = bankrunProvider.connection;

  // rpcUrl = anchor.AnchorProvider.env().connection.rpcEndpoint;
  umi = createUmi(rpcUrl).use(web3JsRpc(conn));
  connection = conn;
  console.log("using bankrun payer");

  // umi.programs.add(createSplAssociatedTokenProgram());
  // umi.programs.add(createSplTokenProgram());
  // umi.programs.add(bondingCurveProgram);
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

const GLOBAL_STARTING_BALANCE_INT = 1524240; // cant getMinimumBalanceForRentExemption on bankrun
const PLATFORM_DISTRIBUTOR_STARTING_BALANCE_INT = 1169280;
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

  amman.addr.addLabel("creatorVault", curveSdk.creatorVaultPda[0]);
  amman.addr.addLabel(
    "creatorVaultTknAcc",
    curveSdk.creatorVaultTokenAccount[0]
  );

  amman.addr.addLabel("presaleVault", curveSdk.presaleVaultPda[0]);
  amman.addr.addLabel(
    "presaleVaultTknAcc",
    curveSdk.presaleVaultTokenAccount[0]
  );

  amman.addr.addLabel("brandVault", curveSdk.brandVaultPda[0]);
  amman.addr.addLabel("brandVaultTknAcc", curveSdk.brandVaultTokenAccount[0]);

  amman.addr.addLabel("platformVault", curveSdk.platformVaultPda[0]);
  amman.addr.addLabel(
    "platformVaultTknAcc",
    curveSdk.platformVaultTokenAccount[0]
  );
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
    const simRes = await bankrunClient.simulateTransaction(tx);
    // console.log("simRes: ", simRes);
    // console.log("simRes.logs: ", simRes.meta?.logMessages);
    // console.log(simRes.result);
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
    const txBuilder = adminSdk.initialize(INIT_DEFAULTS);

    await processTransaction(umi, txBuilder);

    const global = await adminSdk.PumpScience.fetchGlobalData();
    assertGlobal(global, INIT_DEFAULTS);
  });

  it("creates simple bonding curve", async () => {
    const curveSdk = new PumpScienceSDK(
      // creator signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    console.log("Curve PUBKEYS:");

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
    assertBondingCurve(bondingCurveData, {
      ...SIMPLE_DEFAULT_BONDING_CURVE_PRESET,
      complete: false,
    });
  });

  it("swap: buy", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(trader))
    ).getCurveSDK(simpleMintKp.publicKey);

    const bondingCurveData = await curveSdk.fetchData();
    console.log("bondingCurveData", bondingCurveData);
    const amm = AMM.fromBondingCurve(bondingCurveData);
    let minBuyTokenAmount = 100_000_000_000n;
    let solAmount = amm.getBuyPrice(minBuyTokenAmount);

    // should use actual fee set on global when live
    let fee = calculateFee(solAmount, INIT_DEFAULTS.tradeFeeBps);
    const solAmountWithFee = solAmount + fee;
    console.log("solAmount", solAmount);
    console.log("fee", fee);
    console.log("solAmountWithFee", solAmountWithFee);
    console.log("buyTokenAmount", minBuyTokenAmount);
    let buyResult = amm.applyBuy(minBuyTokenAmount);
    console.log("buySimResult", buyResult);

    const txBuilder = curveSdk.swap({
      direction: "buy",
      exactInAmount: solAmount,
      minOutAmount: minBuyTokenAmount,
    });

    await processTransaction(umi, txBuilder);

    // const events = await getTxEventsFromTxBuilderResponse(connection, program, txRes);
    // events.forEach(logEvent);

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
  it("swap: sell", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(trader))
    ).getCurveSDK(simpleMintKp.publicKey);

    const bondingCurveData = await curveSdk.fetchData();
    console.log("bondingCurveData", bondingCurveData);
    const traderAtaBalancePre = await getTknAmount(
      umi,
      curveSdk.userTokenAccount[0]
    );

    const amm = AMM.fromBondingCurve(bondingCurveData);
    let sellTokenAmount = 100_000_000_000n;
    let solAmount = amm.getSellPrice(sellTokenAmount);

    // should use actual fee set on global when live
    let fee = calculateFee(solAmount, INIT_DEFAULTS.tradeFeeBps);
    const solAmountAfterFee = solAmount - fee;
    console.log("solAmount", solAmount);
    console.log("fee", fee);
    console.log("solAmountAfterFee", solAmountAfterFee);
    console.log("sellTokenAmount", sellTokenAmount);
    let sellResult = amm.applySell(sellTokenAmount);
    console.log("sellSimResult", sellResult);
    const txBuilder = curveSdk.swap({
      direction: "sell",
      exactInAmount: sellTokenAmount,
      minOutAmount: solAmountAfterFee,
    });

    await processTransaction(umi, txBuilder);

    // Post-transaction checks
    const bondingCurveDataPost = await curveSdk.fetchData();
    const traderAtaBalancePost = await getTknAmount(
      umi,
      curveSdk.userTokenAccount[0]
    );
    assert(
      bondingCurveDataPost.realTokenReserves ==
      bondingCurveData.realTokenReserves + sellTokenAmount
    );
    assert(
      bondingCurveDataPost.realSolReserves ==
      bondingCurveData.realSolReserves - solAmount
    );
    assert(traderAtaBalancePost == traderAtaBalancePre - sellTokenAmount);
  });

  it("set_params: status:SwapOnly, withdrawAuthority", async () => {
    const adminSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
    ).getAdminSDK();

    const txBuilder = adminSdk.setParams({
      status: ProgramStatus.SwapOnly,
      newWithdrawAuthority: withdrawAuthority.publicKey,
    });

    // const txRes = await txBuilder.sendAndConfirm(umi);
    await processTransaction(umi, txBuilder);
    // const events = await getTxEventsFromTxBuilderResponse(connection, program, txRes);
    // events.forEach(logEvent)
    const global = await adminSdk.PumpScience.fetchGlobalData();

    assertGlobal(global, {
      ...INIT_DEFAULTS,
      status: ProgramStatus.SwapOnly,
      withdrawAuthority: withdrawAuthority.publicKey,
    });
  });

  it("withdraw_fees using withdraw_authority", async () => {
    // manually fetching here just to assert the amounts
    const platformVault = await findPlatformVaultPda(umi, {
      mint: simpleMintKp.publicKey,
    });
    const feeBalanceInt_total = await getBalance(umi, platformVault[0]);
    console.log("feeBalanceInt_total", feeBalanceInt_total);
    const startingBalance = PLATFORM_DISTRIBUTOR_STARTING_BALANCE_INT;
    const accruedFees = Number(feeBalanceInt_total) - startingBalance;
    assert(accruedFees > 0);
    const withdrawAuthBalance = await getBalance(
      umi,
      withdrawAuthority.publicKey
    );
    console.log("withdrawAuthBalance", withdrawAuthBalance);
    // withdrawing from platform vault
    const adminSdk = new PumpScienceSDK(
      // withdrawAuthority signer
      umi.use(keypairIdentity(withdrawAuthority))
    ).getAdminSDK();

    const txBuilder = adminSdk.withdrawFees(simpleMintKp.publicKey);

    await processTransaction(umi, txBuilder);
    // const events = await getTxEventsFromTxBuilderResponse(
    //   connection,
    //   program,
    //   txRes
    // );
    // events.forEach(logEvent);

    const global = await adminSdk.PumpScience.fetchGlobalData();

    assertGlobal(global, {
      ...INIT_DEFAULTS,
      status: ProgramStatus.SwapOnly,
      withdrawAuthority: withdrawAuthority.publicKey,
    });

    const feeBalancePost = await getBalance(umi, platformVault[0]);
    const feeBalancePost_int = Number(feeBalancePost);
    console.log("feeBalancePost_int", feeBalancePost_int);
    console.log("startingBalance", startingBalance);
    assert(feeBalancePost_int == startingBalance);
  });

  it("set_params: status:Running", async () => {
    const adminSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(fromWeb3JsKeypair(bankrunContext.payer)))
    ).getAdminSDK();

    const txBuilder = adminSdk.setParams({
      status: INIT_DEFAULTS.status,
    });

    await processTransaction(umi, txBuilder);
    //   const events = await getTxEventsFromTxBuilderResponse(connection, program, txRes);
    //   events.forEach(logEvent)
    const global = await adminSdk.PumpScience.fetchGlobalData();
    console.log("global", global);
    assertGlobal(global, {
      ...INIT_DEFAULTS,
    });
  });

  it("cant claim creator vesting before cliff", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    const txBuilder = curveSdk.claimCreatorVesting();
    try {
      await processTransaction(umi, txBuilder);
      assert(false);
    } catch (e) {
      // console.log(e);
      assert(true);
    }
  });

  it("can claim creator vesting after cliff", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    const bondingCurveData = await curveSdk.fetchData();

    const startTime = bondingCurveData.startTime;
    const cliff = bondingCurveData.vestingTerms.cliff;
    const secondToJumpTo = startTime + cliff + BigInt(24 * 60 * 60);

    const currentClock = await bankrunClient.getClock();
    bankrunContext.setClock(
      new Clock(
        currentClock.slot,
        currentClock.epochStartTimestamp,
        currentClock.epoch,
        currentClock.leaderScheduleEpoch,
        secondToJumpTo
      )
    );
    const txBuilder = curveSdk.claimCreatorVesting();

    await processTransaction(umi, txBuilder);

    const creatorVaultData = await fetchCreatorVault(
      umi,
      curveSdk.creatorVaultPda[0]
    );
    assert(creatorVaultData.lastDistribution == secondToJumpTo);
  });
  it("can claim creator again vesting after cliff", async () => {
    const curveSdk = new PumpScienceSDK(
      // trader signer
      umi.use(keypairIdentity(creator))
    ).getCurveSDK(simpleMintKp.publicKey);

    const creatorVaultData = await fetchCreatorVault(
      umi,
      curveSdk.creatorVaultPda[0]
    );
    const lastDistribution = creatorVaultData.lastDistribution;

    const secondToJumpTo = Number(lastDistribution) + Number(24 * 60 * 60);

    const currentClock = await bankrunClient.getClock();
    bankrunContext.setClock(
      new Clock(
        currentClock.slot,
        currentClock.epochStartTimestamp,
        currentClock.epoch,
        currentClock.leaderScheduleEpoch,
        BigInt(secondToJumpTo)
      )
    );

    const txBuilder = curveSdk.claimCreatorVesting();

    await processTransaction(umi, txBuilder);

    const creatorVaultDataPost = await fetchCreatorVault(
      umi,
      curveSdk.creatorVaultPda[0]
    );

    assert(creatorVaultDataPost.lastDistribution == BigInt(secondToJumpTo));
  });
});
