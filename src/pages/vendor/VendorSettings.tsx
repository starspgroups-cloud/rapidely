import { Clock, Percent, ToggleRight } from 'lucide-react';
import RoleSwitch from '../../components/RoleSwitch';

export default function VendorSettings() {
  return <main className="px-4 pb-24"><RoleSwitch/><h1 className="mt-2 text-3xl font-black">Vendor Settings</h1><p className="text-sm font-semibold text-slate-400">Shop timings, holiday mode, commission visibility and payout setup.</p><section className="mt-4 space-y-3"><div className="glass flex items-center justify-between rounded-[1.6rem] p-4"><div><Clock className="text-success"/><h3 className="mt-2 font-black">Shop timings</h3><p className="text-xs font-bold text-slate-400">8 AM to 10 PM</p></div><ToggleRight className="text-success"/></div><div className="glass rounded-[1.6rem] p-4"><Percent className="text-rapidLight"/><h3 className="mt-2 font-black">Platform commission</h3><p className="text-xs font-bold text-slate-400">Vendor base price safe. Customer sees base + 10–15% commission.</p></div></section></main>;
}
