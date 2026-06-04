import { NavLink } from 'react-router-dom';
import { Bike, Crown, Store, UserRound } from 'lucide-react';
import { vibrate } from '../utils/mobile';

const roles = [
  { to: '/', label: 'Customer', icon: UserRound },
  { to: '/vendor', label: 'Vendor', icon: Store },
  { to: '/rider', label: 'Rider', icon: Bike },
  { to: '/admin', label: 'Admin', icon: Crown }
];

export default function RoleSwitch() {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 pt-1">
      {roles.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} onClick={() => vibrate(8)} className={({ isActive }) => `flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition ${isActive ? 'bg-rapid text-white shadow-lg shadow-rapid/30' : 'bg-white/8 text-slate-300'}`}>
          <Icon size={15} /> {label}
        </NavLink>
      ))}
    </div>
  );
}
