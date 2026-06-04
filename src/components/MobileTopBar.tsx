import { Link } from 'react-router-dom';
import { Languages, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatRupees } from '../utils/money';
import { vibrate } from '../utils/mobile';
import logo from '../assets/rapidely-logo.png';

export default function MobileTopBar() {
  const { language, setLanguage, itemCount, total, setCartOpen } = useCartStore();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070812]/85 px-3 pb-2 pt-[calc(.75rem+env(safe-area-inset-top))] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => vibrate(8)}>
          <img src={logo} alt="RapiDely" className="h-12 w-12 shrink-0 rounded-[1.15rem] object-cover shadow-lg shadow-rapid/30" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-black leading-none">RapiDely</h1>
            <p className="mt-1 hidden truncate text-[11px] text-slate-300 min-[390px]:block">Order Now, Get Now</p>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => { vibrate(8); setLanguage(language === 'en' ? 'hi' : 'en'); }} className="inline-flex h-11 items-center gap-1 rounded-full bg-white/10 px-3 text-sm font-black active:scale-95">
            <Languages size={16} />{language === 'en' ? 'हिंदी' : 'EN'}
          </button>
          <button onClick={() => { vibrate(10); setCartOpen(true); }} className="relative inline-flex h-11 items-center gap-2 rounded-full bg-rapid px-3 text-sm font-black shadow-lg shadow-rapid/25 active:scale-95">
            <ShoppingBag size={17} /><span>{formatRupees(total())}</span>
            {itemCount() > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-success px-1 text-[11px] text-ink">{itemCount()}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
