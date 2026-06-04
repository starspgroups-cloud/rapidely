import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, BadgeCheck, CreditCard, ShieldCheck, Smartphone } from 'lucide-react';
import { api } from '../lib/api';
import { formatRupees } from '../utils/money';
import { vibrate } from '../utils/mobile';

declare global { interface Window { Razorpay?: any } }

export default function Payment() {
  const { orderRef = '' } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.trackOrder(orderRef).then((data) => setAmount(Number(data.total || localStorage.getItem('rapidely-last-total') || 0)));
  }, [orderRef]);

  async function payNow() {
    setLoading(true);
    try {
      const payment = await api.createPayment(orderRef);
      const completeDemo = async () => {
        await api.verifyPayment({ order_ref: orderRef, demo: true, razorpay_order_id: payment.order_id });
        toast.success('Payment successful');
        vibrate(25);
        navigate(`/track/${orderRef}?paid=success`);
      };
      if (payment.demo || !window.Razorpay) {
        await completeDemo();
        return;
      }
      const rz = new window.Razorpay({
        key: payment.key,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        name: 'RapiDely',
        description: `Order ${orderRef}`,
        order_id: payment.order_id,
        theme: { color: '#7C6FE9' },
        handler: async (response: any) => {
          await api.verifyPayment({ order_ref: orderRef, ...response });
          toast.success('Payment successful');
          navigate(`/track/${orderRef}?paid=success`);
        }
      });
      rz.open();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Payment start nahi ho paya. Order accepted hona zaroori hai.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="px-4 pb-24">
      <Link to={`/track/${orderRef}`} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><ArrowLeft size={16}/> Tracking</Link>
      <section className="glass rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5">
        <div className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-success/15 text-success"><CreditCard size={32}/></div>
        <h1 className="mt-4 text-3xl font-black">Secure payment</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">Order accepted hone ke baad Razorpay/UPI/card payment yahin se complete hoga.</p>
        <div className="mt-5 rounded-3xl bg-white/8 p-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">Payable amount</p>
          <p className="mt-1 text-4xl font-black text-success">{formatRupees(amount)}</p>
          <p className="mt-2 text-xs font-bold text-slate-400">Order Ref: {orderRef}</p>
        </div>
        <button onClick={payNow} disabled={loading} className="tap mt-5 w-full rounded-2xl bg-success py-4 font-black text-ink disabled:opacity-60">{loading ? 'Starting payment...' : 'Pay securely now'}</button>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="glass rounded-[1.5rem] p-4"><ShieldCheck className="text-success"/><h3 className="mt-3 font-black">Safe</h3><p className="text-xs font-bold text-slate-400">Razorpay signature verify</p></div>
        <div className="glass rounded-[1.5rem] p-4"><Smartphone className="text-rapidLight"/><h3 className="mt-3 font-black">UPI ready</h3><p className="text-xs font-bold text-slate-400">PhonePe/GPay/Paytm supported</p></div>
        <div className="glass col-span-2 rounded-[1.5rem] p-4"><BadgeCheck className="text-success"/><h3 className="mt-3 font-black">Auto order update</h3><p className="text-xs font-bold text-slate-400">Payment success ke baad tracking me confetti + paid status aa jayega.</p></div>
      </section>
    </main>
  );
}
