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
  transactionBuilder,
  unwrapOption,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMint,
  createSplAssociatedTokenProgram,
  createSplTokenProgram,
  findAssociatedTokenPda,
  SPL_SYSTEM_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
  setComputeUnitLimit,
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
import { PumpScience } from "../target/types/pump_science";
import {
  calculateFee,
  findEvtAuthorityPda,
  getTransactionEventsFromDetails,
  getTxDetails,
  getTxEventsFromTxBuilderResponse,
  logEvent,
} from "../clients/js/src/utils";
import { setParams } from "../clients/js/src/generated/instructions/setParams";
import { assertBondingCurve, assertGlobal } from "./utils";
import {
  getGlobalSize,
  getPlatformVaultSize,
} from "../clients/js/src/generated/accounts";
import { AMM } from "../clients/js/src/amm";
import { Pda, PublicKey } from "@metaplex-foundation/umi";
import {
  BanksClient,
  Clock,
  ProgramTestContext,
  start,
  startAnchor,
} from "solana-bankrun";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { AccountLayout } from "@solana/spl-token";
import { fetchToken } from "@metaplex-foundation/mpl-toolbox";

const INITIAL_SOL = 100 * LAMPORTS_PER_SOL;

const amman = Amman.instance({
  ammanClientOpts: { autoUnref: false, ack: true },
  knownLabels: {
    [PUMP_SCIENCE_PROGRAM_ID.toString()]: "PumpScienceProgram",
  },
});

// --- KEYPAIRS
const masterKp = fromWeb3JsKeypair(
  Web3JsKeypair.fromSecretKey(Uint8Array.from(require("../pump_key.json")))
);
const simpleMintKp = fromWeb3JsKeypair(Web3JsKeypair.generate());
const creator = fromWeb3JsKeypair(Web3JsKeypair.generate());
const trader = fromWeb3JsKeypair(Web3JsKeypair.generate());
const withdrawAuthority = fromWeb3JsKeypair(Web3JsKeypair.generate());

// --- PROVIDERS
let connection: Connection;
let rpcUrl = "http://127.0.0.1:8899";

let umi: Umi;

const loadProviders = async () => {
  process.env.ANCHOR_WALLET = "../pump_key.json";

  if (process.env.ANCHOR_PROVIDER_URL) {
    rpcUrl = process.env.ANCHOR_PROVIDER_URL;
  } else {
    process.env.ANCHOR_PROVIDER_URL = rpcUrl;
  }

  const provider = anchor.AnchorProvider.env();
  connection = provider.connection;
  anchor.setProvider(provider);
  umi = createUmi(rpcUrl);
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

async function processTransaction(umi, txBuilder: TransactionBuilder) {
  let txWithBudget = await transactionBuilder().add(
    setComputeUnitLimit(umi, { units: 600_000 })
  );
  const fullBuilder = txBuilder.prepend(txWithBudget);
  return await fullBuilder.sendAndConfirm(umi);
}

const getBalance = async (umi: Umi, pubkey: PublicKey) => {
  const umiBalance = await umi.rpc.getBalance(pubkey);
  return umiBalance.basisPoints;
};
const getTknAmount = async (umi: Umi, pubkey: PublicKey) => {
  const tkn = await fetchToken(umi, pubkey);
  return tkn.amount;
};

describe("pump-science", () => {
  before(async () => {
    await loadProviders();
    await labelKeypairs(umi);
    try {
      await Promise.all(
        [
          umi.identity.publicKey,
          creator.publicKey,
          withdrawAuthority.publicKey,
          trader.publicKey,
        ].map(async (pk) => {
          const res = await umi.rpc.airdrop(
            pk,
            createAmount(INITIAL_SOL, "SOL", 9),
            {
              commitment: "finalized",
            }
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  });

  it("is initialized", async () => {
    const adminSdk = new PumpScienceSDK(
      // admin signer
      umi.use(keypairIdentity(masterKp))
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
      umi.use(keypairIdentity(masterKp))
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
    const startingBalance = await connection.getMinimumBalanceForRentExemption(
      getPlatformVaultSize()
    );
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
      umi.use(keypairIdentity(masterKp))
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
});