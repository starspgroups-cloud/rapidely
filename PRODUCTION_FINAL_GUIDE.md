# RapiDely Final Production Guide

## What is included

- Customer mobile app UI
- Vendor / Dukandar panel
- Rider / Delivery partner panel
- Super admin panel
- OTP login / registration for all roles
- Product catalog with fallback data
- Vendor product upload with browser-side WebP compression
- Platform commission pricing: vendor base price + 10–15% commission
- Rider earnings: ₹30/order and ₹150 incentive after 12 daily completed deliveries
- Razorpay payment route with demo fallback
- Live GPS tracking fallback page
- Firebase FCM push notification base
- Socket.IO realtime base
- Cloudinary upload route with local fallback
- Logo, favicon, PWA icons, splash configuration
- Android + iOS Capacitor configuration

## Local run

### Frontend

```powershell
npm install --legacy-peer-deps
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Backend

```powershell
cd backend
npm install
npm run seed
npm run dev
```

Backend URL:

```text
http://localhost:8787
```

Health check:

```text
http://localhost:8787
```

Catalog check:

```text
http://localhost:8787/api/catalog
```

## Important environment files

Frontend `.env`:

```env
VITE_API_URL=http://localhost:8787
```

Backend `.env`:

```env
PORT=8787
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/rapidely
JWT_SECRET=change_this_before_production
OTP_BYPASS=123456
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
GOOGLE_MAPS_API_KEY=
PLATFORM_COMMISSION_DEFAULT=15
RIDER_ORDER_EARNING=30
RIDER_DAILY_TARGET=12
RIDER_DAILY_INCENTIVE=150
```

## Demo login numbers after seed

- Admin: `9999999999`
- Vendor: `8888888888`
- Rider: `7777777777`
- OTP bypass: `123456`

## Mobile app build

### Android

```powershell
npm run cap:sync
npx cap add android
npx cap open android
```

In Android Studio:

```text
Build > Generate Signed Bundle / APK > Android App Bundle (.aab)
```

### iOS

Requires macOS + Xcode:

```bash
npm run cap:sync
npx cap add ios
npx cap open ios
```

## Before Play Store upload

You must add these real production items:

1. Real backend hosted URL in frontend `.env`
2. MongoDB Atlas production URI
3. Razorpay live keys
4. Firebase service account keys
5. Cloudinary production keys
6. Privacy Policy URL
7. Terms & Conditions URL
8. Support email / phone
9. Signed Android release keystore
10. Play Store screenshots and store listing

## Build verified

Frontend production build was tested successfully with:

```powershell
npm run build
```

