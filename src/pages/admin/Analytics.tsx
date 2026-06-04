import { useEffect, useState } from 'react';
import { Bike, IndianRupee, LineChart, PackageCheck, Store, TrendingUp } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import RoleSwitch from '../../components/RoleSwitch';
import { api } from '../../lib/api';
import { formatMoney } from '../../utils/money';

type Analytics = { orders: number; vendors: number; riders: number; products: number; platformCommission: number; gmVToday?: number; completedOrders?: number };

export default function Analytics() {
  const [data, setData] = useState<Analytics>({ orders: 0, vendors: 0, riders: 0, products: 0, platformCommission: 0 });
  useEffect(() => { api.adminAnalytics().then(setData); }, []);
  const bars = [68, 84, 58, 92, 76, 88, 95];
  return (
    <main className="px-4 pb-24">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-amber-400/20 to-rapid/15 p-5">
        <LineChart className="text-amber-300" size={32}/>
        <h1 className="mt-3 text-3xl font-black">Admin analytics</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Commission, GMV, orders, vendor/rider growth aur daily business health yahin se track hoga.</p>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard icon={IndianRupee} title="Commission" value={formatMoney(data.platformCommission)} note="Paid orders" tone="green"/>
        <KpiCard icon={PackageCheck} title="Orders" value={data.orders} note="All orders" tone="purple"/>
        <KpiCard icon={Store} title="Vendors" value={data.vendors} note="Registered shops" tone="amber"/>
        <KpiCard icon={Bike} title="Riders" value={data.riders} note="Delivery partners" tone="green"/>
      </section>
      <section className="glass mt-4 rounded-[2rem] p-5">
        <div className="flex items-center gap-2"><TrendingUp className="text-success"/><h2 className="font-black">7-day growth view</h2></div>
        <div className="mt-5 flex h-44 items-end gap-2 rounded-[1.5rem] bg-white/7 p-4">
          {bars.map((height, index) => <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-rapid to-success" style={{ height: `${height}%` }} />)}
        </div>
        <p className="mt-3 text-xs font-bold text-slate-400">Production me ye chart backend analytics endpoint se live data lega.</p>
      </section>
    </main>
  );
}
