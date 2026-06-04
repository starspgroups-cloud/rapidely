import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { OrderStatus } from '../types';
import { useCartStore } from '../store/cartStore';
import { t } from '../utils/i18n';
const statuses: OrderStatus[] = ['verified', 'accepted', 'paid', 'shipped', 'delivered'];
export default function StatusTimeline({ status }: { status: OrderStatus }) {
  const language = useCartStore((s) => s.language);
  const current = statuses.indexOf(status);
  return <section className="glass rounded-[2rem] p-6"><h3 className="text-xl font-black">Live order timeline</h3><div className="mt-6 space-y-0">{statuses.map((step, index) => { const done = index <= current; const active = index === current; return <div key={step} className="relative flex gap-4 pb-8 last:pb-0"><div className={`absolute left-[15px] top-8 h-full w-0.5 ${index < current ? 'bg-success' : 'bg-white/10'} last:hidden`} /><div className={`relative z-10 grid h-8 w-8 place-items-center rounded-full ${done ? 'bg-success text-ink' : 'bg-white/10 text-slate-500'}`}>{done ? <CheckCircle2 size={19} /> : <Circle size={16} />}</div><div><p className={`font-black capitalize ${done ? 'text-white' : 'text-slate-500'}`}>{t(language, step)}</p><p className="mt-1 text-sm text-slate-400">{active ? <span className="inline-flex items-center gap-1 text-success"><Clock size={14} /> Current step in progress</span> : done ? 'Completed' : 'Waiting for store update'}</p></div></div>; })}</div></section>;
}
