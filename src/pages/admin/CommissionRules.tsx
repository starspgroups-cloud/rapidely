import { useState } from 'react';
import toast from 'react-hot-toast';
import { IndianRupee, Percent, ShieldCheck } from 'lucide-react';
import RoleSwitch from '../../components/RoleSwitch';
import KpiCard from '../../components/KpiCard';
import { customerPriceFromBase } from '../../utils/commission';

export default function CommissionRules() {
  const [percent, setPercent] = useState(15);
  return <main className="px-4 pb-24"><RoleSwitch/><section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5"><Percent className="text-success"/><h1 className="mt-3 text-3xl font-black">Commission control</h1><p className="mt-2 text-sm font-semibold text-slate-300">Admin 10–15% commission set karega. Vendor ka base price safe rahega.</p><label className="mt-5 block rounded-2xl bg-white/8 p-3 font-black">Commission: {percent}%<input type="range" min="10" max="15" value={percent} onChange={(e)=>setPercent(Number(e.target.value))} className="mt-2 w-full"/></label><button onClick={()=>toast.success('Commission rule saved')} className="tap mt-3 rounded-2xl bg-success px-5 py-3 font-black text-ink">Save rule</button></section><section className="mt-4 grid grid-cols-2 gap-3"><KpiCard icon={IndianRupee} title="Vendor price" value="₹100" note="Base safe" tone="green"/><KpiCard icon={ShieldCheck} title="Customer sees" value={`₹${customerPriceFromBase(100, percent)}`} note="Commission added"/></section></main>;
}
