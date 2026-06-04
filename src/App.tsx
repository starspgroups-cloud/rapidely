import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from './components/Loading';
import AppShell from './components/AppShell';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OTPVerification = lazy(() => import('./pages/OTPVerification'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Categories = lazy(() => import('./pages/Categories'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const Login = lazy(() => import('./pages/Login'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Support = lazy(() => import('./pages/Support'));
const Payment = lazy(() => import('./pages/Payment'));
const LiveTracking = lazy(() => import('./pages/LiveTracking'));
const Notifications = lazy(() => import('./pages/Notifications'));
const VendorDashboard = lazy(() => import('./pages/vendor/VendorDashboard'));
const VendorRegister = lazy(() => import('./pages/vendor/VendorRegister'));
const VendorSettings = lazy(() => import('./pages/vendor/VendorSettings'));
const VendorOrders = lazy(() => import('./pages/vendor/VendorOrders'));
const VendorProducts = lazy(() => import('./pages/vendor/VendorProducts'));
const VendorEarnings = lazy(() => import('./pages/vendor/VendorEarnings'));
const RiderDashboard = lazy(() => import('./pages/rider/RiderDashboard'));
const RiderRegister = lazy(() => import('./pages/rider/RiderRegister'));
const RiderEarnings = lazy(() => import('./pages/rider/RiderEarnings'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Approvals = lazy(() => import('./pages/admin/Approvals'));
const CommissionRules = lazy(() => import('./pages/admin/CommissionRules'));
const Disputes = lazy(() => import('./pages/admin/Disputes'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));

function Page({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>{children}</motion.div>;
}

export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<Loading />}> 
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/categories" element={<Page><Categories /></Page>} />
            <Route path="/profile" element={<Page><Profile /></Page>} />
            <Route path="/orders" element={<Page><Orders /></Page>} />
            <Route path="/login" element={<Page><Login /></Page>} />
            <Route path="/wallet" element={<Page><Wallet /></Page>} />
            <Route path="/support" element={<Page><Support /></Page>} />
            <Route path="/notifications" element={<Page><Notifications /></Page>} />
            <Route path="/product/:id" element={<Page><ProductDetail /></Page>} />
            <Route path="/checkout" element={<Page><Checkout /></Page>} />
            <Route path="/verify/:orderRef" element={<Page><OTPVerification /></Page>} />
            <Route path="/track/:orderRef" element={<Page><OrderTracking /></Page>} />
            <Route path="/payment/:orderRef" element={<Page><Payment /></Page>} />
            <Route path="/live/:orderRef" element={<Page><LiveTracking /></Page>} />
            <Route path="/vendor" element={<Page><VendorDashboard /></Page>} />
            <Route path="/vendor/register" element={<Page><VendorRegister /></Page>} />
            <Route path="/vendor/settings" element={<Page><VendorSettings /></Page>} />
            <Route path="/vendor/orders" element={<Page><VendorOrders /></Page>} />
            <Route path="/vendor/products" element={<Page><VendorProducts /></Page>} />
            <Route path="/vendor/earnings" element={<Page><VendorEarnings /></Page>} />
            <Route path="/rider" element={<Page><RiderDashboard /></Page>} />
            <Route path="/rider/register" element={<Page><RiderRegister /></Page>} />
            <Route path="/rider/earnings" element={<Page><RiderEarnings /></Page>} />
            <Route path="/admin" element={<Page><AdminDashboard /></Page>} />
            <Route path="/admin/approvals" element={<Page><Approvals /></Page>} />
            <Route path="/admin/commission" element={<Page><CommissionRules /></Page>} />
            <Route path="/admin/disputes" element={<Page><Disputes /></Page>} />
            <Route path="/admin/analytics" element={<Page><Analytics /></Page>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AppShell>
  );
}
