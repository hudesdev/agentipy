
import * as anchor from "@project-serum/anchor";
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  SystemProgram
} from "@solana/web3.js";
import { VAULT_SEED, PUMPSCIENCE, PROGRAM_ID, METAPLEX_PROGRAM, SEEDS } from "./constants";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import {
  Metadata,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { PumpScience } from "../target/types/pump_science";
import {
  IDL as VaultIDL,
  VaultIdl,
  PROGRAM_ID as VAULT_PROGRAM_ID,
} from '@mercurial-finance/vault-sdk';
import {
  STAKE_FOR_FEE_PROGRAM_ID,
  IDL as StakeForFeeIDL,
  StakeForFee as StakeForFeeIdl,
} from '@meteora-ag/stake-for-fee';
import { Amm as AmmIdl, IDL as AmmIDL } from './idl';

let programId = new anchor.web3.PublicKey(PUMPSCIENCE);


export const getPDA = async (
  seeds: Array<Buffer | Uint8Array>,
  programId: PublicKey
) => {
  return PublicKey.findProgramAddressSync(seeds, programId);
};

const findVault = (): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_SEED)],
    programId
  )[0];
};
export const vault = findVault();

export function getFirstKey(key1: PublicKey, key2: PublicKey) {
  const buf1 = key1.toBuffer();
  const buf2 = key2.toBuffer();
  // Buf1 > buf2
  if (Buffer.compare(buf1, buf2) === 1) {
    return buf1;
  }
  return buf2;
}

export function getSecondKey(key1: PublicKey, key2: PublicKey) {
  const buf1 = key1.toBuffer();
  const buf2 = key2.toBuffer();
  // Buf1 > buf2
  if (Buffer.compare(buf1, buf2) === 1) {
    return buf2;
  }
  return buf1;
}

export function derivePoolAddressWithConfig(
  tokenA: PublicKey,
  tokenB: PublicKey,
  config: PublicKey,
  programId: PublicKey,
) {
  const [poolPubkey] = PublicKey.findProgramAddressSync(
    [getFirstKey(tokenA, tokenB), getSecondKey(tokenA, tokenB), config.toBuffer()],
    programId,
  );

  return poolPubkey;
}

export const createProgram = (connection: Connection, programId?: string) => {
  const provider = new AnchorProvider(connection, {} as any, AnchorProvider.defaultOptions());
  const ammProgram = new Program<AmmIdl>(AmmIDL, programId ?? PROGRAM_ID, provider);
  const vaultProgram = new Program<VaultIdl>(VaultIDL, VAULT_PROGRAM_ID, provider);
  const stakeForFeeProgram = new Program<StakeForFeeIdl>(StakeForFeeIDL, STAKE_FOR_FEE_PROGRAM_ID, provider);

  return { provider, ammProgram, vaultProgram, stakeForFeeProgram };
};

export const getAssociatedTokenAccount = (tokenMint: PublicKey, owner: PublicKey) => {
  return getAssociatedTokenAddressSync(tokenMint, owner, true, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
};

export const getOrCreateATAInstruction = async (
  tokenMint: PublicKey,
  owner: PublicKey,
  connection: Connection,
  payer?: PublicKey,
): Promise<[PublicKey, TransactionInstruction?]> => {
  let toAccount;
  try {
    toAccount = getAssociatedTokenAccount(tokenMint, owner);

    const account = await connection.getAccountInfo(toAccount);

    if (!account) {
      const ix = createAssociatedTokenAccountInstruction(
        payer || owner,
        toAccount,
        owner,
        tokenMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );
      return [toAccount, ix];
    }
    return [toAccount, undefined];
  } catch (e) {
    /* handle error */
    console.error('Error::getOrCreateATAInstruction', e);
    throw e;
  }
};

export function deriveMintMetadata(lpMint: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), METAPLEX_PROGRAM.toBuffer(), lpMint.toBuffer()],
    METAPLEX_PROGRAM,
  );
}

export const wrapSOLInstruction = (from: PublicKey, to: PublicKey, amount: bigint): TransactionInstruction[] => {
  return [
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: amount,
    }),
    new TransactionInstruction({
      keys: [
        {
          pubkey: to,
          isSigner: false,
          isWritable: true,
        },
      ],
      data: Buffer.from(new Uint8Array([17])),
      programId: TOKEN_PROGRAM_ID,
    }),
  ];
};

export const deriveLockEscrowPda = (pool: PublicKey, owner: PublicKey, ammProgram: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SEEDS.LOCK_ESCROW), pool.toBuffer(), owner.toBuffer()],
    ammProgram,
  );
};
