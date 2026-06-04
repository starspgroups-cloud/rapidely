import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { Product } from '../types';
import { discountPercent, formatRupees } from '../utils/money';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';
import FloatingCartButton from '../components/FloatingCartButton';
import Loading from '../components/Loading';
import QuantityStepper from '../components/QuantityStepper';
import { t } from '../utils/i18n';

export default function ProductDetail() {
  const { id = '' } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { items, addItem, decreaseItem, language, setCartOpen } = useCartStore();
  const existing = items.find((item) => item.id === product?.id);

  useEffect(() => { setLoading(true); api.getProduct(id).then((data) => { setProduct(data.product); setRelated(data.related); }).finally(() => setLoading(false)); }, [id]);
  if (loading) return <Loading />;
  if (!product) return <main className="p-8 text-center">Product not found.</main>;
  const discount = discountPercent(product.price, product.mrp);

  return <main className="mx-auto max-w-7xl px-4 pb-28 pt-6">
    <Link to="/" className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"><ArrowLeft size={16} /> Back</Link>
    <section className="glass grid gap-7 overflow-hidden rounded-[2rem] p-5 md:grid-cols-2 md:p-8">
      <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[2rem] bg-white/10"><img src={product.image} alt={product.name} className="h-full w-full object-cover" />{discount > 0 && <span className="absolute left-5 top-5 rounded-full bg-success px-3 py-1 text-sm font-black text-ink">{discount}% OFF</span>}</motion.div>
      <div className="flex flex-col justify-center"><p className="mb-3 inline-flex w-fit rounded-full bg-rapid/20 px-3 py-1 text-sm font-bold text-rapid-light">{product.category} • {product.unit}</p><h2 className="text-4xl font-black tracking-tight">{product.name}</h2><div className="mt-3 flex flex-wrap items-center gap-3 text-sm"><span className="inline-flex items-center gap-1 text-success"><Star size={18} fill="currentColor" /> <b>{product.rating ?? 4.5}</b></span><span className="text-slate-400">Stock: {product.stock ?? 'Available'}</span><span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><Clock size={15} /> {product.deliveryEta || '20 min'}</span></div><p className="mt-5 text-lg text-slate-300">{product.details || product.description}</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/8 p-3 text-sm"><Truck className="mb-2 text-success" /> Fast local delivery</div><div className="rounded-2xl bg-white/8 p-3 text-sm"><ShieldCheck className="mb-2 text-success" /> Quality checked</div><div className="rounded-2xl bg-white/8 p-3 text-sm">🏪 Free pickup</div></div><div className="mt-8 flex flex-wrap items-center gap-4"><div><strong className="text-4xl">{formatRupees(product.price)}</strong>{product.mrp && product.mrp > product.price && <span className="ml-3 text-slate-500 line-through">{formatRupees(product.mrp)}</span>}</div>{existing ? <QuantityStepper quantity={existing.quantity} onIncrease={() => addItem(product)} onDecrease={() => decreaseItem(product.id)} /> : <button onClick={() => { addItem(product); setCartOpen(true); }} className="inline-flex items-center gap-2 rounded-full bg-rapid px-6 py-3 font-black shadow-lg shadow-rapid/30"><ShoppingCart size={18} /> Add to cart</button>}</div></div>
    </section>
    {related.length > 0 && <section className="mt-8"><h3 className="mb-4 text-2xl font-black">{t(language, 'related')}</h3><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    <FloatingCartButton />
  </main>;
}
