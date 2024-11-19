/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Serializer, i64, struct } from '@metaplex-foundation/umi/serializers';


export type VestingTerms = { cliff: bigint; duration: bigint;  };

export type VestingTermsArgs = { cliff: number | bigint; duration: number | bigint;  };


export function getVestingTermsSerializer(): Serializer<VestingTermsArgs, VestingTerms> {
  return struct<VestingTerms>([['cliff', i64()], ['duration', i64()]], { description: 'VestingTerms' }) as Serializer<VestingTermsArgs, VestingTerms>;
}


