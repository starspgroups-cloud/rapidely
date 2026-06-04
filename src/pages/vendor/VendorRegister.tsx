import { useState } from 'react';
import toast from 'react-hot-toast';
import { FileCheck2, Store } from 'lucide-react';
import RoleSwitch from '../../components/RoleSwitch';

export default function VendorRegister() {
  const [commission, setCommission] = useState(15);
  return <main className="px-4 pb-24"><RoleSwitch/><section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5"><Store className="text-success"/><h1 className="mt-3 text-3xl font-black">Dukandar registration</h1><p className="mt-2 text-sm font-semibold text-slate-300">Admin sirf approval dega. Approval ke baad vendor khud product, stock aur orders manage karega.</p></section><section className="glass mt-4 rounded-[1.7rem] p-4"><h2 className="font-black">Shop details</h2><div className="mt-3 grid gap-3"><input className="input" placeholder="Shop name"/><input className="input" placeholder="Owner name"/><input className="input" placeholder="Mobile number"/><input className="input" placeholder="Shop category"/><textarea className="input min-h-20" placeholder="Shop area / landmark"/><label className="rounded-2xl bg-white/8 p-3 text-sm font-bold">Commission {commission}%<input type="range" min="10" max="15" value={commission} onChange={(e)=>setCommission(Number(e.target.value))} className="mt-2 w-full"/></label><button onClick={()=>toast.success('Vendor request sent for admin approval')} className="tap rounded-2xl bg-success py-3 font-black text-ink"><FileCheck2 className="inline" size={17}/> Send for approval</button></div></section></main>;
}
