
import { ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function CartButton() {
  const navigate = useNavigate()
  const count = useCartStore((s: any) =>
    s.items.reduce((a: number, b: any) => a + b.quantity, 0)
  )

  return (
    <button
      onClick={() => navigate('/checkout')}
      className="fixed bottom-5 right-5 bg-primary p-4 rounded-full"
    >
      <ShoppingCart />
      <span className="absolute -top-1 -right-1 bg-success text-black px-2 rounded-full text-xs">
        {count}
      </span>
    </button>
  )
}
