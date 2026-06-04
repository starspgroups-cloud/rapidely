import { BarChart3, IndianRupee, Percent, Wallet } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import { demoVendorOrders, demoVendors } from '../../data/marketplaceDemo';
import { formatMoney } from '../../utils/money';

export default function VendorEarnings() {
  const vendor = demoVendors[0];
  const commission = demoVendorOrders.reduce((s, o) => s + o.platformCommission, 0);
  const earning = demoVendorOrders.reduce((s, o) => s + o.vendorEarning, 0);
  return (
    <main className="px-4">
      <RoleSwitch />
      <h1 className="mt-2 text-3xl font-black">Vendor Earnings</h1>
      <p className="text-sm font-semibold text-slate-400">Dukandar ka loss nahi: base price vendor ko, commission platform ko.</p>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={Wallet} title="Vendor earning" value={formatMoney(earning)} note="Base price total" tone="green"/>
        <KpiCard icon={Percent} title="Platform commission" value={formatMoney(commission)} note={`${vendor.commissionPercent}% model`} />
        <KpiCard icon={IndianRupee} title="Payout due" value={formatMoney(vendor.payoutDue)} note="Next settlement" tone="amber"/>
        <KpiCard icon={BarChart3} title="Orders today" value={vendor.todayOrders} note="Live dashboard" />
      </section>
      <section className="glass mt-4 rounded-[1.7rem] p-4">
        <h2 className="font-black">Settlement rule</h2>
        <p className="mt-2 text-sm font-semibold text-slate-300">Customer se jo final price collect hoga usme vendor ka base price safe rahega. Platform commission automatic split hoga. Delivery boy ko per delivery ₹30 alag credit hoga.</p>
      </section>
    </main>
  );
}
