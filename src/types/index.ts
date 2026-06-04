export type Language = 'en' | 'hi';
export type Category = 'Grocery' | 'Dairy' | 'Snacks' | 'Beverages' | 'Household' | 'Clothes' | 'Beauty';

export interface Product {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  category: Category;
  emoji: string;
  image: string;
  description: string;
  details?: string;
  unit?: string;
  stock?: number;
  rating?: number;
  deliveryEta?: string;
  tags?: string[];
}
export interface CartItem extends Product { quantity: number; }
export type FulfillmentType = 'delivery' | 'pickup';
export interface CustomerForm { name: string; email: string; phone: string; notes: string; address?: string; coupon?: string; }
export interface OrderPayload {
  items: Array<{ product_id: string; quantity: number; price: number }>;
  delivery_type: FulfillmentType;
  customer: CustomerForm;
  subtotal: number;
  delivery_charge: number;
  discount?: number;
  total: number;
}
export interface OrderResponse { order_ref: string; message?: string; }
export type OrderStatus = 'verified' | 'accepted' | 'paid' | 'shipped' | 'delivered';
export interface TrackingResponse {
  order_ref: string;
  status: OrderStatus;
  customer_name?: string;
  total?: number;
  payment_url?: string;
  shipping_info?: string;
  eta?: string;
  updated_at?: string;
  rider_name?: string;
  rider_phone?: string;
}
