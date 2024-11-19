import { BondingCurve } from "./generated";

export type BuyResult = {
    token_amount: bigint;
    sol_amount: bigint;
};

export type SellResult = {
    token_amount: bigint;
    sol_amount: bigint;
};

export class AMM {
    constructor(
        public virtualSolReserves: bigint,
        public virtualTokenReserves: bigint,
        public realSolReserves: bigint,
        public realTokenReserves: bigint,
        public initialVirtualTokenReserves: bigint
    ) {}

    static fromBondingCurve(bondingCurve: BondingCurve): AMM {
        return new AMM(
            bondingCurve.virtualSolReserves,
            bondingCurve.virtualTokenReserves,
            bondingCurve.realSolReserves,
            bondingCurve.realTokenReserves,
            bondingCurve.initialVirtualTokenReserves
        );
    }

    getBuyPrice(tokens: bigint): bigint {
        // console.log("getBuyPrice: tokens", Number(tokens));
        // console.log("this", this);
        const productOfReserves = this.virtualSolReserves * this.virtualTokenReserves;
        // console.log("getBuyPrice: productOfReserves", Number(productOfReserves));
        const newVirtualTokenReserves = this.virtualTokenReserves - tokens;
        // console.log("getBuyPrice: newVirtualTokenReserves", Number(newVirtualTokenReserves));
        const newVirtualSolReserves = (productOfReserves / newVirtualTokenReserves) + 1n;
        // console.log("getBuyPrice: newVirtualSolReserves", Number(newVirtualSolReserves));
        const amountNeeded = newVirtualSolReserves - this.virtualSolReserves;
        // console.log("getBuyPrice: amountNeeded", Number(amountNeeded));
        return amountNeeded;
    }

    applyBuy(token_amount: bigint): BuyResult {
        const finalTokenAmount = token_amount > this.realTokenReserves ? this.realTokenReserves : token_amount;
        const solAmount = this.getBuyPrice(finalTokenAmount);

        this.virtualTokenReserves = this.virtualTokenReserves - finalTokenAmount;
        this.realTokenReserves = this.realTokenReserves - finalTokenAmount;

        this.virtualSolReserves = this.virtualSolReserves + solAmount;
        this.realSolReserves = this.realSolReserves + solAmount;

        return {
            token_amount: finalTokenAmount,
            sol_amount: solAmount
        }
    }

    applySell(token_amount: bigint): SellResult {
        this.virtualTokenReserves = this.virtualTokenReserves + token_amount;
        this.realTokenReserves = this.realTokenReserves + token_amount;

        const sell_price = this.getSellPrice(token_amount);

        this.virtualSolReserves = this.virtualSolReserves - sell_price;
        this.realSolReserves = this.realSolReserves - sell_price;

        return {
            token_amount: token_amount,
            sol_amount: sell_price
        }
    }

    getSellPrice(tokens: bigint): bigint {
        const scaling_factor = this.initialVirtualTokenReserves;
        const token_sell_proportion = (tokens * scaling_factor) / this.virtualTokenReserves;
        const sol_received = (this.virtualSolReserves * token_sell_proportion) / scaling_factor;
        return sol_received < this.realSolReserves ? sol_received : this.realSolReserves;
    }
}
