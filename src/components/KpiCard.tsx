import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  note?: string;
  icon: LucideIcon;
  tone?: 'purple' | 'green' | 'amber' | 'red';
}

const tones = {
  purple: 'from-rapid/35 to-rapid/10 text-rapidLight',
  green: 'from-success/30 to-success/10 text-success',
  amber: 'from-amber-400/30 to-amber-400/10 text-amber-300',
  red: 'from-rose-400/30 to-rose-400/10 text-rose-300'
};

export default function KpiCard({ title, value, note, icon: Icon, tone = 'purple' }: Props) {
  return (
    <div className="glass rounded-[1.6rem] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400">{title}</p>
          <h3 className="mt-1 text-2xl font-black text-white">{value}</h3>
          {note ? <p className="mt-1 text-[11px] font-semibold text-slate-400">{note}</p> : null}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}
