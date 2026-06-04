import { AdminStats, DeliveryTask, RiderProfile, VendorOrder, VendorProduct, VendorProfile } from '../types/marketplace';
import { customerPriceFromBase, platformCommission, vendorEarning } from '../utils/commission';

export const demoVendors: VendorProfile[] = [
  { id: 'v1', shopName: 'Nirdosh Kirana Store', ownerName: 'Ramesh Kumar', phone: '+91 98765 43210', address: 'Near Nirdosh Kali Sthan, Munger', category: 'Grocery & Dairy', approvalStatus: 'approved', trustScore: 94, commissionPercent: 15, todayOrders: 18, todayRevenue: 12450, payoutDue: 10840 },
  { id: 'v2', shopName: 'Munger Fresh Mart', ownerName: 'Sanjay Gupta', phone: '+91 98765 12340', address: 'Kasim Bazar, Munger', category: 'Snacks & Beverages', approvalStatus: 'pending', trustScore: 0, commissionPercent: 12, todayOrders: 0, todayRevenue: 0, payoutDue: 0 },
  { id: 'v3', shopName: 'Beauty Hub', ownerName: 'Nisha Kumari', phone: '+91 88765 43210', address: 'Bekapur, Munger', category: 'Beauty & Household', approvalStatus: 'pending', trustScore: 0, commissionPercent: 15, todayOrders: 0, todayRevenue: 0, payoutDue: 0 }
];

export const demoVendorProducts: VendorProduct[] = [
  { id: 'vp1', vendorId: 'v1', name: 'Aashirvaad Atta', category: 'Grocery', unit: '5 kg', basePrice: 240, customerPrice: customerPriceFromBase(240, 15), stock: 32, image: '🌾', active: true },
  { id: 'vp2', vendorId: 'v1', name: 'Amul Milk', category: 'Dairy', unit: '1 L', basePrice: 64, customerPrice: customerPriceFromBase(64, 15), stock: 54, image: '🥛', active: true },
  { id: 'vp3', vendorId: 'v1', name: 'Maggi', category: 'Snacks', unit: 'Pack of 4', basePrice: 56, customerPrice: customerPriceFromBase(56, 15), stock: 80, image: '🍜', active: true },
  { id: 'vp4', vendorId: 'v1', name: 'Surf Excel', category: 'Household', unit: '1 kg', basePrice: 129, customerPrice: customerPriceFromBase(129, 15), stock: 21, image: '🧼', active: true }
];

export const demoVendorOrders: VendorOrder[] = [
  { id: 'o1', ref: 'RDY10291', customerName: 'Amit Raj', customerPhone: '+91 90000 00001', items: [{ name: 'Aashirvaad Atta', qty: 1, customerPrice: customerPriceFromBase(240), basePrice: 240 }, { name: 'Amul Milk', qty: 2, customerPrice: customerPriceFromBase(64), basePrice: 64 }], status: 'new', deliveryType: 'delivery', total: 428, vendorEarning: vendorEarning(240) + vendorEarning(64, 2), platformCommission: platformCommission(240) + platformCommission(64, 2), address: 'Kasim Bazar, Munger', createdAt: 'Just now', eta: '20 min' },
  { id: 'o2', ref: 'RDY10290', customerName: 'Priya Singh', customerPhone: '+91 90000 00002', items: [{ name: 'Maggi', qty: 3, customerPrice: customerPriceFromBase(56), basePrice: 56 }], status: 'accepted', deliveryType: 'delivery', total: 233, vendorEarning: vendorEarning(56, 3), platformCommission: platformCommission(56, 3), address: 'Fort Area, Munger', createdAt: '8 min ago', eta: '12 min' },
  { id: 'o3', ref: 'RDY10289', customerName: 'Rahul Kumar', customerPhone: '+91 90000 00003', items: [{ name: 'Surf Excel', qty: 1, customerPrice: customerPriceFromBase(129), basePrice: 129 }], status: 'ready', deliveryType: 'pickup', total: 149, vendorEarning: 129, platformCommission: 20, address: 'Pickup from store', createdAt: '21 min ago', eta: 'Ready' }
];

export const demoRider: RiderProfile = { id: 'r1', name: 'Rider Partner', phone: '+91 91234 56789', approvalStatus: 'approved', status: 'online', completedToday: 9, earningToday: 270, incentiveToday: 0, rating: 4.8 };

export const demoDeliveryTasks: DeliveryTask[] = [
  { id: 'd1', orderRef: 'RDY10290', pickup: 'Nirdosh Kirana Store, Munger', drop: 'Fort Area, Munger', distanceKm: 2.1, earning: 30, status: 'available', customerPhone: '+91 90000 00002', vendorPhone: '+91 98765 43210' },
  { id: 'd2', orderRef: 'RDY10288', pickup: 'Munger Fresh Mart', drop: 'Bekapur, Munger', distanceKm: 1.4, earning: 30, status: 'available', customerPhone: '+91 90000 00005', vendorPhone: '+91 98765 12340' }
];

export const adminStats: AdminStats = { vendorsPending: 2, ridersPending: 4, liveOrders: 23, commissionToday: 4850, gmVToday: 38200, completedOrders: 124 };
