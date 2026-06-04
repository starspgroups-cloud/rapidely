import { Minus, Plus } from 'lucide-react';
export default function QuantityStepper({ quantity, onIncrease, onDecrease }: { quantity: number; onIncrease: () => void; onDecrease: () => void }) {
  return <div className="inline-flex items-center overflow-hidden rounded-full border border-rapid/40 bg-rapid/15 text-white shadow-lg shadow-rapid/10"><button aria-label="Decrease" onClick={onDecrease} className="tap grid h-9 w-9 place-items-center hover:bg-white/10"><Minus size={15} /></button><span className="min-w-8 text-center text-sm font-black">{quantity}</span><button aria-label="Increase" onClick={onIncrease} className="tap grid h-9 w-9 place-items-center hover:bg-white/10"><Plus size={15} /></button></div>;
}
