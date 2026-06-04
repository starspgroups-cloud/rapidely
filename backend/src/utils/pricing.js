function clampCommission(value) {
  const n = Number(value || process.env.PLATFORM_COMMISSION_DEFAULT || 15);
  return Math.min(15, Math.max(10, n));
}
function customerPriceFromBase(basePrice, commissionPercent) {
  const pct = clampCommission(commissionPercent);
  return Math.round(Number(basePrice) + (Number(basePrice) * pct / 100));
}
function platformCommission(basePrice, commissionPercent) {
  return customerPriceFromBase(basePrice, commissionPercent) - Number(basePrice);
}
function riderDailyEarning(completedOrders) {
  const perOrder = Number(process.env.RIDER_ORDER_EARNING || 30);
  const target = Number(process.env.RIDER_DAILY_TARGET || 12);
  const incentive = Number(process.env.RIDER_DAILY_INCENTIVE || 150);
  return { perOrder, base: completedOrders * perOrder, incentive: completedOrders >= target ? incentive : 0, total: completedOrders * perOrder + (completedOrders >= target ? incentive : 0), target };
}
module.exports = { clampCommission, customerPriceFromBase, platformCommission, riderDailyEarning };
