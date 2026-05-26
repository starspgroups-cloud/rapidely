# RapiDely Play Store Build Guide

This package is fixed and frontend production build has been tested.

## Fixed in this version
- Removed TypeScript `node10` / Cloudflare type warnings.
- Added visible Login tab in mobile bottom navigation.
- Added complete OTP Login / Registration screen for Customer, Vendor, Rider and Admin.
- Added persistent auth store with localStorage.
- Added API auth calls: `/api/auth/request-otp` and `/api/auth/verify-otp`.
- Added fallback products when backend catalog is empty, so app never shows blank products.
- Fixed seed product image paths.
- Kept official RapiDely logo, favicon and PWA icons.
- Backend seed contains Admin, Vendor, Rider and demo products.

## Local run

Frontend:
```powershell
npm install --legacy-peer-deps
npm run dev
```

Backend:
```powershell
cd backend
npm install
npm run seed
npm run dev
```

Open:
- Frontend: http://localhost:5173
- Backend: http://localhost:8787

## Demo users
- Admin phone: 9999999999
- Vendor phone: 8888888888
- Rider phone: 7777777777
- OTP bypass: 123456

## Android build
```powershell
npm install --legacy-peer-deps
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Then in Android Studio:
- Build > Generate Signed Bundle / APK
- Select Android App Bundle (.aab)
- Create/upload keystore
- Build release bundle

## Important before Play Store upload
Update these production values first:
- `VITE_API_URL` in `.env` to your live backend URL.
- `MONGO_URI` in `backend/.env` to MongoDB Atlas.
- `JWT_SECRET` to a strong secret.
- Razorpay live keys.
- Cloudinary live keys.
- Real OTP SMS provider credentials.
- Firebase FCM credentials.

## Note
This zip is source-code ready and build-tested. Google Play upload needs Android Studio signed `.aab`, which must be generated on your computer because it requires your private keystore.
