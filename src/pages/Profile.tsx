import { Bike, ChevronRight, Crown, HelpCircle, LogIn, LogOut, ShieldCheck, Store, UserRound, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RoleSwitch from '../components/RoleSwitch';
import { useAuthStore } from '../store/authStore';

const items = [
  { to: '/login', icon: LogIn, title: 'Login / Registration', sub: 'Customer, vendor, rider and admin OTP entry' },
  { to: '/vendor/register', icon: Store, title: 'Vendor / Dukandar Registration', sub: 'Send shop for approval' },
  { to: '/rider/register', icon: Bike, title: 'Delivery Boy Registration', sub: 'KYC and earning setup' },
  { to: '/vendor', icon: Store, title: 'Vendor / Dukandar Panel', sub: 'Products, orders, payouts' },
  { to: '/rider', icon: Bike, title: 'Delivery Boy Panel', sub: 'Jobs, earnings, incentives' },
  { to: '/admin', icon: Crown, title: 'Super Admin Panel', sub: 'Approvals, commission, analytics' },
  { to: '/wallet', icon: Wallet, title: 'Wallet', sub: 'Cashback and refunds' },
  { to: '/support', icon: HelpCircle, title: 'Help & WhatsApp Support', sub: 'Fast customer support' }
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  return (
    <main className="px-4 pb-24">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] p-5 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.8rem] bg-rapid text-white shadow-lg shadow-rapid/30"><UserRound size={36}/></div>
        <h1 className="mt-3 text-2xl font-black">{user?.name || 'RapiDely Account'}</h1>
        <p className="text-sm font-semibold text-slate-400">{user ? `${user.role.toUpperCase()} • ${user.phone}` : 'Login karke customer, vendor, rider ya admin section use karo'}</p>
        {user ? <button onClick={() => { logout(); toast.success('Logged out'); navigate('/login'); }} className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm font-black"><LogOut className="inline" size={16}/> Logout</button> : <Link to="/login" className="mt-4 inline-flex rounded-2xl bg-success px-5 py-3 font-black text-ink"><ShieldCheck size={17}/> Login / Register</Link>}
      </section>
      <section className="mt-4 space-y-3">
        {items.map(({ to, icon: Icon, title, sub }) => (
          <Link to={to} key={title} className="glass flex items-center gap-3 rounded-[1.4rem] p-4 active:scale-[.98]">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Icon size={22}/></div>
            <div className="min-w-0 flex-1"><h3 className="font-black">{title}</h3><p className="text-xs font-bold text-slate-400">{sub}</p></div>
            <ChevronRight size={18} className="text-slate-500"/>
          </Link>
        ))}
      </section>
    </main>
  );
}
