import { NavLink, useLocation } from 'react-router-dom';
import { Bike, Grid2X2, Home, ListChecks, LogIn, ShoppingBag, Store, UserRound } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { vibrate } from '../utils/mobile';

const customerTabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/categories', label: 'Categories', icon: Grid2X2 },
  { to: '/checkout', label: 'Cart', icon: ShoppingBag },
  { to: '/orders', label: 'Orders', icon: ListChecks },
  { to: '/login', label: 'Login', icon: LogIn }
];
const vendorTabs = [
  { to: '/vendor', label: 'Home', icon: Store },
  { to: '/vendor/orders', label: 'Orders', icon: ListChecks },
  { to: '/vendor/products', label: 'Products', icon: Grid2X2 },
  { to: '/vendor/earnings', label: 'Earning', icon: ShoppingBag },
  { to: '/login', label: 'Login', icon: LogIn }
];
const riderTabs = [
  { to: '/rider', label: 'Jobs', icon: Bike },
  { to: '/rider/earnings', label: 'Earning', icon: ShoppingBag },
  { to: '/login', label: 'Login', icon: LogIn },
  { to: '/profile', label: 'Profile', icon: UserRound }
];
const adminTabs = [
  { to: '/admin', label: 'Admin', icon: UserRound },
  { to: '/admin/approvals', label: 'Approve', icon: ListChecks },
  { to: '/admin/commission', label: 'Commission', icon: ShoppingBag },
  { to: '/login', label: 'Login', icon: LogIn }
];

export default function BottomTabBar() {
  const count = useCartStore((s) => s.itemCount());
  const location = useLocation();
  const tabs = location.pathname.startsWith('/vendor') ? vendorTabs : location.pathname.startsWith('/rider') ? riderTabs : location.pathname.startsWith('/admin') ? adminTabs : customerTabs;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#070812]/90 px-3 pb-[calc(.6rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-2xl md:hidden">
      <div className={`mx-auto grid max-w-[480px] gap-1 ${tabs.length === 5 ? 'grid-cols-5' : tabs.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/' || to === '/vendor' || to === '/rider' || to === '/admin'} onClick={() => vibrate(8)} className={({ isActive }) => `relative flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10.5px] font-black transition active:scale-95 ${isActive ? 'bg-rapid text-white shadow-lg shadow-rapid/25' : 'text-slate-400'}`}>
            <Icon size={19} />
            <span>{label}</span>
            {label === 'Cart' && count > 0 ? <b className="absolute right-2 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-success px-1 text-[10px] text-ink">{count}</b> : null}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
