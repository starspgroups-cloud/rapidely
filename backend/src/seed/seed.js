require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Rider = require('../models/Rider');
const Product = require('../models/Product');

const products = [
  ['Aashirvaad Atta','Grocery',230,305,'5 kg','🌾','Fresh whole wheat flour for soft rotis.','/products/atta.svg'],
  ['Basmati Rice','Grocery',455,575,'5 kg','🍚','Long-grain aromatic rice for every meal.','/products/rice.svg'],
  ['Toor Dal','Grocery',145,175,'1 kg','🫘','Protein-rich dal for daily Indian cooking.','/products/dal.svg'],
  ['Fortune Oil','Grocery',145,165,'1 L','🛢️','Everyday cooking oil for Indian kitchens.','/products/oil.svg'],
  ['Amul Milk','Dairy',58,62,'1 L','🥛','Fresh toned milk delivered chilled.','/products/milk.svg'],
  ['Fresh Curd','Dairy',42,50,'400 g','🥣','Thick and creamy curd.','/products/curd.svg'],
  ['Fresh Paneer','Dairy',88,110,'200 g','🧀','Soft paneer for curries and snacks.','/products/paneer.svg'],
  ['Maggi Noodles','Snacks',28,30,'70 g','🍜','2-minute masala noodles.','/products/maggi.svg'],
  ['Masala Chips','Snacks',18,20,'75 g','🍟','Crunchy spicy snack.','/products/chips.svg'],
  ['Parle-G Biscuit','Snacks',10,12,'80 g','🍪','Classic glucose biscuit.','/products/biscuits.svg'],
  ['Haldiram Namkeen','Snacks',55,65,'200 g','🥨','Spicy namkeen for snacks and guests.','/products/namkeen.svg'],
  ['Coca-Cola','Beverages',38,40,'750 ml','🥤','Chilled soft drink.','/products/cola.svg'],
  ['Tata Tea','Beverages',135,150,'250 g','☕','Strong tea leaves for kadak chai.','/products/tea.svg'],
  ['Surf Excel','Household',118,130,'1 kg','🧼','Powerful detergent powder.','/products/detergent.svg'],
  ['Floor Cleaner','Household',118,135,'1 L','🧴','Keeps floors clean and fresh.','/products/floor-cleaner.svg'],
  ['Dove Soap','Beauty',52,60,'100 g','🧴','Soft skin bathing bar.','/products/soap.svg'],
  ['Face Wash','Beauty',149,190,'100 ml','🧴','Gentle face wash for daily care.','/products/facewash.svg'],
  ['Moisturizing Cream','Beauty',165,210,'100 g','💄','Daily moisture care for soft skin.','/products/cream.svg'],
  ['Cotton T-Shirt','Clothes',210,299,'1 pc','👕','Comfortable daily wear t-shirt.','/products/tshirt.svg'],
  ['Cotton Socks Pair','Clothes',49,75,'1 pair','🧦','Soft socks for daily wear.','/products/socks.svg']
];
async function seed() {
  await connectDB();
  await Promise.all([User.deleteMany({}), Vendor.deleteMany({}), Rider.deleteMany({}), Product.deleteMany({})]);
  const admin = await User.create({ name:'RapiDely Admin', phone:'9999999999', role:'admin' });
  const vendorUser = await User.create({ name:'Ramesh Kumar', phone:'8888888888', role:'vendor' });
  const riderUser = await User.create({ name:'Amit Rider', phone:'7777777777', role:'rider' });
  const vendor = await Vendor.create({ user: vendorUser._id, shopName:'RapiDely Fresh Store', ownerName:'Ramesh Kumar', phone:vendorUser.phone, category:'Grocery & Dairy', approvalStatus:'approved', commissionPercent:15, trustScore:96, shopOpen:true });
  await Rider.create({ user: riderUser._id, name:'Amit Rider', phone:riderUser.phone, approvalStatus:'approved', online:true, fixedCommission:30, dailyTarget:12, dailyIncentive:150 });
  await Product.insertMany(products.map(([name,category,basePrice,mrp,unit,emoji,description,image]) => ({ vendor:vendor._id, name, category, basePrice, commissionPercent:vendor.commissionPercent, mrp, unit, emoji, description, image, details:description, stock:30, status:'active', rating:4.6, deliveryEta:'15-20 min' })));
  const docs = await Product.find();
  for (const doc of docs) await doc.save();
  console.log('Seed complete. Admin phone 9999999999, Vendor 8888888888, Rider 7777777777. OTP bypass:', process.env.OTP_BYPASS || '123456');
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
