# RapiDely Mobile Marketplace App

Android + iOS ready React + TypeScript + Vite + Capacitor frontend for a hyperlocal multi-vendor quick-commerce model.

## Roles included

### Customer
- Catalog, categories, cart, checkout, OTP, order tracking

### Vendor / Dukandar
- Separate vendor dashboard
- Direct orders to vendor
- Accept / decline orders
- Product upload section
- Base price entry
- Customer price auto-calculated after platform commission
- Earnings and payout view

### Delivery Boy / Rider
- Separate rider panel
- Accept / decline delivery jobs
- Fixed ₹30 per completed order
- Daily incentive: ₹150 after 12 completed orders
- Pickup/drop information designed to avoid map precision confusion

### Super Admin
- Vendor approval
- Rider approval
- Commission overview
- Platform commission tracking
- Approval-only control model

## Commission logic

Vendor enters base price.

```txt
Customer price = Base price + Platform commission
Commission range = 10% to 15%
Default = 15%
```

Example:

```txt
Vendor base price: ₹100
Platform commission 15%: ₹15
Customer price shown: ₹115
Vendor earning: ₹100
Platform earning: ₹15
```

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build
```

## Android

```bash
npm run cap:add:android
npm run android
```

## iOS

```bash
npm run cap:add:ios
npm run ios
```

## PowerShell cleanup commands

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

## Production backend endpoints to connect next

```txt
POST /api/auth/otp/send
POST /api/auth/otp/verify
GET  /api/catalog
GET  /api/catalog/:id
POST /api/order
POST /api/order/verify
GET  /api/track/:order_ref
POST /api/vendor/register
GET  /api/vendor/orders
POST /api/vendor/orders/:id/accept
POST /api/vendor/orders/:id/decline
POST /api/vendor/products
GET  /api/vendor/earnings
POST /api/rider/register
GET  /api/rider/jobs
POST /api/rider/jobs/:id/accept
POST /api/rider/jobs/:id/decline
GET  /api/rider/earnings
GET  /api/admin/approvals
POST /api/admin/vendors/:id/approve
POST /api/admin/riders/:id/approve
POST /api/admin/commission-rules
```

## Full Stack Add-ons
Backend APIs are included inside `/backend`. See `BACKEND_README.md`.
The official RapiDely logo has been added to `src/assets/rapidely-logo.png`, `public/rapidely-logo.png`, favicon, PWA icons and manifest.
