import { Bike, Gift, Target, Wallet } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import { demoRider } from '../../data/marketplaceDemo';
import { RIDER_DAILY_INCENTIVE, RIDER_DAILY_TARGET, RIDER_FIXED_EARNING, riderIncentive } from '../../utils/commission';
import { formatMoney } from '../../utils/money';

export default function RiderEarnings() {
  const incentive = riderIncentive(demoRider.completedToday);
  const progress = Math.min(100, (demoRider.completedToday / RIDER_DAILY_TARGET) * 100);
  return (
    <main className="px-4">
      <RoleSwitch />
      <h1 className="mt-2 text-3xl font-black">Rider Earnings</h1>
      <p className="text-sm font-semibold text-slate-400">Fixed ₹{RIDER_FIXED_EARNING}/order + ₹{RIDER_DAILY_INCENTIVE} incentive after {RIDER_DAILY_TARGET} orders.</p>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={Bike} title="Completed" value={demoRider.completedToday} note="Today" tone="green" />
        <KpiCard icon={Wallet} title="Order earning" value={formatMoney(demoRider.earningToday)} note={`₹${RIDER_FIXED_EARNING} fixed`} />
        <KpiCard icon={Gift} title="Incentive" value={formatMoney(incentive)} note="Auto unlocked" tone="amber" />
        <KpiCard icon={Target} title="Rating" value={demoRider.rating} note="Trust score" tone="green" />
      </section>
      <section className="glass mt-4 rounded-[1.7rem] p-4">
        <div className="flex justify-between text-sm font-black"><span>Daily target</span><span>{demoRider.completedToday}/{RIDER_DAILY_TARGET}</span></div>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-success" style={{ width: `${progress}%` }} /></div>
        <p className="mt-3 text-sm font-semibold text-slate-300">{RIDER_DAILY_TARGET - demoRider.completedToday > 0 ? `${RIDER_DAILY_TARGET - demoRider.completedToday} more orders to unlock ${formatMoney(RIDER_DAILY_INCENTIVE)}.` : 'Incentive unlocked. Great work!'}</p>
      </section>
    </main>
  );
}
