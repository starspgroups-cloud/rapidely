import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Bike, Compass, LocateFixed, MapPinned, Navigation2, Phone } from 'lucide-react';
import { api } from '../lib/api';

export default function LiveTracking() {
  const { orderRef = '' } = useParams();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [eta, setEta] = useState('25-35 min');

  useEffect(() => { api.trackOrder(orderRef).then((data) => setEta(data.eta || '25-35 min')); }, [orderRef]);

  function locate() {
    if (!navigator.geolocation) { toast.error('GPS not supported on this device'); return; }
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      toast.success('Location captured');
    }, () => toast.error('Location permission allow karo'), { enableHighAccuracy: true, timeout: 10000 });
  }

  return (
    <main className="px-4 pb-24">
      <Link to={`/track/${orderRef}`} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><ArrowLeft size={16}/> Back</Link>
      <section className="glass rounded-[2rem] bg-gradient-to-br from-success/20 to-rapid/10 p-5">
        <MapPinned className="text-success" size={32}/>
        <h1 className="mt-3 text-3xl font-black">Live delivery tracking</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Precise map problem avoid karne ke liye text address + GPS fallback + navigation button diya gaya hai.</p>
      </section>
      <section className="glass mt-4 rounded-[2rem] p-4">
        <div className="relative h-72 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,.2),transparent_25%),radial-gradient(circle_at_70%_60%,rgba(124,111,233,.25),transparent_30%),#0b1020]">
          <div className="absolute left-6 top-8 rounded-2xl bg-white/10 px-3 py-2 text-xs font-black"><Compass size={14} className="inline text-success"/> Pickup store</div>
          <div className="absolute bottom-8 right-6 rounded-2xl bg-success px-3 py-2 text-xs font-black text-ink"><Bike size={14} className="inline"/> Rider moving</div>
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-success/30 bg-success/10 animate-pulse" />
        </div>
        <button onClick={locate} className="tap mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-3 font-black text-ink"><LocateFixed size={18}/> Use my current GPS</button>
        {coords ? <p className="mt-3 text-center text-xs font-bold text-slate-400">Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)}</p> : null}
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="glass rounded-[1.5rem] p-4"><Navigation2 className="text-success"/><b className="mt-2 block">ETA</b><p className="text-sm text-slate-400">{eta}</p></div>
        <a href="tel:+917870303163" className="glass rounded-[1.5rem] p-4"><Phone className="text-rapidLight"/><b className="mt-2 block">Call support</b><p className="text-sm text-slate-400">Instant help</p></a>
      </section>
    </main>
  );
}
