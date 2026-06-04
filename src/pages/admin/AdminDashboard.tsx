import { Link } from 'react-router-dom';
import { BarChart3, Bike, Crown, IndianRupee, ShieldAlert, Store, UsersRound } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import { adminStats, demoVendors } from '../../data/marketplaceDemo';
import { formatMoney } from '../../utils/money';

export default function AdminDashboard() {
  return (
    <main className="px-4">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-amber-400/10 p-5">
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-xs font-black uppercase tracking-wider text-amber-300">Super admin control</p><h1 className="mt-1 text-3xl font-black">Approve only. Vendors run operations.</h1><p className="mt-2 text-sm font-semibold text-slate-300">Your job: approvals, commission, payouts, trust, disputes and growth.</p></div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.4rem] bg-amber-400/15 text-amber-300"><Crown size={32}/></div>
        </div>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={Store} title="Vendor pending" value={adminStats.vendorsPending} note="Approval needed" tone="amber" />
        <KpiCard icon={Bike} title="Rider pending" value={adminStats.ridersPending} note="KYC check" tone="amber" />
        <KpiCard icon={IndianRupee} title="Commission" value={formatMoney(adminStats.commissionToday)} note="Today" tone="green" />
        <KpiCard icon={UsersRound} title="Live orders" value={adminStats.liveOrders} note="Across shops" />
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/admin/approvals" className="glass rounded-[1.6rem] p-4"><ShieldAlert className="text-amber-300"/><h3 className="mt-3 font-black">Approvals</h3><p className="text-xs font-bold text-slate-400">Vendor & rider verification</p></Link>
        <Link to="/admin/commission" className="glass rounded-[1.6rem] p-4"><IndianRupee className="text-success"/><h3 className="mt-3 font-black">Commission Rules</h3><p className="text-xs font-bold text-slate-400">10–15% auto price markup</p></Link>
        <Link to="/admin/disputes" className="glass rounded-[1.6rem] p-4"><ShieldAlert className="text-rose-300"/><h3 className="mt-3 font-black">Disputes</h3><p className="text-xs font-bold text-slate-400">Refunds and complaints</p></Link>
        <Link to="/admin/analytics" className="glass rounded-[1.6rem] p-4"><BarChart3 className="text-success"/><h3 className="mt-3 font-black">Analytics</h3><p className="text-xs font-bold text-slate-400">GMV, commission & growth</p></Link>
      </section>
      <section className="glass mt-4 rounded-[1.7rem] p-4">
        <h2 className="font-black">Approved vendors</h2>
        <div className="mt-3 space-y-2">{demoVendors.filter(v=>v.approvalStatus==='approved').map(v => <div key={v.id} className="flex justify-between rounded-2xl bg-white/7 p-3 text-sm font-bold"><span>{v.shopName}</span><span className="text-success">{v.commissionPercent}%</span></div>)}</div>
      </section>
    </main>
  );
}
