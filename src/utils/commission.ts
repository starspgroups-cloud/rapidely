export const DEFAULT_VENDOR_COMMISSION = 15;
export const MIN_VENDOR_COMMISSION = 10;
export const MAX_VENDOR_COMMISSION = 15;
export const RIDER_FIXED_EARNING = 30;
export const RIDER_DAILY_TARGET = 12;
export const RIDER_DAILY_INCENTIVE = 150;

export function clampCommission(value: number) {
  return Math.min(MAX_VENDOR_COMMISSION, Math.max(MIN_VENDOR_COMMISSION, value || DEFAULT_VENDOR_COMMISSION));
}

export function customerPriceFromBase(basePrice: number, commissionPercent = DEFAULT_VENDOR_COMMISSION) {
  const commission = clampCommission(commissionPercent);
  return Math.ceil(basePrice + (basePrice * commission) / 100);
}

export function platformCommission(basePrice: number, quantity = 1, commissionPercent = DEFAULT_VENDOR_COMMISSION) {
  const price = customerPriceFromBase(basePrice, commissionPercent);
  return Math.max(0, (price - basePrice) * quantity);
}

export function vendorEarning(basePrice: number, quantity = 1) {
  return basePrice * quantity;
}

export function riderIncentive(completedToday: number) {
  return completedToday >= RIDER_DAILY_TARGET ? RIDER_DAILY_INCENTIVE : 0;
}
