
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { products } from './routes/products'
import { orders } from './routes/orders'
import { admin } from './routes/admin'
import { payments } from './routes/payments'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => c.json({ success: true, app: 'RapiDely API' }))

app.route('/api/products', products)
app.route('/api/orders', orders)
app.route('/api/admin', admin)
app.route('/api/payments', payments)

export default app
