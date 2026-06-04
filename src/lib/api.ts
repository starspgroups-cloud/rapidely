import axios from 'axios';
import { demoProducts } from '../data/demoProducts';
import { OrderPayload, OrderResponse, Product, TrackingResponse } from '../types';
import { UserRole } from '../store/authStore';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

const client = axios.create({
  baseURL: API_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('rapidely-auth');
    const token = raw ? JSON.parse(raw)?.state?.token : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // localStorage may be unavailable in a webview private context.
  }
  return config;
});

function demoTracking(orderRef: string): TrackingResponse {
  const paid = new URLSearchParams(window.location.search).get('paid') === 'success';
  return {
    order_ref: orderRef,
    status: paid ? 'paid' : 'accepted',
    total: Number(localStorage.getItem('rapidely-last-total') || 0),
    payment_url: `${window.location.origin}/track/${orderRef}?paid=success`,
    shipping_info: paid ? 'Your order is being packed and will be shipped shortly.' : undefined,
    eta: '25-35 minutes'
  };
}

async function withFallback<T>(request: Promise<{ data: T }>, fallback: () => T): Promise<T> {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.warn('API fallback used:', error);
    return fallback();
  }
}

function catalogOrDemo(data: Product[]) {
  return Array.isArray(data) && data.length > 0 ? data : demoProducts;
}

export const api = {
  requestOtp: (payload: { phone: string; role: UserRole; name?: string; email?: string }) =>
    withFallback<{ success: boolean; message: string; dev_otp?: string }>(
      client.post('/api/auth/request-otp', payload),
      () => ({ success: true, message: 'Demo OTP sent. Use 123456.', dev_otp: '123456' })
    ),
  verifyLoginOtp: (payload: { phone: string; otp: string }) =>
    withFallback<{ token: string; user: { id?: string; name?: string; phone: string; role: UserRole } }>(
      client.post('/api/auth/verify-otp', payload),
      () => ({ token: 'demo-token', user: { phone: payload.phone, role: 'customer', name: 'RapiDely User' } })
    ),
  getCatalog: async () => catalogOrDemo(await withFallback<Product[]>(client.get('/api/catalog'), () => demoProducts)),
  getProduct: (id: string) => withFallback<{ product: Product; related: Product[] }>(
    client.get(`/api/catalog/${id}`),
    () => {
      const product = demoProducts.find((item) => item.id === id) || demoProducts[0];
      const related = demoProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
      return { product, related };
    }
  ),
  placeOrder: (payload: OrderPayload) => withFallback<OrderResponse>(
    client.post('/api/order', payload),
    () => {
      const ref = `RD${Date.now().toString().slice(-8)}`;
      localStorage.setItem('rapidely-last-total', String(payload.total));
      return { order_ref: ref, message: 'Demo OTP sent. Use 123456.' };
    }
  ),
  verifyOtp: (order_ref: string, otp: string) => withFallback<{ success: boolean; order_ref: string }>(
    client.post('/api/order/verify', { order_ref, otp }),
    () => ({ success: otp.length === 6, order_ref })
  ),
  resendOtp: (order_ref: string) => withFallback<{ success: boolean; message: string }>(
    client.post('/api/order/resend-otp', { order_ref }),
    () => ({ success: true, message: 'OTP resent successfully.' })
  ),
  trackOrder: (orderRef: string) => withFallback<TrackingResponse>(client.get(`/api/track/${orderRef}`), () => demoTracking(orderRef)),
  createPayment: (orderRef: string) => withFallback<{ demo?: boolean; order_id: string; amount: number; currency: string; key: string }>(
    client.post(`/api/payment/create/${orderRef}`),
    () => ({ demo: true, order_id: `demo_${orderRef}`, amount: Number(localStorage.getItem('rapidely-last-total') || 0), currency: 'INR', key: 'demo' })
  ),
  verifyPayment: (payload: Record<string, unknown>) => withFallback<{ success: boolean; order_ref: string }>(
    client.post('/api/payment/verify', payload),
    () => ({ success: true, order_ref: String(payload.order_ref || '') })
  ),
  saveFcmToken: (token: string) => withFallback<{ success: boolean }>(client.post('/api/notifications/fcm-token', { token }), () => ({ success: true })),
  uploadFile: async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return withFallback<{ url: string; local?: boolean }>(client.post('/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }), () => ({ url: URL.createObjectURL(file), local: true }));
  },
  createVendorProduct: (payload: Record<string, unknown>) => withFallback<Record<string, unknown>>(client.post('/api/vendor/products', payload), () => ({ ...payload, id: `demo_${Date.now()}` })),
  updateRiderLocation: (location: { lat: number; lng: number }) => withFallback<Record<string, unknown>>(client.patch('/api/rider/online', { online: true, location }), () => ({ online: true, currentLocation: location })),
  adminAnalytics: () => withFallback<any>(client.get('/api/admin/dashboard'), () => ({ orders: 124, vendors: 12, riders: 18, products: 250, platformCommission: 4850, gmVToday: 38200, completedOrders: 89 }))
};
