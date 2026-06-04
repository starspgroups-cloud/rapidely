import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import toast from 'react-hot-toast';
import { Copy, CreditCard, MessageCircle, PackageCheck, Phone, RefreshCw, Truck } from 'lucide-react';
import { api } from '../lib/api';
import { TrackingResponse } from '../types';
import { formatRupees } from '../utils/money';
import { useCartStore } from '../store/cartStore';
import { t } from '../utils/i18n';
import StatusTimeline from '../components/StatusTimeline';
import Loading from '../components/Loading';
import { useWindowSize } from '../hooks/useWindowSize';

export default function OrderTracking() {
  const { orderRef = '' } = useParams();
  const [params] = useSearchParams();
  const [tracking, setTracking] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const { language, clearCart } = useCartStore();
  const { width, height } = useWindowSize();
  const paidCallback = params.get('paid') === 'success';
  async function load() { setLoading(true); const data = await api.trackOrder(orderRef); setTracking(data); setLoading(false); }
  useEffect(() => { load(); }, [orderRef]);
  useEffect(() => { if (paidCallback) { setConfetti(true); clearCart(); toast.success('Payment successful!'); const id = window.setTimeout(() => setConfetti(false), 5500); return () => window.clearTimeout(id); } }, [paidCallback]);
  const canPay = tracking?.status === 'accepted';
  const showShipping = tracking && ['paid', 'shipped', 'delivered'].includes(tracking.status);
  const etaMinutes = useMemo(() => tracking?.eta || '25-35 minutes', [tracking?.eta]);
  if (loading) return <Loading />;
  if (!tracking) return <main className="p-8 text-center">Order not found.</main>;
  function copyRef() { navigator.clipboard.writeText(tracking!.order_ref); toast.success('Order ref copied'); }
  return <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">{confetti && <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={260} />}<section className="glass mb-5 rounded-[2rem] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 inline-flex rounded-full bg-success/15 px-3 py-1 text-sm font-bold text-success">Live status</p><h2 className="text-3xl font-black">{t(language, 'tracking')}</h2><p className="mt-2 text-slate-400">Order Ref: <b className="text-white">{tracking.order_ref}</b> <button onClick={copyRef} className="ml-2 inline-flex rounded-full bg-white/10 p-1 align-middle"><Copy size={14} /></button></p></div><button onClick={load} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/15"><RefreshCw size={16} /> Refresh</button></div></section><div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><StatusTimeline status={tracking.status} /><aside className="glass rounded-[2rem] p-6"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-rapid/20 text-rapid-light"><PackageCheck size={40} /></div><h3 className="mt-5 text-2xl font-black">Current status: <span className="capitalize text-success">{tracking.status}</span></h3>{tracking.total ? <p className="mt-3 text-slate-300">Total amount: <b className="text-white">{formatRupees(tracking.total)}</b></p> : null}<div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-3xl bg-white/8 p-4"><Truck className="mb-2 text-success" /><b>ETA</b><p className="mt-1 text-sm text-slate-400">{etaMinutes}</p></div><div className="rounded-3xl bg-white/8 p-4"><Phone className="mb-2 text-success" /><b>Support</b><p className="mt-1 text-sm text-slate-400">+91-7870303163</p></div></div>{canPay && <Link to={`/payment/${tracking.order_ref}`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-4 font-black text-ink"><CreditCard size={18} /> {t(language, 'payNow')}</Link>}{showShipping && <div className="mt-6 rounded-3xl bg-white/10 p-4"><b>{t(language, 'shippedInfo')}</b><p className="mt-2 text-sm text-slate-300">{tracking.shipping_info || 'Payment received. Store team is preparing your order.'}</p>{tracking.rider_name && <p className="mt-3 text-sm">Rider: <b>{tracking.rider_name}</b> {tracking.rider_phone}</p>}</div>}<Link to={`/live/${tracking.order_ref}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 font-bold hover:bg-white/15"><Truck size={18} /> Live map tracking</Link><a href="https://wa.me/917870303163" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 font-bold hover:bg-white/15"><MessageCircle size={18} /> WhatsApp support</a><Link to="/" className="mt-3 inline-flex w-full justify-center rounded-full bg-white/10 px-5 py-3 font-bold hover:bg-white/15">Shop more</Link></aside></div></main>;
}
