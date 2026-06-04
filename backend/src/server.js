require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const initSockets = require('./sockets');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || '*', methods: ['GET','POST','PATCH','DELETE'] } });
initSockets(io);
app.set('io', io);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, limit: 240 }));
app.use('/uploads', express.static('tmp_uploads'));

app.get('/', (req, res) => res.json({ ok: true, app: 'RapiDely API', version: '1.0.0' }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/catalog', require('./routes/catalog.routes'));
app.use('/api/order', require('./routes/order.routes'));
app.use('/api/track', require('./routes/track.routes'));
app.use('/api/vendor', require('./routes/vendor.routes'));
app.use('/api/rider', require('./routes/rider.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8787;
connectDB().then(() => server.listen(port, () => console.log(`RapiDely API running on ${port}`))).catch((err) => { console.error(err); process.exit(1); });
