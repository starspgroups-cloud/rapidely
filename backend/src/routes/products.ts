
import { Hono } from 'hono'

export const products = new Hono()

products.get('/', async (c) => {
  const data = await c.env.DB.prepare(
    'SELECT * FROM products WHERE active = 1'
  ).all()

  return c.json(data.results)
})

products.get('/:id', async (c) => {
  const id = c.req.param('id')

  const product = await c.env.DB.prepare(
    'SELECT * FROM products WHERE id = ?'
  ).bind(id).first()

  return c.json(product)
})

products.post('/', async (c) => {
  const body = await c.req.json()

  await c.env.DB.prepare(`
    INSERT INTO products
    (name, sku, category, price, cost_price, stock_qty)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    body.name,
    body.sku,
    body.category,
    body.price,
    body.cost_price,
    body.stock_qty
  ).run()

  return c.json({ success: true })
})
