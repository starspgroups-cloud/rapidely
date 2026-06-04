import { Link } from 'react-router-dom';
import { Clock3, Repeat2, ShoppingBag, Star, Truck } from 'lucide-react';
import RoleSwitch from '../components/RoleSwitch';
import StatusTimeline from '../components/StatusTimeline';
import { formatMoney } from '../utils/money';

const orders = [
  { ref: 'RDY10291', status: 'Accepted', total: 428, eta: '18 min', store: 'Nirdosh Kirana Store', items: 'Atta, Milk', step: 'accepted' },
  { ref: 'RDY10284', status: 'Delivered', total: 312, eta: 'Delivered yesterday', store: 'Munger Fresh Mart', items: 'Maggi, Kurkure, Cola', step: 'delivered' },
  { ref: 'RDY10275', status: 'Verified', total: 149, eta: 'Waiting for shop', store: 'Beauty Hub', items: 'Soap', step: 'verified' }
];

export default function Orders() {
  return (
    <main className="px-4 pb-24">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5">
        <div className="flex items-center gap-2 text-success"><ShoppingBag size={18}/><b>My orders</b></div>
        <h1 className="mt-2 text-3xl font-black">Track, repeat and rate every order.</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Customer side order history for quick-commerce mobile app.</p>
      </section>
      <section className="mt-4 space-y-4">
        {orders.map((order) => (
          <article key={order.ref} className="glass rounded-[1.7rem] p-4">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="text-lg font-black">#{order.ref}</h3><p className="text-xs font-bold text-slate-400">{order.store} • {order.items}</p></div>
              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-black text-success">{order.status}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-bold text-slate-300">
              <span className="flex items-center gap-1"><Clock3 size={15}/>{order.eta}</span>
              <span>{formatMoney(order.total)}</span>
            </div>
            <div className="mt-4"><StatusTimeline status={order.step as any}/></div>
            <div className="mt-4 flex gap-2">
              <Link to={`/track/${order.ref}`} className="tap flex-1 rounded-2xl bg-rapid py-3 text-center text-sm font-black"><Truck className="inline" size={16}/> Track</Link>
              <Link to="/" className="tap flex-1 rounded-2xl bg-white/10 py-3 text-center text-sm font-black"><Repeat2 className="inline" size={16}/> Reorder</Link>
              <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Star size={18}/></button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
