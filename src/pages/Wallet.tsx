import { Gift, IndianRupee, Plus, WalletCards } from 'lucide-react';
import RoleSwitch from '../components/RoleSwitch';
import KpiCard from '../components/KpiCard';

export default function Wallet() {
  return <main className="px-4 pb-24"><RoleSwitch/><section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-success/20 to-rapid/10 p-5"><WalletCards className="text-success"/><h1 className="mt-3 text-3xl font-black">RapiDely Wallet</h1><p className="mt-2 text-sm font-semibold text-slate-300">Cashback, coupons and refunds in one place.</p><button className="tap mt-5 rounded-2xl bg-success px-5 py-3 font-black text-ink"><Plus className="inline" size={17}/> Add money</button></section><section className="mt-4 grid grid-cols-2 gap-3"><KpiCard icon={IndianRupee} title="Balance" value="₹250" note="Available" tone="green"/><KpiCard icon={Gift} title="Coupons" value="4" note="Ready to use" tone="amber"/></section><section className="glass mt-4 rounded-[1.7rem] p-4"><h2 className="font-black">Active coupon</h2><div className="mt-3 rounded-2xl bg-white/8 p-3"><b>RAPID10</b><p className="text-xs font-bold text-slate-400">Save up to ₹50 on local grocery order.</p></div></section></main>;
}
