import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatRupees } from '../utils/money';
export default function FloatingCartButton() {
  const { itemCount, total, setCartOpen } = useCartStore();
  if (itemCount() === 0) return null;
  return <button onClick={() => setCartOpen(true)} className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-success px-5 py-3 font-black text-ink shadow-2xl shadow-success/25 md:hidden"><ShoppingCart size={19} />{itemCount()} items • {formatRupees(total())}</button>;
}
