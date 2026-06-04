
import { Hono } from 'hono'

export const admin = new Hono()

admin.post('/login', async (c) => {
  const body = await c.req.json()

  if (
    body.email !== c.env.ADMIN_EMAIL ||
    body.api_key !== c.env.ADMIN_API_KEY
  ) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = crypto.randomUUID()

  await c.env.STORE_KV.put(
    `session:${token}`,
    body.email,
    { expirationTtl: 86400 }
  )

  return c.json({
    success: true,
    token
  })
})

admin.post('/accept/:ref', async (c) => {
  const ref = c.req.param('ref')

  const order = await c.env.DB.prepare(
    'SELECT * FROM orders WHERE order_ref = ?'
  ).bind(ref).first()

  const auth = btoa(
    `${c.env.RAZORPAY_KEY_ID}:${c.env.RAZORPAY_KEY_SECRET}`
  )

  const response = await fetch(
    'https://api.razorpay.com/v1/payment_links',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: order.total_amount * 100,
        currency: 'INR',
        expire_by: Math.floor(Date.now() / 1000) + 3600,
        description: `Payment for ${ref}`
      })
    }
  )

  const payment = await response.json()

  await c.env.DB.prepare(`
    UPDATE orders
    SET status = 'accepted',
        payment_link = ?
    WHERE order_ref = ?
  `).bind(payment.short_url, ref).run()

  return c.json({
    success: true,
    payment_link: payment.short_url
  })
})

admin.post('/ship/:ref', async (c) => {
  const ref = c.req.param('ref')

  await c.env.DB.prepare(`
    UPDATE orders
    SET status = 'shipped',
        shipped_at = CURRENT_TIMESTAMP
    WHERE order_ref = ?
  `).bind(ref).run()

  return c.json({ success: true })
})
