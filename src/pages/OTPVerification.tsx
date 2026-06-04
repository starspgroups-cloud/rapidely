import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { api } from '../lib/api';

const OTP_LENGTH = 6;
export default function OTPVerification() {
  const { orderRef = '' } = useParams();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [cooldown, setCooldown] = useState(30);
  const [submitting, setSubmitting] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = digits.join('');
  useEffect(() => { refs.current[0]?.focus(); }, []);
  useEffect(() => { if (cooldown <= 0) return; const id = window.setInterval(() => setCooldown((c) => c - 1), 1000); return () => window.clearInterval(id); }, [cooldown]);
  useEffect(() => { if (otp.length === OTP_LENGTH && !digits.includes('')) verify(); }, [otp]);
  function update(index: number, value: string) { const nextValue = value.replace(/\D/g, '').slice(-1); setDigits((current) => { const next = [...current]; next[index] = nextValue; return next; }); if (nextValue && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus(); }
  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) { event.preventDefault(); const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH).split(''); if (!pasted.length) return; setDigits(Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] || '')); refs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus(); }
  function handleKey(index: number, event: KeyboardEvent<HTMLInputElement>) { if (event.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus(); }
  async function verify() { if (otp.length !== OTP_LENGTH) { toast.error('Enter complete OTP'); return; } setSubmitting(true); try { const data = await api.verifyOtp(orderRef, otp); if (data.success) { toast.success('Order verified'); navigate(`/track/${data.order_ref}`); } else toast.error('Invalid OTP'); } catch { toast.error('Verification failed'); } finally { setSubmitting(false); } }
  async function resend() { if (cooldown > 0) return; const data = await api.resendOtp(orderRef); toast.success(data.message || 'OTP resent'); setCooldown(30); }
  return <main className="mx-auto max-w-xl px-4 py-8"><Link to="/checkout" className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"><ArrowLeft size={16} /> Back</Link><section className="glass rounded-[2rem] p-6 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-success/15 text-success"><ShieldCheck size={40} /></div><h2 className="mt-5 text-3xl font-black">Verify your order</h2><p className="mt-2 text-slate-400">Enter 6-digit OTP for order <b className="text-white">{orderRef}</b>. Demo OTP: <b className="text-success">123456</b></p><div className="mt-7 grid grid-cols-6 gap-2">{digits.map((digit, index) => <input key={index} ref={(el) => { refs.current[index] = el; }} value={digit} onChange={(event: ChangeEvent<HTMLInputElement>) => update(index, event.target.value)} onKeyDown={(event) => handleKey(index, event)} onPaste={handlePaste} inputMode="numeric" maxLength={1} className="h-14 rounded-2xl border border-white/10 bg-white/10 text-center text-xl font-black outline-none transition focus:border-rapid focus:bg-rapid/15" />)}</div><button onClick={verify} disabled={submitting} className="mt-7 w-full rounded-full bg-success px-5 py-4 font-black text-ink disabled:opacity-60">{submitting ? 'Verifying...' : 'Verify OTP'}</button><button onClick={resend} disabled={cooldown > 0} className="mt-4 text-sm font-bold text-rapid-light disabled:text-slate-500">{cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}</button></section></main>;
}
