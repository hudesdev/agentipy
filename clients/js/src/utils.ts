import { Context, Pda, RpcConfirmTransactionResult, TransactionSignature, Umi, sol, PublicKey, publicKey } from '@metaplex-foundation/umi';
import { publicKey as publicKeySerializer, string } from '@metaplex-foundation/umi/serializers';
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey as pubkey } from '@solana/web3.js';
import { PROGRAM_ID, VAULT_SEED, WL_SEED } from './constants';
import {
  toWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { IdlEvent } from '@coral-xyz/anchor/dist/cjs/idl';
import { BN } from '@coral-xyz/anchor';
import {
  IDL as VaultIDL,
  VaultIdl,
  PROGRAM_ID as VAULT_PROGRAM_ID,
} from '@mercurial-finance/vault-sdk';
import { PumpScience } from './idls/pump_science';
import { PUMP_SCIENCE_PROGRAM_ID } from './generated/programs/pumpScience';
import { Amm as AmmIdl, IDL as AmmIDL } from './idl';
import {
  STAKE_FOR_FEE_PROGRAM_ID,
  IDL as StakeForFeeIDL,
  StakeForFee as StakeForFeeIdl,
} from '@meteora-ag/stake-for-fee';
import axios from 'axios';
export const calculateFee = (amount: bigint, feeBps: number): bigint => (amount * BigInt(feeBps)) / 10000n
const EVENT_AUTHORITY_PDA_SEED = "__event_authority";
export function findEvtAuthorityPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
): Pda {
  const programId = context.programs.getPublicKey('pumpScience', PUMP_SCIENCE_PROGRAM_ID);
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize(EVENT_AUTHORITY_PDA_SEED),
  ]);
}

export function findEvtAuthorityPdaRaw(

): [pubkey, number] {
  const programId = toWeb3JsPublicKey(PUMP_SCIENCE_PROGRAM_ID);
  const pda = pubkey.findProgramAddressSync([Buffer.from(EVENT_AUTHORITY_PDA_SEED)], programId);
  return pda
}

export function findWLPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
): Pda {
  const programId = context.programs.getPublicKey('pumpScience', PUMP_SCIENCE_PROGRAM_ID);
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize(WL_SEED),
  ]);
}


type EventKeys = keyof anchor.IdlEvents<PumpScience>;

const validEventNames: Array<keyof anchor.IdlEvents<PumpScience>> = [
  "GlobalUpdateEvent",
  "CreateEvent",
];

export const logEvent = (event: anchor.Event<IdlEvent, Record<string, string>>) => {
  const normalizeVal = (val: string | number | bigint | PublicKey | unknown) => {
    if (val instanceof BN || typeof val === 'number') {
      return Number(val.toString());
    }

    return val?.toString() || val;
  }
  const normalized = Object.fromEntries(Object.entries(event.data).map(([key, value]) => [key, normalizeVal(value)]));
  console.log(event.name, normalized);
}

export const getTxEventsFromTxBuilderResponse = async (conn: Connection, program: anchor.Program<PumpScience>, txBuilderRes: {
  signature: TransactionSignature;
  result: RpcConfirmTransactionResult;
}) => {
  const sig = bs58.encode(txBuilderRes.signature)
  return getTransactionEvents(conn, program, sig);
}

export const getTransactionEvents = async (conn: Connection, program: anchor.Program<PumpScience>, sig: string) => {
  const txDetails = await getTxDetails(conn, sig);
  return getTransactionEventsFromDetails(program, txDetails);
}

export const getTransactionEventsFromDetails = (
  program: anchor.Program<PumpScience>,
  txResponse: anchor.web3.VersionedTransactionResponse | null
) => {
  if (!txResponse) {
    return [];
  }

  const eventPDA = findEvtAuthorityPdaRaw()[0];

  const indexOfEventPDA =
    txResponse.transaction.message.staticAccountKeys.findIndex((key) =>
      key.equals(eventPDA)
    );

  if (indexOfEventPDA === -1) {
    return [];
  }

  const matchingInstructions = txResponse.meta?.innerInstructions
  ?.flatMap((ix) => ix.instructions)
  .filter(
    (instruction) =>
      instruction.accounts.length === 1 &&
      instruction.accounts[0] === indexOfEventPDA
  );

  if (matchingInstructions) {
    const events = matchingInstructions.map((instruction) => {
      const ixData = anchor.utils.bytes.bs58.decode(instruction.data);
      const eventData = anchor.utils.bytes.base64.encode(ixData.slice(8));
      const event = program.coder.events.decode(eventData);
      return event;
    });
    const isNotNull = <T>(value: T | null): value is T => value !== null
    return events.filter(isNotNull);
  }
  return [];
};

const isEventName = (
  eventName: string
): eventName is keyof anchor.IdlEvents<PumpScience> => validEventNames.includes(
  eventName as keyof anchor.IdlEvents<PumpScience>
);

export const toEvent = <E extends EventKeys>(
  eventName: E,
  event: any
): anchor.IdlEvents<PumpScience>[E] | null => {
  if (isEventName(eventName)) {
    return getEvent(eventName, event.data);
  }
  return null;
};

const getEvent = <E extends EventKeys>(
  eventName: E,
  event: anchor.IdlEvents<PumpScience>[E]
): anchor.IdlEvents<PumpScience>[E] => event

export const getTxDetails = async (connection: anchor.web3.Connection, sig: string) => {
  const latestBlockHash = await connection.getLatestBlockhash("processed");

  await connection.confirmTransaction(
    {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: sig,
    },
    "confirmed"
  );

  return connection.getTransaction(sig, {
    maxSupportedTransactionVersion: 0,
    commitment: "confirmed",
  });
};

export const createProgram = (connection: anchor.web3.Connection, programId?: string) => {
  const provider = new anchor.AnchorProvider(connection, {} as any, anchor.AnchorProvider.defaultOptions());
  const ammProgram = new anchor.Program<AmmIdl>(AmmIDL, programId ?? PROGRAM_ID, provider);
  const vaultProgram = new anchor.Program<VaultIdl>(VaultIDL, VAULT_PROGRAM_ID, provider);
  const stakeForFeeProgram = new anchor.Program<StakeForFeeIdl>(StakeForFeeIDL, STAKE_FOR_FEE_PROGRAM_ID, provider);

  return { provider, ammProgram, vaultProgram, stakeForFeeProgram };
};

export const findSwapVault = (umi: Umi, programId: PublicKey, mint: PublicKey): PublicKey => {
  return umi.eddsa.findPda(
    programId,
    [string({ size: 'variable' }).serialize(VAULT_SEED), publicKeySerializer().serialize(mint)],
  )[0];
};

export const getSolPriceInUSD = async () => {
  try {
    // Fetch the price data from CoinGecko
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const solPriceInUSD = response.data.solana.usd;
    return solPriceInUSD;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    throw error;
  }
};