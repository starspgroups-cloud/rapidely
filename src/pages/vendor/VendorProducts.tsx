import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { ImagePlus, PackagePlus, Percent, ToggleRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import RoleSwitch from '../../components/RoleSwitch';
import { demoVendorProducts } from '../../data/marketplaceDemo';
import { api } from '../../lib/api';
import { customerPriceFromBase, DEFAULT_VENDOR_COMMISSION } from '../../utils/commission';
import { formatMoney } from '../../utils/money';

type FormState = { name: string; category: string; basePrice: string; stock: string; unit: string; description: string; image: string };

async function compressImage(file: File): Promise<File> {
  const image = new Image();
  const url = URL.createObjectURL(file);
  await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = reject; image.src = url; });
  const canvas = document.createElement('canvas');
  const max = 900;
  const scale = Math.min(1, max / Math.max(image.width, image.height));
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b || file), 'image/webp', 0.82));
  URL.revokeObjectURL(url);
  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
}

export default function VendorProducts() {
  const [form, setForm] = useState<FormState>({ name: '', category: 'Grocery', basePrice: '', stock: '', unit: '', description: '', image: '' });
  const [busy, setBusy] = useState(false);
  const customerPrice = useMemo(() => customerPriceFromBase(Number(form.basePrice || 0), DEFAULT_VENDOR_COMMISSION), [form.basePrice]);
  const canSubmit = form.name.trim() && Number(form.basePrice) > 0 && Number(form.stock) >= 0 && form.unit.trim();

  async function onImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const compressed = await compressImage(file);
      const uploaded = await api.uploadFile(compressed);
      setForm((s) => ({ ...s, image: uploaded.url }));
      toast.success('Image compressed & uploaded');
    } catch { toast.error('Image upload failed'); }
    finally { setBusy(false); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) { toast.error('Product name, base price, stock and unit required'); return; }
    setBusy(true);
    try {
      await api.createVendorProduct({ ...form, basePrice: Number(form.basePrice), stock: Number(form.stock), emoji: '🛒', status: 'active' });
      toast.success('Product submitted. Customer price auto-calculated with commission.');
      setForm({ name: '', category: 'Grocery', basePrice: '', stock: '', unit: '', description: '', image: '' });
    } catch { toast.error('Vendor approval required before live upload'); }
    finally { setBusy(false); }
  }

  return (
    <main className="px-4 pb-24">
      <RoleSwitch />
      <section className="glass mt-2 rounded-[2rem] p-5">
        <div className="flex items-center gap-2 text-success"><PackagePlus size={18}/><b>Product upload system</b></div>
        <h1 className="mt-2 text-3xl font-black">Vendor base price dalega, customer ko commission added price dikhega.</h1>
        <div className="mt-4 rounded-2xl bg-white/8 p-3 text-sm font-bold text-slate-300">
          Example: Base ₹100 + {DEFAULT_VENDOR_COMMISSION}% platform commission = Customer price ₹{customerPriceFromBase(100)}.
        </div>
      </section>
      <form onSubmit={submit} className="mt-4 glass rounded-[1.7rem] p-4">
        <h2 className="font-black">Add new product</h2>
        <div className="mt-3 grid gap-3">
          <label className="grid min-h-32 place-items-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/7 p-4 text-center">
            {form.image ? <img src={form.image} alt="Product" className="h-28 w-28 rounded-2xl object-cover"/> : <><ImagePlus className="mx-auto text-rapidLight"/><span className="mt-2 block text-sm font-bold text-slate-300">Upload product image</span><small className="text-slate-500">Auto WebP compression</small></>}
            <input type="file" accept="image/*" onChange={onImage} className="hidden" />
          </label>
          <input className="input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Product name" />
          <div className="grid grid-cols-2 gap-3"><input className="input" value={form.basePrice} onChange={(e)=>setForm({...form,basePrice:e.target.value})} placeholder="Base price ₹" type="number"/><input className="input" value={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})} placeholder="Stock" type="number"/></div>
          <div className="grid grid-cols-2 gap-3"><select className="input" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option>Grocery</option><option>Dairy</option><option>Snacks</option><option>Beverages</option><option>Household</option><option>Clothes</option><option>Beauty</option></select><input className="input" value={form.unit} onChange={(e)=>setForm({...form,unit:e.target.value})} placeholder="Unit e.g. 1 kg" /></div>
          <textarea className="input min-h-20" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Short product description" />
          <div className="rounded-2xl bg-success/10 p-3 text-sm font-black text-success"><Percent size={14} className="inline"/> Customer price preview: {formatMoney(customerPrice || 0)}</div>
          <button disabled={busy || !canSubmit} className="tap rounded-2xl bg-rapid py-3 font-black disabled:opacity-60">{busy ? 'Processing...' : 'Upload Product'}</button>
        </div>
      </form>
      <section className="mt-4 glass rounded-[1.5rem] p-4 text-sm font-bold text-slate-300"><Zap className="mb-2 text-success"/> Backend vendor approval, Cloudinary upload fallback, and commission auto-pricing are connected.</section>
      <section className="mt-4 space-y-3">
        {demoVendorProducts.map((p) => (
          <article key={p.id} className="glass flex items-center gap-3 rounded-[1.5rem] p-3">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-3xl">{p.image}</div>
            <div className="min-w-0 flex-1"><h3 className="font-black">{p.name}</h3><p className="text-xs font-bold text-slate-400">{p.unit} • stock {p.stock}</p><p className="mt-1 text-xs font-black text-success"><Percent size={12} className="inline"/> Customer {formatMoney(p.customerPrice)} • Base {formatMoney(p.basePrice)}</p></div>
            <ToggleRight className="text-success" />
          </article>
        ))}
      </section>
    </main>
  );
}
