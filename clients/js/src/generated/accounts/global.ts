/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Account, Context, Pda, PublicKey, RpcAccount, RpcGetAccountOptions, RpcGetAccountsOptions, assertAccountExists, deserializeAccount, gpaBuilder, publicKey as toPublicKey } from '@metaplex-foundation/umi';
import { Serializer, array, bool, mapSerializer, publicKey as publicKeySerializer, string, struct, u64, u8 } from '@metaplex-foundation/umi/serializers';
import { ProgramStatus, ProgramStatusArgs, getProgramStatusSerializer } from '../types';

  
  export type Global = Account<GlobalAccountData>;

  export type GlobalAccountData = { discriminator: Array<number>; status: ProgramStatus; initialized: boolean; globalAuthority: PublicKey; migrationAuthority: PublicKey; migrateFeeAmount: bigint; feeReceiver: PublicKey; initialVirtualTokenReserves: bigint; initialVirtualSolReserves: bigint; initialRealTokenReserves: bigint; tokenTotalSupply: bigint; mintDecimals: number; meteoraConfig: PublicKey; whitelistEnabled: boolean;  };

export type GlobalAccountDataArgs = { status: ProgramStatusArgs; initialized: boolean; globalAuthority: PublicKey; migrationAuthority: PublicKey; migrateFeeAmount: number | bigint; feeReceiver: PublicKey; initialVirtualTokenReserves: number | bigint; initialVirtualSolReserves: number | bigint; initialRealTokenReserves: number | bigint; tokenTotalSupply: number | bigint; mintDecimals: number; meteoraConfig: PublicKey; whitelistEnabled: boolean;  };


  export function getGlobalAccountDataSerializer(): Serializer<GlobalAccountDataArgs, GlobalAccountData> {
  return mapSerializer<GlobalAccountDataArgs, any, GlobalAccountData>(struct<GlobalAccountData>([['discriminator', array(u8(), { size: 8 })], ['status', getProgramStatusSerializer()], ['initialized', bool()], ['globalAuthority', publicKeySerializer()], ['migrationAuthority', publicKeySerializer()], ['migrateFeeAmount', u64()], ['feeReceiver', publicKeySerializer()], ['initialVirtualTokenReserves', u64()], ['initialVirtualSolReserves', u64()], ['initialRealTokenReserves', u64()], ['tokenTotalSupply', u64()], ['mintDecimals', u8()], ['meteoraConfig', publicKeySerializer()], ['whitelistEnabled', bool()]], { description: 'GlobalAccountData' }), (value) => ({ ...value, discriminator: [167, 232, 232, 177, 200, 108, 114, 127] }) ) as Serializer<GlobalAccountDataArgs, GlobalAccountData>;
}


export function deserializeGlobal(rawAccount: RpcAccount): Global {
  return deserializeAccount(rawAccount, getGlobalAccountDataSerializer());
}

export async function fetchGlobal(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions,
): Promise<Global> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'Global');
  return deserializeGlobal(maybeAccount);
}

export async function safeFetchGlobal(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions,
): Promise<Global | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists
    ? deserializeGlobal(maybeAccount)
    : null;
}

export async function fetchAllGlobal(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions,
): Promise<Global[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys.map(key => toPublicKey(key, false)), options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Global');
    return deserializeGlobal(maybeAccount);
  });
}

export async function safeFetchAllGlobal(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions,
): Promise<Global[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys.map(key => toPublicKey(key, false)), options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeGlobal(maybeAccount as RpcAccount));
}

export function getGlobalGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey('pumpScience', 'Fmktp2VXcDorWkAyzZAEG5X859mxKMV8XCcayKgZVwBo');
  return gpaBuilder(context, programId)
    .registerFields<{ 'discriminator': Array<number>, 'status': ProgramStatusArgs, 'initialized': boolean, 'globalAuthority': PublicKey, 'migrationAuthority': PublicKey, 'migrateFeeAmount': number | bigint, 'feeReceiver': PublicKey, 'initialVirtualTokenReserves': number | bigint, 'initialVirtualSolReserves': number | bigint, 'initialRealTokenReserves': number | bigint, 'tokenTotalSupply': number | bigint, 'mintDecimals': number, 'meteoraConfig': PublicKey, 'whitelistEnabled': boolean }>({ 'discriminator': [0, array(u8(), { size: 8 })], 'status': [8, getProgramStatusSerializer()], 'initialized': [9, bool()], 'globalAuthority': [10, publicKeySerializer()], 'migrationAuthority': [42, publicKeySerializer()], 'migrateFeeAmount': [74, u64()], 'feeReceiver': [82, publicKeySerializer()], 'initialVirtualTokenReserves': [114, u64()], 'initialVirtualSolReserves': [122, u64()], 'initialRealTokenReserves': [130, u64()], 'tokenTotalSupply': [138, u64()], 'mintDecimals': [146, u8()], 'meteoraConfig': [147, publicKeySerializer()], 'whitelistEnabled': [179, bool()] })
    .deserializeUsing<Global>((account) => deserializeGlobal(account))      .whereField('discriminator', [167, 232, 232, 177, 200, 108, 114, 127])
    ;
}

export function getGlobalSize(): number {
  return 180;
}

export function findGlobalPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  ): Pda {
  const programId = context.programs.getPublicKey('pumpScience', 'Fmktp2VXcDorWkAyzZAEG5X859mxKMV8XCcayKgZVwBo');
  return context.eddsa.findPda(programId, [
                  string({ size: 'variable' }).serialize("global"),
            ]);
}

export async function fetchGlobalFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
    options?: RpcGetAccountOptions,
): Promise<Global> {
  return fetchGlobal(context, findGlobalPda(context), options);
}

export async function safeFetchGlobalFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
    options?: RpcGetAccountOptions,
): Promise<Global | null> {
  return safeFetchGlobal(context, findGlobalPda(context), options);
}
