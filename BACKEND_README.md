# RapiDely Full Stack Setup

## Frontend
```powershell
npm install --legacy-peer-deps
npm run dev
```

## Backend
```powershell
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on `http://localhost:8787`.
Frontend `.env.example` already uses:
```env
VITE_API_URL=http://localhost:8787
```

## Demo OTP
Use `123456` unless you change `OTP_BYPASS` in backend `.env`.

## Demo Accounts after seed
- Admin phone: `9999999999`
- Vendor phone: `8888888888`
- Rider phone: `7777777777`

## Added production modules
- Customer catalog + order + OTP + tracking APIs
- Vendor registration, product upload, order accept/decline
- Rider registration, online mode, task accept, delivery earnings
- Admin dashboard, vendor/rider approvals, disputes, transactions
- Commission logic: vendor base price + 10–15% platform commission
- Rider earning logic: ₹30/order + ₹150 incentive after 12 completed orders/day
- Razorpay create/verify payment routes
- Socket.IO realtime base for order/rider location
- Cloudinary upload route
- Firebase FCM token storage route
- Official RapiDely logo, favicon, PWA icons and manifest

## Important production notes
Add real credentials before launch:
- MongoDB Atlas URL
- JWT secret
- Razorpay key/secret
- Cloudinary keys
- Firebase Admin credentials
- Google Maps keys in mobile app when native maps are integrated
