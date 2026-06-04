import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatRupees } from '../utils/money';
import QuantityStepper from './QuantityStepper';

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, addItem, decreaseItem, removeItem, subtotal, deliveryCharge, discount, total, itemCount } = useCartStore();
  const freePickupProgress = Math.min(100, Math.round((subtotal() / 499) * 100));
  return <AnimatePresence>{isCartOpen && <><motion.button aria-label="Close cart backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" /><motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-white/10 bg-[#0c0e18]/95 p-4 shadow-2xl backdrop-blur-2xl">
    <div className="flex items-center justify-between"><div><p className="text-sm text-slate-400">{itemCount()} items</p><h2 className="text-2xl font-black">Your cart</h2></div><button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15"><X /></button></div>
    {items.length === 0 ? <div className="grid flex-1 place-items-center text-center"><div><div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-rapid/20 text-rapid"><ShoppingBag size={38} /></div><h3 className="mt-4 text-xl font-black">Cart is empty</h3><p className="mt-1 text-slate-400">Add fresh items from catalog.</p></div></div> : <>
      <div className="mt-4 rounded-3xl bg-success/10 p-4 text-sm text-success"><b>Quick tip:</b> Use code RAPID10 for 10% off up to ₹50.<div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-success" style={{ width: `${freePickupProgress}%` }} /></div></div>
      <div className="no-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto pr-1">{items.map((item) => <div key={item.id} className="rounded-3xl bg-white/8 p-3"><div className="flex gap-3"><img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><h3 className="line-clamp-1 font-bold">{item.name}</h3><p className="text-xs text-slate-400">{item.unit}</p><p className="mt-1 font-black">{formatRupees(item.price * item.quantity)}</p></div><button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-300"><Trash2 size={17} /></button></div><div className="mt-3 flex justify-end"><QuantityStepper quantity={item.quantity} onIncrease={() => addItem(item)} onDecrease={() => decreaseItem(item.id)} /></div></div>)}</div>
      <div className="mt-4 rounded-3xl bg-white/8 p-4 text-sm"><div className="flex justify-between"><span>Subtotal</span><b>{formatRupees(subtotal())}</b></div><div className="mt-2 flex justify-between"><span>Delivery</span><b>{formatRupees(deliveryCharge())}</b></div>{discount() > 0 && <div className="mt-2 flex justify-between text-success"><span>Discount</span><b>-{formatRupees(discount())}</b></div>}<div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg"><span className="font-black">Total</span><b>{formatRupees(total())}</b></div></div>
      <Link onClick={() => setCartOpen(false)} to="/checkout" className="mt-3 rounded-full bg-success px-5 py-4 text-center font-black text-ink shadow-lg shadow-success/20">Proceed to checkout</Link>
    </>}
  </motion.aside></>}</AnimatePresence>;
}
