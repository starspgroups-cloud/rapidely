
import { Hono } from 'hono'
import { generateOTP, orderRef } from '../lib/utils'
import { otpTemplate, sendEmail } from '../lib/email'

export const orders = new Hono()

orders.post('/', async (c) => {
  const body = await c.req.json()

  const ref = orderRef()
  const otp = generateOTP()

  let subtotal = 0

  for (const item of body.items) {
    const product = await c.env.DB.prepare(
      'SELECT * FROM products WHERE id = ?'
    ).bind(item.product_id).first()

    if (!product) {
      return c.json({ error: 'Product missing' }, 400)
    }

    if (product.stock_qty < item.quantity) {
      return c.json({ error: 'Insufficient stock' }, 400)
    }

    subtotal += product.price * item.quantity
  }

  const deliveryFee = body.delivery_type === 'delivery' ? 40 : 0
  const total = subtotal + deliveryFee

  const order = await c.env.DB.prepare(`
    INSERT INTO orders
    (
      order_ref,
      customer_name,
      customer_email,
      customer_phone,
      notes,
      delivery_type,
      subtotal,
      delivery_fee,
      total_amount
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    ref,
    body.customer_name,
    body.customer_email,
    body.customer_phone,
    body.notes,
    body.delivery_type,
    subtotal,
    deliveryFee,
    total
  ).run()

  const orderId = order.meta.last_row_id

  for (const item of body.items) {
    const product = await c.env.DB.prepare(
      'SELECT * FROM products WHERE id = ?'
    ).bind(item.product_id).first()

    await c.env.DB.prepare(`
      INSERT INTO order_items
      (order_id, product_id, quantity, unit_price)
      VALUES (?, ?, ?, ?)
    `).bind(
      orderId,
      item.product_id,
      item.quantity,
      product.price
    ).run()
  }

  await c.env.STORE_KV.put(
    `otp:${ref}`,
    JSON.stringify({
      otp,
      attempts: 0,
      resend_count: 0
    }),
    { expirationTtl: 600 }
  )

  await sendEmail(
    c.env,
    body.customer_email,
    'Verify your RapiDely order',
    otpTemplate(otp)
  )

  return c.json({
    success: true,
    order_ref: ref
  })
})

orders.post('/verify', async (c) => {
  const body = await c.req.json()

  const data = await c.env.STORE_KV.get(`otp:${body.order_ref}`)

  if (!data) {
    return c.json({ error: 'OTP expired' }, 400)
  }

  const parsed = JSON.parse(data)

  if (parsed.attempts >= 5) {
    return c.json({ error: 'Too many attempts' }, 429)
  }

  if (parsed.otp !== body.otp) {
    parsed.attempts += 1

    await c.env.STORE_KV.put(
      `otp:${body.order_ref}`,
      JSON.stringify(parsed),
      { expirationTtl: 600 }
    )

    return c.json({ error: 'Invalid OTP' }, 400)
  }

  await c.env.DB.prepare(`
    UPDATE orders SET status = 'verified'
    WHERE order_ref = ?
  `).bind(body.order_ref).run()

  return c.json({ success: true })
})

orders.get('/track/:ref', async (c) => {
  const ref = c.req.param('ref')

  const order = await c.env.DB.prepare(
    'SELECT * FROM orders WHERE order_ref = ?'
  ).bind(ref).first()

  return c.json(order)
})
