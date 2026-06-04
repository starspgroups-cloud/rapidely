
import { Hono } from 'hono'

export const payments = new Hono()

payments.post('/webhook', async (c) => {
  const body = await c.req.text()

  const signature = c.req.header('x-razorpay-signature')

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(c.env.RAZORPAY_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const digest = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(body)
  )

  const generated = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  if (generated !== signature) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const payload = JSON.parse(body)

  const paymentId = payload.payload.payment.entity.id
  const orderRef = payload.payload.payment.entity.description.replace(
    'Payment for ',
    ''
  )

  await c.env.DB.prepare(`
    UPDATE orders
    SET status = 'paid',
        payment_id = ?
    WHERE order_ref = ?
  `).bind(paymentId, orderRef).run()

  return c.json({ success: true })
})
