
# RapiDely Cloudflare Worker Backend

## Setup

```bash
npm install
```

## Create D1 Database

```bash
wrangler d1 create rapidely-db
```

## Apply Schema

```bash
wrangler d1 execute rapidely-db --file=schema.sql
```

## Seed Database

```bash
wrangler d1 execute rapidely-db --file=seed.sql
```

## Create KV

```bash
wrangler kv namespace create STORE_KV
```

## Secrets

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put RAZORPAY_KEY_ID
wrangler secret put RAZORPAY_KEY_SECRET
wrangler secret put RAZORPAY_WEBHOOK_SECRET
wrangler secret put ADMIN_EMAIL
wrangler secret put ADMIN_API_KEY
```

## Run

```bash
npm run dev
```

## Deploy

```bash
npm run deploy
```
