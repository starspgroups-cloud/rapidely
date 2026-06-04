import { ShieldCheck } from 'lucide-react';

export default function TrustBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-black text-success">
      <ShieldCheck size={14} /> Trust {score || 'New'}
    </span>
  );
}
