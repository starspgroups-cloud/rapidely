import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import RoleSwitch from '../components/RoleSwitch';

const cats = [
  { name: 'Grocery', emoji: '🛒', offer: 'Daily staples', color: 'from-emerald-400/25 to-emerald-400/5' },
  { name: 'Dairy', emoji: '🥛', offer: 'Fresh in 15 min', color: 'from-sky-400/25 to-sky-400/5' },
  { name: 'Snacks', emoji: '🍪', offer: 'Party packs', color: 'from-amber-400/25 to-amber-400/5' },
  { name: 'Beverages', emoji: '🥤', offer: 'Cold drinks', color: 'from-cyan-400/25 to-cyan-400/5' },
  { name: 'Household', emoji: '🧼', offer: 'Cleaning needs', color: 'from-purple-400/25 to-purple-400/5' },
  { name: 'Clothes', emoji: '👕', offer: 'Local fashion', color: 'from-pink-400/25 to-pink-400/5' },
  { name: 'Beauty', emoji: '💄', offer: 'Personal care', color: 'from-rose-400/25 to-rose-400/5' }
];

export default function Categories() {
  return (
    <main className="px-4">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/20 to-success/10 p-5">
        <div className="flex items-center gap-2 text-success"><Sparkles size={18}/><b>Smart categories</b></div>
        <h1 className="mt-3 text-3xl font-black">Find everything from nearby trusted shops.</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Hyperlocal vendors, live stock, fast rider assignment and transparent prices.</p>
      </section>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {cats.map((cat) => (
          <Link to={`/?category=${cat.name}`} key={cat.name} className={`glass rounded-[1.6rem] bg-gradient-to-br ${cat.color} p-4 active:scale-[.98]`}>
            <div className="text-4xl">{cat.emoji}</div>
            <h3 className="mt-4 text-lg font-black">{cat.name}</h3>
            <p className="text-xs font-bold text-slate-400">{cat.offer}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-success">Explore <ArrowRight size={13}/></span>
          </Link>
        ))}
      </div>
    </main>
  );
}
