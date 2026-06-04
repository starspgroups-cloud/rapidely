import { FormEvent, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Bike, Crown, FileCheck2, Phone, ShieldCheck, Store, UserRound } from 'lucide-react';
import RoleSwitch from '../components/RoleSwitch';
import { api } from '../lib/api';
import { useAuthStore, UserRole } from '../store/authStore';
import { vibrate } from '../utils/mobile';

const roles: Array<{ label: string; value: UserRole; icon: typeof UserRound; route: string; note: string }> = [
  { label: 'Customer', value: 'customer', icon: UserRound, route: '/', note: 'Order groceries and track deliveries' },
  { label: 'Vendor', value: 'vendor', icon: Store, route: '/vendor/register', note: 'Register shop, upload items, manage orders' },
  { label: 'Rider', value: 'rider', icon: Bike, route: '/rider/register', note: 'Accept delivery jobs and earn incentives' },
  { label: 'Admin', value: 'admin', icon: Crown, route: '/admin', note: 'Approvals, commission and control' }
];

function roleHome(role: UserRole) {
  if (role === 'vendor') return '/vendor';
  if (role === 'rider') return '/rider';
  if (role === 'admin') return '/admin';
  return '/';
}

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);
  const selected = roles.find((item) => item.value === role)!;
  const isPhoneValid = /^\d{10}$/.test(phone);
  const isOtpValid = /^\d{6}$/.test(otp);
  const title = useMemo(() => otpSent ? 'Enter OTP to continue' : 'Login or register securely', [otpSent]);

  async function sendOtp(event?: FormEvent) {
    event?.preventDefault();
    if (!isPhoneValid) { toast.error('Enter valid 10-digit mobile number'); return; }
    setLoading(true);
    try {
      const res = await api.requestOtp({ phone, role, name: name.trim() || undefined });
      setOtpSent(true);
      setDevOtp(res.dev_otp || '');
      toast.success(res.message || 'OTP sent successfully');
      setTimeout(() => otpRef.current?.focus(), 100);
      vibrate(14);
    } catch {
      toast.error('OTP send nahi ho paya. Backend check karo.');
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event: FormEvent) {
    event.preventDefault();
    if (!isOtpValid) { toast.error('Enter 6-digit OTP'); return; }
    setLoading(true);
    try {
      const res = await api.verifyLoginOtp({ phone, otp });
      const user = { ...res.user, role };
      setAuth(res.token, user);
      toast.success(`${selected.label} login successful`);
      vibrate(20);
      navigate(roleHome(role));
    } catch {
      toast.error('Invalid OTP. Demo me 123456 use karo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="px-4 pb-24">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5">
        <ShieldCheck className="text-success" />
        <h1 className="mt-3 text-3xl font-black">{title}</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Customer, vendor, rider aur admin — sabka login yahin se hoga.</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {roles.map(({ label, value, icon: Icon }) => (
            <button key={value} type="button" onClick={() => { setRole(value); setOtpSent(false); setOtp(''); vibrate(8); }} className={`rounded-2xl border p-3 text-left transition active:scale-[.98] ${role === value ? 'border-success bg-success/15 text-white' : 'border-white/10 bg-white/8 text-slate-300'}`}>
              <Icon size={19} className={role === value ? 'text-success' : 'text-slate-400'} />
              <b className="mt-2 block text-sm">{label}</b>
            </button>
          ))}
        </div>

        <form onSubmit={otpSent ? verifyOtp : sendOtp} className="mt-5 space-y-3">
          {!otpSent ? (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Name / shop owner name optional" />
              <label className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3">
                <Phone size={18}/>
                <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,'').slice(0,10))} className="w-full bg-transparent font-black outline-none" placeholder="Enter 10-digit mobile" inputMode="numeric" />
              </label>
            </>
          ) : (
            <>
              <div className="rounded-2xl bg-white/8 p-3 text-sm font-bold text-slate-300">OTP sent to <span className="text-white">{phone}</span>{devOtp ? <span className="text-success"> • Demo OTP: {devOtp}</span> : null}</div>
              <input ref={otpRef} value={otp} onChange={(e)=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} className="input text-center text-2xl tracking-[.5em]" placeholder="123456" inputMode="numeric" />
            </>
          )}
          <button disabled={loading || (!otpSent && !isPhoneValid) || (otpSent && !isOtpValid)} className="tap w-full rounded-2xl bg-success py-3 font-black text-ink disabled:opacity-50">{loading ? 'Please wait...' : otpSent ? 'Verify & Continue' : `Send OTP as ${selected.label}`}</button>
          {otpSent ? <button type="button" onClick={() => sendOtp()} className="w-full rounded-2xl bg-white/10 py-3 text-sm font-black">Resend OTP</button> : null}
        </form>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map(({ label, icon: Icon, route, note }) => (
          <Link key={label} to={route} className="glass rounded-[1.6rem] p-4 active:scale-[.98]">
            <Icon className="text-rapidLight" />
            <h3 className="mt-3 font-black">{label} section</h3>
            <p className="text-xs font-bold text-slate-400">{note}</p>
          </Link>
        ))}
      </section>

      <section className="glass mt-4 rounded-[1.6rem] p-4 text-sm font-semibold text-slate-300">
        <FileCheck2 className="mb-2 text-success" />
        Vendor aur rider approval super admin karega. Approval ke baad dukandar products aur orders khud manage karega.
      </section>
    </main>
  );
}
