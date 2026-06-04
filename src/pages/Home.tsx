import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles, Timer, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { Category, Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { t } from '../utils/i18n';
import ProductCard from '../components/ProductCard';
import FloatingCartButton from '../components/FloatingCartButton';
import ProductSkeleton from '../components/ProductSkeleton';
import OfferStrip from '../components/OfferStrip';

const categories: Array<Category | 'All'> = ['All', 'Grocery', 'Dairy', 'Snacks', 'Beverages', 'Household', 'Clothes', 'Beauty'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const language = useCartStore((state) => state.language);

  useEffect(() => { api.getCatalog().then(setProducts).finally(() => setLoading(false)); }, []);

  const filtered = useMemo(() => products.filter((product) => {
    const matchCategory = selected === 'All' || product.category === selected;
    const query = search.toLowerCase().trim();
    const matchSearch = !query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  }), [products, selected, search]);

  const heroItems = products.slice(0, 6);

  return <main className="px-3 pb-2 sm:px-4">
    <section className="glass relative overflow-hidden rounded-[1.8rem] p-5 sm:p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rapid/30 blur-3xl" /><div className="absolute -bottom-16 left-12 h-52 w-52 rounded-full bg-success/20 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative grid gap-6 md:grid-cols-[1.25fr_.85fr] md:items-center">
        <div><p className="mb-3 inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-2 text-sm font-black text-success"><Timer size={16} /> 15-20 minute local delivery</p><h2 className="max-w-2xl text-[2.65rem] font-black leading-[.95] tracking-tight sm:text-6xl">{t(language, 'heroTitle')}</h2><p className="mt-4 max-w-2xl text-slate-300">{t(language, 'heroSub')}</p><p className="mt-3 font-black text-rapid-light">{t(language, 'quickPromise')}</p><div className="mt-5 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold"><Truck size={17} className="text-success" /> Flat ₹40 delivery</span><span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold"><Sparkles size={17} className="text-rapid-light" /> Pickup free</span></div></div>
        <div className="grid grid-cols-3 gap-3 text-center">{heroItems.length ? heroItems.map((item, i) => <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} key={item.id} className="overflow-hidden rounded-3xl bg-white/10 p-2"><img src={item.image} alt={item.name} className="aspect-square w-full rounded-2xl object-cover" /></motion.div>) : Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-square rounded-3xl bg-white/10" />)}</div>
      </motion.div>
    </section>
    <section className="mt-5"><OfferStrip /></section>
    <section className="mt-6 space-y-4"><div className="glass flex items-center gap-3 rounded-3xl px-4 py-3"><Search className="text-slate-400" size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t(language, 'searchPlaceholder')} className="w-full bg-transparent outline-none placeholder:text-slate-500" /></div><div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setSelected(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${selected === category ? 'bg-rapid text-white shadow-lg shadow-rapid/20' : 'bg-white/10 text-slate-300 hover:bg-white/15'}`}>{category === 'All' ? t(language, 'all') : category}</button>)}</div></section>
    <section className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">{loading ? Array.from({ length: 12 }).map((_, index) => <ProductSkeleton key={index} />) : filtered.map((product) => <ProductCard key={product.id} product={product} />)}</section>
    {!loading && filtered.length === 0 && <div className="glass mt-8 rounded-3xl p-10 text-center text-slate-300">No products found.</div>}
    <FloatingCartButton />
  </main>;
}
