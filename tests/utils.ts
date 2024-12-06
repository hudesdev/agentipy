import { IdlEvent } from "@coral-xyz/anchor/dist/cjs/idl";
import * as anchor from "@coral-xyz/anchor";
import {
  Global,
  GlobalAccountDataArgs,
} from "../clients/js/src/generated/accounts/global";
import { PublicKey } from "@solana/web3.js";

export const assertBondingCurve = (
  bondingCurve: Omit<BondingCurve, "vestingTerms">,
  expected: Partial<
    Omit<
      BondingCurveAccountDataArgs,
      "vestingTerms" | "startTime" | "allocation"
    >
  >
) => {
  console.log(bondingCurve.virtualSolReserves, expected.virtualSolReserves);
  assert.equal(bondingCurve.virtualSolReserves, expected.virtualSolReserves);
  
  console.log(bondingCurve.tokenTotalSupply, expected.tokenTotalSupply);
  assert.equal(bondingCurve.tokenTotalSupply, expected.tokenTotalSupply);
  // assert.equal(bondingCurve.solLaunchThreshold, expected.solLaunchThreshold);
};

export const assertGlobal = (
  global: Global,
  expected: Partial<GlobalAccountDataArgs>
) => {
  assert.equal(global.feeBps, expected.feeBps);
  assert.equal(global.status, expected.status);
};

export const advanceBySlots = async (context: any, slots: BigInt) => {
  const currentClock = await context.banksClient.getClock();
  const slot = currentClock.slot + slots;
  context.setClock(
    new Clock(
      slot,
      currentClock.epochStartTimestamp,
      currentClock.epoch,
      currentClock.leaderScheduleEpoch,
      currentClock.unixTimestamp
    )
  );
};

export const expectError = (
  expectedError: string,
  message: string
): [() => void, (e: any) => void] => {
  return [
    () => assert.fail(message),
    (e) => {
      assert(e.error != undefined, `problem retrieving program error: ${e}`);
      assert(
        e.error.errorCode != undefined,
        "problem retrieving program error code"
      );
      //for (let idlError of program.idl.errors) {
      //  if (idlError.code == e.code) {
      //    assert.equal(idlError.name, expectedError);
      //    return;
      //  }
      //}
      assert.equal(
        e.error.errorCode.code,
        expectedError,
        `the program threw for a reason that we didn't expect. error : ${e}`
      );
      /* assert.fail("error doesn't match idl"); */
      /* console.log(program.idl.errors); */
      /* assert( */
      /*   e["error"] != undefined, */
      /*   `the program threw for a reason that we didn't expect. error: ${e}` */
      /* ); */
      /* assert.equal(e.error.errorCode.code, expectedErrorCode); */
    },
  ];
};

import { Clock, ProgramTestContext } from "solana-bankrun";
import assert from "assert";
import { BN } from "bn.js";
import { BondingCurve, BondingCurveAccountDataArgs } from "../clients/js/src";

export const fastForward = async (
  context: ProgramTestContext,
  slots: bigint
) => {
  const currentClock = await context.banksClient.getClock();
  context.setClock(
    new Clock(
      currentClock.slot + slots,
      currentClock.epochStartTimestamp,
      currentClock.epoch,
      currentClock.leaderScheduleEpoch,
      50n
    )
  );
};
