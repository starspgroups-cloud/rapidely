import { MessageCircle, PhoneCall, ShieldQuestion } from 'lucide-react';
import RoleSwitch from '../components/RoleSwitch';

export default function Support() {
  return <main className="px-4 pb-24"><RoleSwitch/><section className="glass mt-2 rounded-[2rem] bg-gradient-to-br from-rapid/25 to-success/10 p-5"><ShieldQuestion className="text-success"/><h1 className="mt-3 text-3xl font-black">Support & trust center</h1><p className="mt-2 text-sm font-semibold text-slate-300">Order issue, refund, vendor complaint, rider complaint and emergency support.</p></section><section className="mt-4 space-y-3"><a className="glass flex items-center gap-3 rounded-[1.6rem] p-4" href="tel:+919263501825"><PhoneCall className="text-success"/><div><h3 className="font-black">Call support</h3><p className="text-xs font-bold text-slate-400">Direct help for active order</p></div></a><a className="glass flex items-center gap-3 rounded-[1.6rem] p-4" href="https://wa.me/917870303163"><MessageCircle className="text-success"/><div><h3 className="font-black">WhatsApp order support</h3><p className="text-xs font-bold text-slate-400">Best for tier 2/3 city trust</p></div></a></section></main>;
}
