use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct FeeVault {
    pub total_fees_claimed: u64,
    #[max_len(5)]
    pub fee_recipients: Vec<FeeRecipient>,
}

impl FeeVault {
    pub const SEED_PREFIX: &'static str = "fee-vault";

    pub fn get_signer<'a>(bump: &'a u8) -> [&'a [u8]; 2] {
        [Self::SEED_PREFIX.as_bytes(), std::slice::from_ref(bump)]
    }

    pub fn update_fee_recipients(&mut self, new_recipients: Vec<FeeRecipient>) {
        // Clear existing recipients
        self.fee_recipients.clear();

        // Add new recipients
        for recipient in new_recipients {
            self.fee_recipients.push(recipient);
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace, Debug)]
pub struct FeeRecipient {
    pub owner: Pubkey,
    pub share_bps: u16, // basis points (e.g., 5000 = 50%)
    pub total_claimed: u64,
}
