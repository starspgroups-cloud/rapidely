import { Language } from '../types';

type Key =
  | 'home' | 'checkout' | 'heroTitle' | 'heroSub' | 'quickPromise' | 'searchPlaceholder' | 'all'
  | 'related' | 'cart' | 'delivery' | 'pickup' | 'placeOrder' | 'tracking' | 'payNow'
  | 'shippedInfo' | 'emptyCart' | 'shopNow' | 'location' | 'offers' | 'orderSummary'
  | 'customerDetails' | 'address' | 'coupon' | 'verified' | 'accepted' | 'paid' | 'shipped' | 'delivered';

const dict: Record<Language, Record<Key, string>> = {
  en: {
    home: 'Home', checkout: 'Checkout', heroTitle: 'Daily essentials delivered fast.', heroSub: 'Kiryana, dairy, snacks, household, clothes and beauty products near you.', quickPromise: 'Order Now, Get Now | Everything You Choose.', searchPlaceholder: 'Search grocery, dairy, snacks...', all: 'All', related: 'Related products', cart: 'Cart', delivery: 'Delivery', pickup: 'Self pickup', placeOrder: 'Place order', tracking: 'Order tracking', payNow: 'Pay now', shippedInfo: 'Shipping information', emptyCart: 'Your cart is empty', shopNow: 'Shop now', location: 'Near Nirdosh Kali Sthan, Munger', offers: 'Today\'s offers', orderSummary: 'Order summary', customerDetails: 'Customer details', address: 'Delivery address', coupon: 'Coupon code', verified: 'Verified', accepted: 'Accepted', paid: 'Paid', shipped: 'Shipped', delivered: 'Delivered'
  },
  hi: {
    home: 'होम', checkout: 'चेकआउट', heroTitle: 'रोज़मर्रा का सामान तुरंत घर पर.', heroSub: 'किराना, डेयरी, स्नैक्स, घरेलू, कपड़े और ब्यूटी प्रोडक्ट्स आपके नज़दीक.', quickPromise: 'Order Now, Get Now | Everything You Choose.', searchPlaceholder: 'किराना, दूध, स्नैक्स खोजें...', all: 'सभी', related: 'मिलते-जुलते प्रोडक्ट', cart: 'कार्ट', delivery: 'डिलीवरी', pickup: 'सेल्फ पिकअप', placeOrder: 'ऑर्डर करें', tracking: 'ऑर्डर ट्रैकिंग', payNow: 'पेमेंट करें', shippedInfo: 'शिपिंग जानकारी', emptyCart: 'आपका कार्ट खाली है', shopNow: 'शॉप करें', location: 'निर्दोष काली स्थान के पास, मुंगेर', offers: 'आज के ऑफर', orderSummary: 'ऑर्डर सारांश', customerDetails: 'ग्राहक जानकारी', address: 'डिलीवरी पता', coupon: 'कूपन कोड', verified: 'वेरिफाइड', accepted: 'एक्सेप्टेड', paid: 'पेड', shipped: 'शिप्ड', delivered: 'डिलीवर्ड'
  }
};
export const t = (language: Language, key: Key) => dict[language][key] || dict.en[key];
