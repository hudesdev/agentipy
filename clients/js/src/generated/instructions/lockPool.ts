/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, array, mapSerializer, struct, u8 } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type LockPoolInstructionAccounts = {
    global: PublicKey | Pda;
    vault: PublicKey | Pda;
    pool: PublicKey | Pda;
    lpMint: PublicKey | Pda;
    aVaultLp: PublicKey | Pda;
    bVaultLp: PublicKey | Pda;
    tokenBMint: PublicKey | Pda;
    aVault: PublicKey | Pda;
    bVault: PublicKey | Pda;
    aVaultLpMint: PublicKey | Pda;
    bVaultLpMint: PublicKey | Pda;
    payerPoolLp: PublicKey | Pda;
    payer?: Signer;
    tokenProgram?: PublicKey | Pda;
    associatedTokenProgram: PublicKey | Pda;
    systemProgram?: PublicKey | Pda;
      /** CHECK lock escrow */
    lockEscrow: PublicKey | Pda;
    escrowVault: PublicKey | Pda;
    meteoraProgram: PublicKey | Pda;
    eventAuthority: PublicKey | Pda;
};

  // Data.
  export type LockPoolInstructionData = { discriminator: Array<number>;  };

export type LockPoolInstructionDataArgs = {  };


  export function getLockPoolInstructionDataSerializer(): Serializer<LockPoolInstructionDataArgs, LockPoolInstructionData> {
  return mapSerializer<LockPoolInstructionDataArgs, any, LockPoolInstructionData>(struct<LockPoolInstructionData>([['discriminator', array(u8(), { size: 8 })]], { description: 'LockPoolInstructionData' }), (value) => ({ ...value, discriminator: [154, 202, 217, 175, 178, 161, 30, 152] }) ) as Serializer<LockPoolInstructionDataArgs, LockPoolInstructionData>;
}




// Instruction.
export function lockPool(
  context: Pick<Context, "payer" | "programs">,
                        input: LockPoolInstructionAccounts,
      ): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('pumpScience', '6YBhe9qr2WQN7JUxCgSPeX4puM6YihAKxdPQ5pZaSJ1h');

  // Accounts.
  const resolvedAccounts = {
          global: { index: 0, isWritable: true as boolean, value: input.global ?? null },
          vault: { index: 1, isWritable: false as boolean, value: input.vault ?? null },
          pool: { index: 2, isWritable: true as boolean, value: input.pool ?? null },
          lpMint: { index: 3, isWritable: true as boolean, value: input.lpMint ?? null },
          aVaultLp: { index: 4, isWritable: true as boolean, value: input.aVaultLp ?? null },
          bVaultLp: { index: 5, isWritable: true as boolean, value: input.bVaultLp ?? null },
          tokenBMint: { index: 6, isWritable: false as boolean, value: input.tokenBMint ?? null },
          aVault: { index: 7, isWritable: true as boolean, value: input.aVault ?? null },
          bVault: { index: 8, isWritable: true as boolean, value: input.bVault ?? null },
          aVaultLpMint: { index: 9, isWritable: true as boolean, value: input.aVaultLpMint ?? null },
          bVaultLpMint: { index: 10, isWritable: true as boolean, value: input.bVaultLpMint ?? null },
          payerPoolLp: { index: 11, isWritable: true as boolean, value: input.payerPoolLp ?? null },
          payer: { index: 12, isWritable: true as boolean, value: input.payer ?? null },
          tokenProgram: { index: 13, isWritable: false as boolean, value: input.tokenProgram ?? null },
          associatedTokenProgram: { index: 14, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
          systemProgram: { index: 15, isWritable: false as boolean, value: input.systemProgram ?? null },
          lockEscrow: { index: 16, isWritable: true as boolean, value: input.lockEscrow ?? null },
          escrowVault: { index: 17, isWritable: true as boolean, value: input.escrowVault ?? null },
          meteoraProgram: { index: 18, isWritable: true as boolean, value: input.meteoraProgram ?? null },
          eventAuthority: { index: 19, isWritable: false as boolean, value: input.eventAuthority ?? null },
      } satisfies ResolvedAccountsWithIndices;

  
    // Default values.
  if (!resolvedAccounts.payer.value) {
        resolvedAccounts.payer.value = context.payer;
      }
      if (!resolvedAccounts.tokenProgram.value) {
        resolvedAccounts.tokenProgram.value = context.programs.getPublicKey('splToken', 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
resolvedAccounts.tokenProgram.isWritable = false
      }
      if (!resolvedAccounts.systemProgram.value) {
        resolvedAccounts.systemProgram.value = context.programs.getPublicKey('splSystem', '11111111111111111111111111111111');
resolvedAccounts.systemProgram.isWritable = false
      }
      
  // Accounts in order.
      const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a,b) => a.index - b.index);
  
  
  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, "programId", programId);

  // Data.
      const data = getLockPoolInstructionDataSerializer().serialize({});
  
  // Bytes Created On Chain.
      const bytesCreatedOnChain = 0;
  
  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
