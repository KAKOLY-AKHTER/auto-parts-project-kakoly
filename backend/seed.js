const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const PRODUCTS = [
  {
    name: 'Michelin Defender T+H',
    cat: 'Tires', catLabel: 'All-Season Tires',
    price: 142.00, oldPrice: 179.00,
    img: '/tire-1.png',
    rating: 4.9, reviews: 312,
    tag: 'Best Seller', badge: 'Most Popular',
    isFeatured: true,
    desc: 'The Michelin Defender T+H delivers exceptional tread life with up to 80,000 miles of confident, all-season driving. Engineered with IntelliSipe technology for grip in wet and dry conditions.',
    features: [
      'Up to 80,000-mile tread life warranty',
      'IntelliSipe technology for wet/dry grip',
      'All-season traction including light snow',
      'MaxTouch Construction for even wear',
      'ComfortControl Technology reduces road noise',
    ],
    specs: { Width:'225 mm', Profile:'60', Rim:'16"', 'Load Index':'98', 'Speed Rating':'H', Season:'All-Season', Brand:'Michelin' },
    compat: ['Toyota Camry 2015–2024','Honda Accord 2014–2024','Nissan Altima 2013–2024','Hyundai Sonata 2015–2024'],
    brand: 'Michelin',
  },
  {
    name: 'Full Synthetic 5W-30 Oil',
    cat: 'Motor Oil', catLabel: 'Motor Oil',
    price: 38.99, oldPrice: 52.00,
    img: '/oil-4.png',
    rating: 4.8, reviews: 245,
    tag: 'Top Rated', badge: 'Top Rated',
    isFeatured: true,
    desc: 'Premium full-synthetic 5W-30 motor oil formulated for modern engines. Provides superior protection against wear, heat, and deposits.',
    features: [
      'Full synthetic formula for max protection',
      'Excellent low-temperature start-up performance',
      'Resists breakdown under high heat',
      'Reduces engine deposits & sludge',
      'Extended drain intervals up to 10,000 miles',
    ],
    specs: { Viscosity:'5W-30', Volume:'5 Quarts', Type:'Full Synthetic', 'API Rating':'SP', ILSAC:'GF-6A', Brand:'Valvoline' },
    compat: ['Most 4-cylinder & V6 gasoline engines','Turbocharged engines','GDI (direct injection) engines','High-mileage vehicles'],
    brand: 'Valvoline',
  },
  {
    name: 'Cooper Adventurer A/T',
    cat: 'Tires', catLabel: 'All-Terrain Tires',
    price: 128.00, oldPrice: 165.00,
    img: '/tire-2.png',
    rating: 4.7, reviews: 189,
    tag: null, badge: null,
    desc: 'Built for drivers who need versatility on and off the road. Aggressive tread pattern delivers confident performance on mud, gravel, and highway alike.',
    features: [
      'Aggressive A/T tread pattern',
      'Reinforced sidewalls for off-road durability',
      'Stone ejectors to prevent punctures',
      'All-season & light snow capability',
      'Long-lasting compound',
    ],
    specs: { Width:'265 mm', Profile:'70', Rim:'17"', 'Load Index':'115T', 'Speed Rating':'T', Season:'All-Terrain', Brand:'Cooper' },
    compat: ['Ford F-150 2014–2024','Chevrolet Silverado','Toyota Tacoma','Jeep Wrangler','RAM 1500'],
    brand: 'Cooper',
  },
  {
    name: 'Premium Oil Filter Kit',
    cat: 'Filters', catLabel: 'Oil Filter',
    price: 24.99, oldPrice: 35.00,
    img: '/oil-1.png',
    rating: 4.8, reviews: 421,
    tag: 'Popular', badge: 'Best Value',
    isFeatured: true,
    desc: 'Professional-grade oil filter kit with everything needed for a complete oil change. Includes high-capacity filter with anti-drainback valve.',
    features: [
      'High-capacity synthetic media',
      'Anti-drain-back valve prevents dry starts',
      'Burst-resistant construction',
      'Includes drain plug gasket',
      'Fits most popular import & domestic vehicles',
    ],
    specs: { Thread:'M20 x 1.5', Height:'3.5"', Diameter:'2.9"', Micron:'25 micron', Material:'Synthetic media', Brand:'Fram' },
    compat: ['Honda Civic/Accord','Toyota Corolla/Camry','Nissan Sentra/Altima','Mazda 3/6','Subaru Impreza/Legacy'],
    brand: 'Fram',
  },
  {
    name: 'Goodyear Assurance MaxLife',
    cat: 'Tires', catLabel: 'Touring Tires',
    price: 156.00, oldPrice: 195.00,
    img: '/tire-3.png',
    rating: 4.8, reviews: 278,
    tag: 'Sale', badge: 'Sale',
    desc: 'Exceptional tread life combined with all-season capability. Ideal for commuters who want a quiet, comfortable ride and reliable long-distance performance.',
    features: [
      'Tread life up to 85,000 miles',
      'All-season performance',
      'WetTraction Compound improves wet stopping',
      'Lateral notches for snow traction',
      'Quiet, comfortable highway ride',
    ],
    specs: { Width:'235 mm', Profile:'55', Rim:'17"', 'Load Index':'99', 'Speed Rating':'V', Season:'All-Season', Brand:'Goodyear' },
    compat: ['Honda CR-V / Pilot','Toyota RAV4 / Highlander','Chevrolet Equinox','Ford Escape','Hyundai Tucson'],
    brand: 'Goodyear',
  },
  {
    name: 'Castrol EDGE 10W-40 Synth',
    cat: 'Motor Oil', catLabel: 'Motor Oil',
    price: 44.99, oldPrice: 58.00,
    img: '/motor.png',
    rating: 4.9, reviews: 167,
    tag: 'Top Rated', badge: 'Pro Pick',
    desc: 'Castrol EDGE with Fluid TITANIUM Technology continuously adapts to the demands of your engine. Engineered for high-performance vehicles.',
    features: [
      'Fluid TITANIUM Technology',
      '3× stronger against viscosity breakdown',
      'Maximum performance under high load',
      'Ideal for older/high-mileage engines',
      'Meets or exceeds OEM specifications',
    ],
    specs: { Viscosity:'10W-40', Volume:'5 Quarts', Type:'Full Synthetic', 'API Rating':'SN Plus', ACEA:'A3/B4', Brand:'Castrol' },
    compat: ['BMW','Mercedes-Benz','Volkswagen','Audi','High-performance & European vehicles'],
    brand: 'Castrol',
  },
  {
    name: 'Performance Brake Pad Set',
    cat: 'Brake Parts', catLabel: 'Brake System',
    price: 65.00, oldPrice: 89.00,
    img: '/tire11.png',
    rating: 4.7, reviews: 134,
    tag: null, badge: null,
    desc: 'Semi-metallic brake pads engineered for excellent stopping power and durability. Chamfered and slotted to reduce noise while dissipating heat.',
    features: [
      'Semi-metallic compound for superior stopping',
      'Low dust, low noise formula',
      'Hardware kit included',
      'Chamfered edges reduce brake noise',
      'Thermal scorching for immediate use',
    ],
    specs: { Position:'Front', Material:'Semi-Metallic', 'Noise Level':'Low', Includes:'Hardware kit', Thickness:'14 mm', Brand:'Bosch' },
    compat: ['Toyota Camry / Corolla','Honda Civic / Accord','Nissan Altima / Sentra','Mazda 3 / 6','Subaru Impreza'],
    brand: 'Bosch',
  },
  {
    name: 'High-Flow Air Filter',
    cat: 'Engine Parts', catLabel: 'Engine Parts',
    price: 29.99, oldPrice: 42.00,
    img: '/oil-2.png',
    rating: 4.6, reviews: 198,
    tag: 'Sale', badge: 'Sale',
    desc: 'Drop-in replacement high-flow air filter made from oil-free dry media. Increases airflow for improved throttle response and fuel efficiency.',
    features: [
      'Up to 15% more airflow than paper filters',
      'Washable & reusable — lasts 50,000+ miles',
      'Precision-fit for easy installation',
      'Improves throttle response',
      'No oil required — dry media design',
    ],
    specs: { Type:'Drop-in replacement', Media:'Dry synthetic', Washable:'Yes', 'Flow Rate':'+15% vs OEM', 'Service Life':'50,000 mi', Brand:'K&N' },
    compat: ['Honda Civic 2012–2024','Toyota Corolla 2014–2024','Mazda 3 2014–2024','Subaru Impreza 2012–2024','Ford Focus 2012–2023'],
    brand: 'K&N',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4, serverSelectionTimeoutMS: 15000 });
  console.log('Connected to MongoDB');
  await Product.deleteMany({});
  console.log('Cleared existing products');
  const inserted = await Product.insertMany(PRODUCTS);
  console.log(`✓ Inserted ${inserted.length} products`);
  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(e => { console.error('Seed failed:', e.message); process.exit(1); });
