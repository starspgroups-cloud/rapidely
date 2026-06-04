import { useState } from 'react';
import toast from 'react-hot-toast';
import { BellRing, CheckCircle2, Send, Smartphone } from 'lucide-react';
import { api } from '../lib/api';

const demoAlerts = [
  'Order accepted by vendor',
  'Rider picked your package',
  'Payment successful',
  'Vendor payout generated'
];

export default function Notifications() {
  const [enabled, setEnabled] = useState(false);
  async function enablePush() {
    try {
      setEnabled(true);
      await api.saveFcmToken('demo-web-token');
      toast.success('Notifications enabled for demo device');
    } catch { toast.error('Login ke baad notifications enable honge'); }
  }
  return (
    <main className="px-4 pb-24">
      <section className="glass rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5">
        <BellRing className="text-success" size={32}/>
        <h1 className="mt-3 text-3xl font-black">Push notifications</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">New order, vendor accept, rider assigned, payment and delivery updates customer/vendor/rider ko milenge.</p>
        <button onClick={enablePush} className="tap mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-3 font-black text-ink"><Smartphone size={18}/>{enabled ? 'Enabled' : 'Enable notifications'}</button>
      </section>
      <section className="mt-4 space-y-3">
        {demoAlerts.map((alert) => <article key={alert} className="glass flex items-center gap-3 rounded-[1.4rem] p-4"><CheckCircle2 className="text-success"/><div><h3 className="font-black">{alert}</h3><p className="text-xs font-bold text-slate-400">Realtime Socket.IO + Firebase FCM ready</p></div><Send className="ml-auto text-slate-500" size={18}/></article>)}
      </section>
    </main>
  );
}
