import { Bike, CheckCircle2, Store, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import RoleSwitch from '../../components/RoleSwitch';
import { demoVendors } from '../../data/marketplaceDemo';

const riders = [
  { id: 'r2', name: 'Deepak Kumar', phone: '+91 90123 45678', area: 'Munger Market', status: 'pending' },
  { id: 'r3', name: 'Md Asif', phone: '+91 90123 45679', area: 'Kasim Bazar', status: 'pending' }
];

export default function Approvals() {
  const approve = (name: string) => toast.success(`${name} approved`);
  const reject = (name: string) => toast.error(`${name} rejected`);
  return (
    <main className="px-4">
      <RoleSwitch />
      <h1 className="mt-2 text-3xl font-black">Approvals</h1>
      <p className="text-sm font-semibold text-slate-400">Only admin can approve vendors and delivery boys. Operations are self-managed after approval.</p>
      <section className="mt-4 space-y-3">
        <h2 className="font-black">Vendor / Dukandar requests</h2>
        {demoVendors.filter(v=>v.approvalStatus==='pending').map(v => (
          <article key={v.id} className="glass rounded-[1.6rem] p-4">
            <div className="flex gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-rapid/20"><Store/></div><div className="flex-1"><h3 className="font-black">{v.shopName}</h3><p className="text-xs font-bold text-slate-400">{v.ownerName} • {v.address}</p><p className="mt-1 text-xs font-black text-success">Commission: {v.commissionPercent}%</p></div></div>
            <div className="mt-3 flex gap-2"><button onClick={()=>approve(v.shopName)} className="tap flex-1 rounded-2xl bg-success py-3 font-black text-ink"><CheckCircle2 className="inline" size={16}/> Approve</button><button onClick={()=>reject(v.shopName)} className="tap flex-1 rounded-2xl bg-rose-500/20 py-3 font-black text-rose-200"><XCircle className="inline" size={16}/> Reject</button></div>
          </article>
        ))}
        <h2 className="pt-3 font-black">Delivery boy requests</h2>
        {riders.map(r => (
          <article key={r.id} className="glass rounded-[1.6rem] p-4">
            <div className="flex gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-success/15 text-success"><Bike/></div><div className="flex-1"><h3 className="font-black">{r.name}</h3><p className="text-xs font-bold text-slate-400">{r.phone} • {r.area}</p><p className="mt-1 text-xs font-black text-success">₹30/order + ₹150 incentive after 12 orders</p></div></div>
            <div className="mt-3 flex gap-2"><button onClick={()=>approve(r.name)} className="tap flex-1 rounded-2xl bg-success py-3 font-black text-ink">Approve</button><button onClick={()=>reject(r.name)} className="tap flex-1 rounded-2xl bg-rose-500/20 py-3 font-black text-rose-200">Reject</button></div>
          </article>
        ))}
      </section>
    </main>
  );
}
