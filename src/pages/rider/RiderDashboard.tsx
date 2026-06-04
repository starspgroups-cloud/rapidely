import { Bike, CheckCircle2, LocateFixed, MapPin, Navigation, Phone, Target, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import { demoDeliveryTasks, demoRider } from '../../data/marketplaceDemo';
import { RIDER_DAILY_INCENTIVE, RIDER_DAILY_TARGET, riderIncentive } from '../../utils/commission';
import { formatMoney } from '../../utils/money';
import { vibrate } from '../../utils/mobile';
import { api } from '../../lib/api';

export default function RiderDashboard() {
  const accept = (ref: string) => { vibrate(18); toast.success(`Delivery accepted: ${ref}`); };
  const shareLocation = () => {
    if (!navigator.geolocation) { toast.error('GPS not supported'); return; }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await api.updateRiderLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      toast.success('Live location updated');
      vibrate(15);
    }, () => toast.error('Location permission allow karo'), { enableHighAccuracy: true, timeout: 10000 });
  };
  const remaining = Math.max(0, RIDER_DAILY_TARGET - demoRider.completedToday);
  return (
    <main className="px-4">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-success/20 to-rapid/10 p-5">
        <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-success">Delivery partner</p><h1 className="mt-1 text-3xl font-black">{demoRider.name}</h1><p className="text-sm font-semibold text-slate-300">Online • Near Munger market</p></div><div className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-success/15 text-success"><Bike size={32}/></div></div>
      <button onClick={shareLocation} className="tap mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-3 font-black text-ink"><LocateFixed size={18}/> Update precise GPS</button>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={Wallet} title="Today earning" value={formatMoney(demoRider.earningToday + riderIncentive(demoRider.completedToday))} note="₹30/order" tone="green"/>
        <KpiCard icon={Target} title="Target left" value={remaining} note={`${RIDER_DAILY_TARGET} orders = +₹${RIDER_DAILY_INCENTIVE}`} tone="amber"/>
      </section>
      <section className="glass mt-4 rounded-[1.7rem] p-4">
        <h2 className="font-black">Available nearby deliveries</h2>
        <p className="text-xs font-bold text-slate-400">Precise map issue avoid: pickup/drop text + navigation button.</p>
      </section>
      <section className="mt-3 space-y-3">
        {demoDeliveryTasks.map((task) => (
          <article key={task.id} className="glass rounded-[1.6rem] p-4">
            <div className="flex items-start justify-between"><div><h3 className="text-lg font-black">#{task.orderRef}</h3><p className="text-xs font-bold text-slate-400">{task.distanceKm} km • fixed earning {formatMoney(task.earning)}</p></div><span className="rounded-full bg-success/15 px-3 py-1 text-xs font-black text-success">Available</span></div>
            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-300"><p className="flex gap-2"><MapPin size={17} className="text-success"/>Pickup: {task.pickup}</p><p className="flex gap-2"><Navigation size={17} className="text-rapidLight"/>Drop: {task.drop}</p></div>
            <div className="mt-4 flex gap-2"><button onClick={() => accept(task.orderRef)} className="tap flex-1 rounded-2xl bg-success px-3 py-3 font-black text-ink"><CheckCircle2 className="inline" size={17}/> Accept</button><a href={`tel:${task.vendorPhone}`} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Phone size={18}/></a></div>
          </article>
        ))}
      </section>
    </main>
  );
}
