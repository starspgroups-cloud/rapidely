import { Link, NavLink } from 'react-router-dom';
import { Languages, ShoppingBag } from 'lucide-react';
import logo from '../assets/rapidely-logo.png';
import { useCartStore } from '../store/cartStore';
import { t } from '../utils/i18n';
import { formatRupees } from '../utils/money';

export default function Navbar() {
  const { language, setLanguage, itemCount, total, setCartOpen } = useCartStore();
  return <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090A12]/75 backdrop-blur-2xl"><nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
    <Link to="/" className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-rapid text-white shadow-lg shadow-rapid/30"><ShoppingBag size={24} /></div><div><h1 className="text-xl font-black leading-none">RapiDely</h1><p className="mt-1 hidden text-xs text-slate-300 sm:block">Order Now, Get Now</p></div></Link>
    <div className="hidden items-center gap-2 md:flex"><NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold ${isActive ? 'bg-white/12 text-white' : 'text-slate-300'}`}>{t(language, 'home')}</NavLink><NavLink to="/categories" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold ${isActive ? 'bg-white/12 text-white' : 'text-slate-300'}`}>Categories</NavLink><NavLink to="/orders" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold ${isActive ? 'bg-white/12 text-white' : 'text-slate-300'}`}>Orders</NavLink><NavLink to="/profile" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold ${isActive ? 'bg-white/12 text-white' : 'text-slate-300'}`}>Profile</NavLink></div>
    <div className="flex items-center gap-2"><button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-bold hover:bg-white/15"><Languages size={17} />{language === 'en' ? 'हिंदी' : 'EN'}</button><button onClick={() => setCartOpen(true)} className="relative inline-flex items-center gap-2 rounded-full bg-rapid px-3 py-2 font-black shadow-lg shadow-rapid/25"><ShoppingBag size={18} /><span className="hidden sm:inline">{formatRupees(total())}</span>{itemCount() > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-success px-1 text-xs text-ink">{itemCount()}</span>}</button></div>
  </nav></header>;
}
