import ProductSkeleton from './ProductSkeleton';
export default function Loading() {
  return <main className="mx-auto max-w-7xl px-4 py-8"><div className="skeleton h-64 rounded-[2rem]" /><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}</div></main>;
}
