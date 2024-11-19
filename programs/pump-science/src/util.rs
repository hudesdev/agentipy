pub const BASIS_POINTS_DIVISOR: u64 = 10_000;

pub fn bps_mul(bps: u64, value: u64) -> Option<u64> {
    bps_mul_raw(bps, value).unwrap().try_into().ok()
}

pub fn bps_div(bps: u64, value: u64) -> Option<u64> {
    bps_div_raw(bps, value).unwrap().try_into().ok()
}

pub fn bps_mul_raw(bps: u64, value: u64) -> Option<u128> {
    (value as u128)
        .checked_mul(bps as u128)?
        .checked_div(BASIS_POINTS_DIVISOR as u128)
}

pub fn bps_div_raw(bps: u64, value: u64) -> Option<u128> {
    (value as u128)
        .checked_mul(BASIS_POINTS_DIVISOR as u128)?
        .checked_div(bps as u128)
}
