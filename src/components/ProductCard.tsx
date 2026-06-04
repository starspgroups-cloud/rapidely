import { Link } from 'react-router-dom';
import { Clock, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { discountPercent, formatRupees } from '../utils/money';
import QuantityStepper from './QuantityStepper';
import { vibrate } from '../utils/mobile';

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, decreaseItem } = useCartStore();
  const existing = items.find((item) => item.id === product.id);
  const discount = discountPercent(product.price, product.mrp);
  const lowStock = typeof product.stock === 'number' && product.stock <= 15;
  return (
    <motion.article layout whileHover={{ y: -5, scale: 1.015 }} className="glass mobile-card group relative flex h-full flex-col overflow-hidden p-2 transition hover:border-rapid/60">
      {discount > 0 && <span className="absolute left-4 top-4 z-10 rounded-full bg-success px-2.5 py-1 text-[11px] font-black text-ink">{discount}% OFF</span>}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-white/12 to-white/5">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover p-1 transition duration-500 group-hover:scale-110" />
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur"><Clock size={12} /> {product.deliveryEta || '20 min'}</span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-2 px-1">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-black leading-tight sm:text-base">{product.name}</h3>
            <p className="mt-1 text-xs text-slate-400">{product.unit} • {product.category}</p>
          </div>
          <span className="shrink-0 rounded-full bg-success/15 px-2 py-1 text-[11px] font-bold text-success"><Star className="mr-1 inline" size={11} fill="currentColor" />{product.rating ?? 4.5}</span>
        </div>
        <p className="mt-2 line-clamp-2 px-1 text-xs text-slate-300 sm:text-sm">{product.description}</p>
        <div className="mt-2 flex min-h-6 flex-wrap gap-1 px-1">
          {lowStock && <span className="rounded-full bg-red-500/15 px-2 py-1 text-[10px] font-bold text-red-200">Only {product.stock} left</span>}
          {product.tags?.slice(0, 1).map((tag) => <span key={tag} className="rounded-full bg-rapid/20 px-2 py-1 text-[10px] font-bold text-rapid-light"><Sparkles size={10} className="mr-1 inline" />{tag}</span>)}
        </div>
      </Link>
      <div className="mt-auto flex items-center justify-between gap-2 px-1 pt-3">
        <div>
          <strong className="block text-base leading-none sm:text-lg">{formatRupees(product.price)}</strong>
          {product.mrp && product.mrp > product.price ? <span className="text-xs text-slate-500 line-through">{formatRupees(product.mrp)}</span> : null}
        </div>
        {existing ? <QuantityStepper quantity={existing.quantity} onIncrease={() => { vibrate(8); addItem(product); }} onDecrease={() => { vibrate(8); decreaseItem(product.id); }} /> : <button onClick={() => { vibrate(10); addItem(product); }} className="tap rounded-full bg-rapid px-4 py-2 text-sm font-black shadow-lg shadow-rapid/25 hover:bg-rapid/90">ADD</button>}
      </div>
    </motion.article>
  );
}
