import { Check, MapPin, Phone, Timer, X } from 'lucide-react';
import toast from 'react-hot-toast';
import RoleSwitch from '../../components/RoleSwitch';
import { demoVendorOrders } from '../../data/marketplaceDemo';
import { formatMoney } from '../../utils/money';
import { vibrate } from '../../utils/mobile';

export default function VendorOrders() {
  const action = (msg: string) => { vibrate(16); toast.success(msg); };
  return (
    <main className="px-4">
      <RoleSwitch />
      <h1 className="mt-2 text-3xl font-black">Vendor Orders</h1>
      <p className="text-sm font-semibold text-slate-400">Orders come directly to dukandar. You only control commission and approvals.</p>
      <section className="mt-4 space-y-4">
        {demoVendorOrders.map((order) => (
          <article key={order.id} className="glass rounded-[1.7rem] p-4">
            <div className="flex items-start justify-between gap-2">
              <div><h3 className="text-lg font-black">#{order.ref}</h3><p className="text-xs font-bold text-slate-400">{order.createdAt} • {order.deliveryType}</p></div>
              <span className="rounded-full bg-rapid/20 px-3 py-1 text-xs font-black text-rapidLight">{order.status}</span>
            </div>
            <div className="mt-3 rounded-2xl bg-white/6 p-3">
              {order.items.map((item) => <div key={item.name} className="flex justify-between text-sm font-bold"><span>{item.qty}× {item.name}</span><span>{formatMoney(item.customerPrice * item.qty)}</span></div>)}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1"><MapPin size={14}/>{order.address}</span>
              <span className="flex items-center gap-1"><Timer size={14}/>{order.eta}</span>
              <span>Vendor: {formatMoney(order.vendorEarning)}</span>
              <span>Platform: {formatMoney(order.platformCommission)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => action(`Accepted ${order.ref}`)} className="tap flex-1 rounded-2xl bg-success px-3 py-3 text-sm font-black text-ink"><Check className="inline" size={16}/> Accept</button>
              <button onClick={() => action(`Declined ${order.ref}`)} className="tap flex-1 rounded-2xl bg-rose-500/20 px-3 py-3 text-sm font-black text-rose-200"><X className="inline" size={16}/> Decline</button>
              <a href={`tel:${order.customerPhone}`} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Phone size={18}/></a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
