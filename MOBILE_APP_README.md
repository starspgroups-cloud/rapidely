# RapiDely Mobile App Build Guide

This project is now structured for a mobile-first Android + iOS app using React + TypeScript + Vite and Capacitor.

## Run web preview

```bash
npm install
npm run dev
```

## Production web build

```bash
npm run build
```

## Android app

```bash
npm install
npm run cap:add:android
npm run android
```

Then Android Studio opens. Build APK/AAB from Android Studio.

## iOS app

Run on macOS with Xcode installed:

```bash
npm install
npm run cap:add:ios
npm run ios
```

Then Xcode opens. Configure Signing & Capabilities, then build for simulator/device/App Store.

## API config

Create `.env`:

```env
VITE_API_URL=https://your-backend-url.com
```

During local development you can use:

```env
VITE_API_URL=http://localhost:5000
```

## Mobile app features included

- Mobile app shell with safe-area support for Android and iOS notches
- Bottom tab navigation
- Sticky native-style top bar
- HashRouter for Capacitor compatibility
- PWA manifest and service worker
- Haptic/vibration feedback fallback
- Glassmorphism dark quick-commerce UI
- Cart drawer, checkout, OTP verification and order tracking
- Confetti on payment success callback

## Backend endpoints expected

- `GET /api/catalog`
- `GET /api/catalog/:id`
- `POST /api/order`
- `POST /api/order/verify`
- `POST /api/order/resend-otp`
- `GET /api/track/:order_ref`
