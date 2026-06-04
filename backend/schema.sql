
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  cost_price INTEGER NOT NULL,
  stock_qty INTEGER DEFAULT 0,
  min_qty INTEGER DEFAULT 1,
  max_daily_qty INTEGER DEFAULT 10,
  supplier_name TEXT,
  supplier_phone TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_ref TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  notes TEXT,
  delivery_type TEXT,
  status TEXT DEFAULT 'pending',
  subtotal INTEGER,
  delivery_fee INTEGER,
  total_amount INTEGER,
  payment_link TEXT,
  payment_id TEXT,
  ai_decision TEXT,
  ai_score REAL,
  shipping_partner TEXT,
  tracking_number TEXT,
  shipped_at TEXT,
  delivered_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS purchase_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_name TEXT,
  status TEXT DEFAULT 'draft',
  items_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_summaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  summary_date TEXT,
  total_orders INTEGER,
  total_sales INTEGER,
  ai_insights TEXT,
  low_stock_json TEXT
);
