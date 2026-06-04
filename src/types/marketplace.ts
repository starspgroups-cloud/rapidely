export type UserRole = 'customer' | 'vendor' | 'rider' | 'admin';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'blocked';
export type VendorOrderStatus = 'new' | 'accepted' | 'declined' | 'ready' | 'picked' | 'delivered';
export type RiderStatus = 'offline' | 'online' | 'busy';

export interface VendorProfile {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  address: string;
  category: string;
  approvalStatus: ApprovalStatus;
  trustScore: number;
  commissionPercent: number;
  todayOrders: number;
  todayRevenue: number;
  payoutDue: number;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  customerPrice: number;
  stock: number;
  image: string;
  active: boolean;
}

export interface VendorOrder {
  id: string;
  ref: string;
  customerName: string;
  customerPhone: string;
  items: Array<{ name: string; qty: number; customerPrice: number; basePrice: number }>;
  status: VendorOrderStatus;
  deliveryType: 'delivery' | 'pickup';
  total: number;
  vendorEarning: number;
  platformCommission: number;
  address: string;
  createdAt: string;
  eta: string;
}

export interface RiderProfile {
  id: string;
  name: string;
  phone: string;
  approvalStatus: ApprovalStatus;
  status: RiderStatus;
  completedToday: number;
  earningToday: number;
  incentiveToday: number;
  rating: number;
}

export interface DeliveryTask {
  id: string;
  orderRef: string;
  pickup: string;
  drop: string;
  distanceKm: number;
  earning: number;
  status: 'available' | 'accepted' | 'picked' | 'delivered';
  customerPhone: string;
  vendorPhone: string;
}

export interface AdminStats {
  vendorsPending: number;
  ridersPending: number;
  liveOrders: number;
  commissionToday: number;
  gmVToday: number;
  completedOrders: number;
}
