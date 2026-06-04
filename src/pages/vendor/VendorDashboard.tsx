import { Link } from 'react-router-dom';
import { BarChart3, IndianRupee, PackagePlus, ShoppingBag, Store, Timer, Wallet } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import TrustBadge from '../../components/TrustBadge';
import { demoVendorOrders, demoVendors } from '../../data/marketplaceDemo';
import { formatMoney } from '../../utils/money';

export default function VendorDashboard() {
  const vendor = demoVendors[0];
  const newOrders = demoVendorOrders.filter((o) => o.status === 'new').length;
  return (
    <main className="px-4">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-success">Vendor approved</p>
            <h1 className="mt-1 text-3xl font-black">{vendor.shopName}</h1>
            <p className="mt-1 text-sm font-semibold text-slate-300">{vendor.address}</p>
            <div className="mt-3 flex flex-wrap gap-2"><TrustBadge score={vendor.trustScore}/><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">Commission {vendor.commissionPercent}%</span></div>
          </div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.4rem] bg-white/10"><Store size={30}/></div>
        </div>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={ShoppingBag} title="New Orders" value={newOrders} note="Accept quickly" tone="amber" />
        <KpiCard icon={IndianRupee} title="Today Sales" value={formatMoney(vendor.todayRevenue)} note="Customer paid" tone="green" />
        <KpiCard icon={Wallet} title="Payout Due" value={formatMoney(vendor.payoutDue)} note="After commission" />
        <KpiCard icon={Timer} title="Avg ETA" value="18m" note="Fast store" tone="green" />
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/vendor/orders" className="glass rounded-[1.6rem] p-4"><ShoppingBag className="text-success"/><h3 className="mt-3 font-black">Manage orders</h3><p className="text-xs font-bold text-slate-400">Accept / decline / ready</p></Link>
        <Link to="/vendor/products" className="glass rounded-[1.6rem] p-4"><PackagePlus className="text-rapidLight"/><h3 className="mt-3 font-black">Upload items</h3><p className="text-xs font-bold text-slate-400">Base price → auto commission</p></Link>
        <Link to="/vendor/earnings" className="glass rounded-[1.6rem] p-4"><BarChart3 className="text-amber-300"/><h3 className="mt-3 font-black">Analytics</h3><p className="text-xs font-bold text-slate-400">Sales, stock, payout</p></Link>
        <Link to="/vendor/settings" className="glass rounded-[1.6rem] p-4"><Timer className="text-cyan-300"/><h3 className="mt-3 font-black">Store settings</h3><p className="text-xs font-bold text-slate-400">Timing, holiday, payout</p></Link>
      </section>
    </main>
  );
}
