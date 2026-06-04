import { motion } from 'framer-motion';
const offers = ['Use RAPID10 and save up to ₹50', 'Flat ₹40 local delivery', 'Self-pickup is free', 'Fresh dairy delivered in 15 minutes'];
export default function OfferStrip() {
  return <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">{offers.map((offer, index) => <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} key={offer} className="shrink-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100">🎁 {offer}</motion.div>)}</div>;
}
