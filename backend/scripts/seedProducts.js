// Run once: node scripts/seedProducts.js
// Adds 28 realistic products to MongoDB (skips if already 15+ products exist)

require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('../models/Product');

const PRODUCTS = [
  // ── TIRES ──
  {
    name: "Michelin Defender T+H All-Season",
    brand: "Michelin", cat: "tire", catLabel: "All-Season Tires",
    price: 142.00, oldPrice: 179.00, stock: 45, isFeatured: true,
    tag: "Best Seller", badge: "Most Popular",
    img: "/tire-1.png", rating: 4.9, reviews: 312,
    desc: "The Michelin Defender T+H delivers exceptional tread life with up to 80,000 miles of confident, all-season driving. Engineered with IntelliSipe technology for grip in wet and dry conditions.",
    features: ["Up to 80,000-mile tread life warranty","IntelliSipe technology for wet/dry grip","All-season traction including light snow","MaxTouch Construction for even wear"],
    specs: { Width:"225 mm", Profile:"60", Rim:'16"', Season:"All-Season", Brand:"Michelin" },
    compat: ["Toyota Camry 2015–2024","Honda Accord 2014–2024","Nissan Altima 2013–2024"],
  },
  {
    name: "Goodyear Assurance MaxLife",
    brand: "Goodyear", cat: "tire", catLabel: "Touring Tires",
    price: 156.00, oldPrice: 198.00, stock: 30, isFeatured: true,
    tag: "Sale", badge: "Top Pick",
    img: "/tire-2.png", rating: 4.8, reviews: 278,
    desc: "Goodyear's longest-lasting touring tire. WearCheck indicator shows when tires need replacing. TripleTred Technology provides year-round traction.",
    features: ["85,000-mile tread life","TripleTred Technology","WearCheck wear indicator","Fuel-efficient design"],
    specs: { Width:"215 mm", Profile:"55", Rim:'17"', Season:"All-Season", Brand:"Goodyear" },
    compat: ["Honda Civic 2016–2024","Toyota Corolla 2014–2024","Mazda 3 2015–2024"],
  },
  {
    name: "Cooper Adventurer A/T",
    brand: "Cooper", cat: "tire", catLabel: "All-Terrain Tires",
    price: 128.00, oldPrice: 159.00, stock: 55, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/tire-3.png", rating: 4.7, reviews: 189,
    desc: "Built for adventure. The Cooper Adventurer A/T handles both highway and off-road terrain with confidence. Stone ejector ribs prevent stone retention.",
    features: ["On/off road all-terrain capability","Stone ejector ribs","Aggressive sidewall styling","Stable highway handling"],
    specs: { Width:"265 mm", Profile:"70", Rim:'17"', Season:"All-Season", Brand:"Cooper" },
    compat: ["Ford F-150 2015–2024","Chevy Silverado 2014–2024","Toyota Tacoma 2016–2024"],
  },
  {
    name: "Bridgestone Turanza QuietTrack",
    brand: "Bridgestone", cat: "tire", catLabel: "Grand Touring Tires",
    price: 167.00, oldPrice: 210.00, stock: 22, isFeatured: false,
    tag: "Top Rated", badge: null,
    img: "/tire-4.png", rating: 4.8, reviews: 203,
    desc: "Ultra-quiet grand touring tire for luxury sedans and crossovers. QuietTrack technology reduces road noise significantly for a premium cabin experience.",
    features: ["QuietTrack noise reduction technology","70,000-mile warranty","Wet braking excellence","Comfort Ride Technology"],
    specs: { Width:"235 mm", Profile:"45", Rim:'18"', Season:"All-Season", Brand:"Bridgestone" },
    compat: ["BMW 3 Series","Audi A4","Mercedes C-Class","Lexus ES"],
  },
  {
    name: "Pirelli Scorpion All-Terrain Plus",
    brand: "Pirelli", cat: "tire", catLabel: "All-Terrain Tires",
    price: 189.00, oldPrice: 235.00, stock: 18, isFeatured: true,
    tag: "Premium", badge: "New Arrival",
    img: "/tire1.png", rating: 4.9, reviews: 145,
    desc: "Premium all-terrain tire from Pirelli designed for SUVs and light trucks. Exceptional grip in mud, gravel, and light snow conditions.",
    features: ["3-Peak Mountain Snowflake rated","Self-cleaning tread design","Reinforced sidewalls","Highway-friendly noise levels"],
    specs: { Width:"275 mm", Profile:"65", Rim:'18"', Season:"All-Weather", Brand:"Pirelli" },
    compat: ["Jeep Grand Cherokee","Land Rover Defender","Ford Explorer","Toyota 4Runner"],
  },

  // ── MOTOR OIL ──
  {
    name: "Full Synthetic 5W-30 Motor Oil",
    brand: "Valvoline", cat: "oil", catLabel: "Motor Oil",
    price: 38.99, oldPrice: 52.00, stock: 120, isFeatured: true,
    tag: "Top Rated", badge: "Top Rated",
    img: "/oil-4.png", rating: 4.8, reviews: 245,
    desc: "Premium full-synthetic 5W-30 motor oil for modern engines. Superior protection against wear, heat, and deposits for extended drain intervals up to 10,000 miles.",
    features: ["Full synthetic formula","Extended drain up to 10,000 miles","Excellent cold-start performance","Reduces engine deposits & sludge"],
    specs: { Viscosity:"5W-30", Volume:"5 Quarts", Type:"Full Synthetic", "API Rating":"SP", Brand:"Valvoline" },
    compat: ["Most 4-cylinder & V6 engines","Turbocharged engines","GDI direct injection engines"],
  },
  {
    name: "Castrol Edge 10W-40 Full Synthetic",
    brand: "Castrol", cat: "oil", catLabel: "Motor Oil",
    price: 44.99, oldPrice: 58.00, stock: 95, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/oil-1.png", rating: 4.7, reviews: 198,
    desc: "Castrol EDGE with Fluid Titanium Technology strengthens the oil film to reduce metal-to-metal contact and fight engine wear. Ideal for high-performance engines.",
    features: ["Fluid Titanium Technology","Maximum engine performance","Turbo protection","5x better wear protection vs industry standard"],
    specs: { Viscosity:"10W-40", Volume:"5 Quarts", Type:"Full Synthetic", Brand:"Castrol" },
    compat: ["High-performance engines","European vehicles","Sports cars","Turbo engines"],
  },
  {
    name: "Mobil 1 0W-20 Advanced Full Synthetic",
    brand: "Mobil 1", cat: "oil", catLabel: "Motor Oil",
    price: 54.99, oldPrice: 68.00, stock: 80, isFeatured: true,
    tag: "Best Seller", badge: "Editor's Choice",
    img: "/oil-2.png", rating: 4.9, reviews: 421,
    desc: "Mobil 1 0W-20 provides outstanding engine protection and performance in all temperatures. Meets or exceeds requirements of latest industry standards.",
    features: ["Outstanding high & low temp protection","Exceeds latest ILSAC GF-6 standard","Up to 20,000 miles between oil changes","Active Cleansing Technology"],
    specs: { Viscosity:"0W-20", Volume:"5 Quarts", Type:"Full Synthetic", Brand:"Mobil 1" },
    compat: ["Toyota Prius","Honda CR-V","Ford Explorer","Hybrid vehicles"],
  },
  {
    name: "Pennzoil Platinum 5W-20 Full Synthetic",
    brand: "Pennzoil", cat: "oil", catLabel: "Motor Oil",
    price: 41.99, oldPrice: 55.00, stock: 75, isFeatured: false,
    tag: "Sale", badge: null,
    img: "/oil-3.png", rating: 4.7, reviews: 167,
    desc: "Made from natural gas, not crude oil. Pennzoil Platinum provides complete protection while keeping pistons cleaner than any other leading motor oil.",
    features: ["Made from natural gas","Piston cleanliness superior to industry standard","Better fuel economy vs dirty engine","Complete protection in extreme temperatures"],
    specs: { Viscosity:"5W-20", Volume:"5 Quarts", Type:"Full Synthetic", Brand:"Pennzoil" },
    compat: ["Ford F-150 EcoBoost","Chevy Silverado","Dodge Ram","Most modern engines"],
  },

  // ── BRAKES ──
  {
    name: "Performance Ceramic Brake Pad Set",
    brand: "Bosch", cat: "brake", catLabel: "Brake Pads",
    price: 65.00, oldPrice: 89.00, stock: 60, isFeatured: true,
    tag: "Top Rated", badge: "Best Value",
    img: "/pro1.png", rating: 4.8, reviews: 334,
    desc: "Bosch QuietCast ceramic brake pads deliver smooth, quiet braking. Chamfers and slots reduce noise. Includes hardware kit for easy installation.",
    features: ["Ceramic formula for quiet performance","Includes shims and hardware","Low dust formula","OE fit guaranteed"],
    specs: { Position:"Front", Material:"Ceramic", "Includes Hardware":"Yes", Brand:"Bosch" },
    compat: ["Honda Accord 2013–2024","Toyota Camry 2012–2024","Nissan Altima 2013–2024"],
  },
  {
    name: "EBC Greenstuff Sport Brake Pads",
    brand: "EBC", cat: "brake", catLabel: "Brake Pads",
    price: 78.00, oldPrice: 99.00, stock: 40, isFeatured: false,
    tag: "Sport", badge: null,
    img: "/pro2.png", rating: 4.7, reviews: 156,
    desc: "EBC Greenstuff brake pads are designed for fast road use offering improved braking and handling over standard OEM pads with minimal dust.",
    features: ["Sport compound for better bite","Extremely low dust","Bedded-in from new","Groove machined for debris clearance"],
    specs: { Position:"Front", Material:"Sport Compound", Type:"Street Performance", Brand:"EBC" },
    compat: ["BMW 3 Series","Audi A4","VW Golf GTI","Honda Civic Si"],
  },
  {
    name: "Brembo UV Coated Brake Rotor Pair",
    brand: "Brembo", cat: "brake", catLabel: "Brake Rotors",
    price: 112.00, oldPrice: 145.00, stock: 28, isFeatured: true,
    tag: "Premium", badge: "Pro Choice",
    img: "/pro3.png", rating: 4.9, reviews: 211,
    desc: "Brembo UV coated rotors resist rust before and during use. Precision machined for perfect balance. Direct OE replacement for most vehicles.",
    features: ["UV coating prevents rust","Precision balanced","Direct OE replacement","3-year/36,000 mile warranty"],
    specs: { Position:"Front", Diameter:'12.6"', Coating:"UV Zinc", Brand:"Brembo" },
    compat: ["Ford F-150 2015–2024","Chevy Silverado 2014–2022","GMC Sierra 2015–2022"],
  },

  // ── BATTERIES ──
  {
    name: "Optima RedTop AGM Battery",
    brand: "Optima", cat: "battery", catLabel: "Car Battery",
    price: 229.00, oldPrice: 279.00, stock: 25, isFeatured: true,
    tag: "Best Seller", badge: "Top Rated",
    img: "/pro4.png", rating: 4.9, reviews: 389,
    desc: "The Optima RedTop is the ultimate starting battery. Delivers powerful burst of ignition power for a reliable start-up every time. Ideal for high-demand electrical systems.",
    features: ["15x more vibration resistant","Strong cranking power even in cold","Completely maintenance free","Mountable in virtually any position"],
    specs: { "Cold Cranking Amps":"800A", "Reserve Capacity":"100 min", Type:"AGM", Brand:"Optima" },
    compat: ["Most 12V automotive applications","Trucks","SUVs","Performance vehicles"],
  },
  {
    name: "DieHard Platinum AGM Battery",
    brand: "DieHard", cat: "battery", catLabel: "Car Battery",
    price: 189.00, oldPrice: 229.00, stock: 35, isFeatured: false,
    tag: "Sale", badge: null,
    img: "/pro5.png", rating: 4.7, reviews: 245,
    desc: "DieHard Platinum AGM battery provides 2x more cycle life than standard batteries. Optimal performance in extreme temperatures. Spill-proof and maintenance free.",
    features: ["2x more cycle life","Spill-proof AGM design","Works in -40°F to 140°F","3-year free replacement warranty"],
    specs: { "Cold Cranking Amps":"710A", "Reserve Capacity":"120 min", Type:"AGM", Brand:"DieHard" },
    compat: ["Sedans","SUVs","Trucks","Vehicles with start-stop systems"],
  },

  // ── FILTERS ──
  {
    name: "Premium Oil Filter Kit",
    brand: "K&N", cat: "filter", catLabel: "Oil Filter",
    price: 24.99, oldPrice: 35.00, stock: 150, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/pro6.png", rating: 4.8, reviews: 421,
    desc: "K&N oil filters use a unique filtering media that is designed to provide high oil flow while filtering harmful contaminants. Fits most popular vehicles.",
    features: ["Wrench-off design for easy removal","Leak-free seal","High flow design","Available for most vehicles"],
    specs: { Thread:"M20x1.5", Type:"Spin-On", Media:"Synthetic", Brand:"K&N" },
    compat: ["Universal fit — most gasoline engines","Toyota","Honda","Ford","Chevrolet"],
  },
  {
    name: "High-Flow Air Filter",
    brand: "K&N", cat: "filter", catLabel: "Engine Air Filter",
    price: 29.99, oldPrice: 42.00, stock: 110, isFeatured: false,
    tag: "Sale", badge: null,
    img: "/pro7.png", rating: 4.6, reviews: 198,
    desc: "K&N high-flow air filter increases horsepower and acceleration. Washable and reusable for up to 50,000 miles. Direct OE replacement.",
    features: ["Increases horsepower","Washable & reusable","Up to 50,000 miles service life","Easy drop-in replacement"],
    specs: { Type:"Panel", Material:"Cotton Gauze", Washable:"Yes", Brand:"K&N" },
    compat: ["Honda Civic 2016–2024","Toyota Camry 2018–2024","Ford Mustang 2018–2024"],
  },
  {
    name: "Cabin Air Filter — HEPA Grade",
    brand: "Fram", cat: "filter", catLabel: "Cabin Air Filter",
    price: 19.99, oldPrice: 28.00, stock: 200, isFeatured: false,
    tag: "Value", badge: null,
    img: "/pro8.png", rating: 4.5, reviews: 312,
    desc: "Fram cabin air filter blocks dust, pollen, mold spores, and other particles from entering your vehicle. HEPA grade filtration for cleaner cabin air.",
    features: ["Blocks 98% of dust & pollen","Activated carbon layer eliminates odors","Easy 15-minute installation","12-month/15,000 mile service life"],
    specs: { Type:"Cabin", Grade:"HEPA", "Carbon Layer":"Yes", Brand:"Fram" },
    compat: ["Toyota RAV4 2019–2024","Honda CR-V 2017–2024","Nissan Rogue 2014–2024"],
  },
  {
    name: "Fuel Filter Heavy Duty",
    brand: "WIX", cat: "filter", catLabel: "Fuel Filter",
    price: 22.99, oldPrice: 32.00, stock: 85, isFeatured: false,
    tag: null, badge: null,
    img: "/pro9.png", rating: 4.6, reviews: 134,
    desc: "WIX fuel filter protects fuel injectors and carburetor jets from rust, dirt, and harmful particles in gasoline. Heavy-duty construction for long service life.",
    features: ["Removes rust and dirt from fuel","Protects fuel injectors","Heavy-duty steel housing","OE style quick-connect fittings"],
    specs: { Type:"In-Line", Micron:"10 micron", Material:"Steel", Brand:"WIX" },
    compat: ["Ford F-Series","Chevy Silverado","Dodge Ram","GMC Sierra"],
  },

  // ── WHEELS ──
  {
    name: "18\" Alloy Wheel — Gunmetal Finish",
    brand: "Enkei", cat: "wheel", catLabel: "Alloy Wheels",
    price: 189.00, oldPrice: 240.00, stock: 16, isFeatured: true,
    tag: "Premium", badge: "New",
    img: "/wheel.png", rating: 4.8, reviews: 89,
    desc: "Enkei 18-inch alloy wheel in gunmetal finish. MAT process technology for superior strength and lighter weight. Perfect for sport and daily driving.",
    features: ["MAT Technology — stronger & lighter","Flow-formed construction","Gunmetal machined finish","Hub-centric rings included"],
    specs: { Diameter:'18"', Width:'8"', "Bolt Pattern":"5x114.3", Offset:"45mm", Material:"Alloy", Brand:"Enkei" },
    compat: ["Honda Accord","Toyota Camry","Mazda 6","Subaru Legacy"],
  },
  {
    name: "17\" Steel Wheel Winter Set",
    brand: "Dorman", cat: "wheel", catLabel: "Steel Wheels",
    price: 89.00, oldPrice: 115.00, stock: 30, isFeatured: false,
    tag: "Value", badge: null,
    img: "/tire11.png", rating: 4.5, reviews: 67,
    desc: "Dorman steel wheel ideal for winter tire setups. Durable powder-coated black finish resists rust and corrosion in harsh winter conditions.",
    features: ["Durable powder-coat finish","Rust & corrosion resistant","Perfect for winter tire swaps","Direct OE replacement"],
    specs: { Diameter:'17"', Width:'7"', "Bolt Pattern":"5x112", Material:"Steel", Brand:"Dorman" },
    compat: ["Volkswagen Jetta","Audi A3","Skoda Octavia","Seat Leon"],
  },

  // ── LIGHTING ──
  {
    name: "LED Headlight Bulb Kit H11 — 6000K",
    brand: "Auxbeam", cat: "lighting", catLabel: "LED Headlights",
    price: 49.99, oldPrice: 72.00, stock: 90, isFeatured: true,
    tag: "Best Seller", badge: "Hot",
    img: "/pro10.png", rating: 4.7, reviews: 567,
    desc: "Auxbeam H11 LED headlight kit delivers 6000K bright white light. 30W per bulb, 360° illumination, IP68 waterproof. Easy plug-and-play installation.",
    features: ["6000K pure white light","IP68 waterproof rating","10,000+ hour lifespan","Plug-and-play — no wiring needed","Built-in EMC to prevent radio interference"],
    specs: { Bulb:"H11/H8/H9", Color:"6000K White", Power:"30W/bulb", Lifespan:"10,000+ hrs", Brand:"Auxbeam" },
    compat: ["Most vehicles with H11/H8/H9 bulbs","Check fitment guide before purchase"],
  },
  {
    name: "HID Xenon Conversion Kit 9005",
    brand: "Kensun", cat: "lighting", catLabel: "HID Kits",
    price: 74.99, oldPrice: 99.00, stock: 42, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/best1.png", rating: 4.6, reviews: 213,
    desc: "Complete HID conversion kit for your high beams or fog lights. 6000K xenon bulbs produce a crisp, clean white light far superior to stock halogen.",
    features: ["Slim AC ballasts for faster startup","6000K xenon bulbs included","Waterproof connectors","Easy DIY installation"],
    specs: { Bulb:"9005/HB3", Color:"6000K", Wattage:"35W", Type:"AC Slim Ballast", Brand:"Kensun" },
    compat: ["Honda CR-V","Toyota Highlander","Ford Expedition","Chevy Tahoe"],
  },
  {
    name: "LED Fog Light Kit — Yellow 3000K",
    brand: "Nilight", cat: "lighting", catLabel: "Fog Lights",
    price: 34.99, oldPrice: 49.00, stock: 65, isFeatured: false,
    tag: "Sale", badge: null,
    img: "/best2.png", rating: 4.5, reviews: 178,
    desc: "Nilight 3000K yellow LED fog lights cut through rain, snow, and fog better than white lights. H11 plug-and-play, no modification needed.",
    features: ["3000K yellow for better fog penetration","H11 plug-and-play","IP67 waterproof","2-year warranty"],
    specs: { Bulb:"H11", Color:"3000K Yellow", Power:"18W/pair", Waterproof:"IP67", Brand:"Nilight" },
    compat: ["Universal H11 fog light applications"],
  },

  // ── ACCESSORIES ──
  {
    name: "Universal Car Floor Mats — All-Weather",
    brand: "WeatherTech", cat: "accessory", catLabel: "Floor Mats",
    price: 89.99, oldPrice: 120.00, stock: 70, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/best3.png", rating: 4.8, reviews: 445,
    desc: "WeatherTech all-weather floor mats protect your vehicle's interior from mud, snow, and spills. Custom laser-measured fit. Heavy-duty rubber construction.",
    features: ["Custom laser-measured fit","Heavy-duty rubber","Raised edges contain spills","Easy to clean — hose off & dry"],
    specs: { Material:"Heavy Duty Rubber", Coverage:"Front & Rear", "Anti-Slip":"Yes", Brand:"WeatherTech" },
    compat: ["Custom fit available for most 2010–2024 vehicles"],
  },
  {
    name: "Dash Camera — 4K UHD with Night Vision",
    brand: "Vantrue", cat: "accessory", catLabel: "Dash Cameras",
    price: 149.99, oldPrice: 199.00, stock: 38, isFeatured: true,
    tag: "Hot", badge: "New Arrival",
    img: "/best4.png", rating: 4.8, reviews: 289,
    desc: "Vantrue 4K dash camera with Sony STARVIS night vision sensor. Records sharp footage day and night. Parking mode, loop recording, G-sensor included.",
    features: ["4K 30fps or 1440P 60fps recording","Sony STARVIS night vision","Parking monitor mode","Built-in GPS speed logger","G-sensor auto save on impact"],
    specs: { Resolution:"4K/2160P", "Night Vision":"Sony STARVIS", GPS:"Built-in", "Storage":"Up to 512GB", Brand:"Vantrue" },
    compat: ["Universal — fits all vehicles with 12V outlet"],
  },
  {
    name: "Car Jump Starter 2000A Peak",
    brand: "NOCO", cat: "accessory", catLabel: "Jump Starters",
    price: 119.99, oldPrice: 159.00, stock: 45, isFeatured: true,
    tag: "Best Seller", badge: "Must Have",
    img: "/motor.png", rating: 4.9, reviews: 612,
    desc: "NOCO Boost Plus 2000A portable jump starter safely jump starts dead batteries. Works on gas engines up to 8L and diesel up to 6L. Also charges phones and tablets via USB.",
    features: ["2000A peak current","Jumps gas up to 8L, diesel up to 6L","Spark-proof — reverse polarity protection","Built-in 400-lumen LED flashlight","USB charging ports"],
    specs: { "Peak Current":"2000A", "Battery Capacity":"20Ah/74Wh", "Gas Engine":"Up to 8.0L", "Diesel Engine":"Up to 6.0L", Brand:"NOCO" },
    compat: ["Cars","Trucks","SUVs","Motorcycles","Boats"],
  },
  {
    name: "Tire Inflator & Air Compressor",
    brand: "Viair", cat: "accessory", catLabel: "Tire Tools",
    price: 64.99, oldPrice: 89.00, stock: 55, isFeatured: false,
    tag: "Popular", badge: null,
    img: "/roadside.png", rating: 4.6, reviews: 334,
    desc: "Viair portable air compressor for car, truck and SUV tires. 12V DC powered, inflates a standard tire in 4–5 minutes. Includes carry bag and accessories.",
    features: ["Max 150 PSI working pressure","Inflates tire in 4–5 minutes","Works with trucks up to 35\" tires","Includes coil hose and accessories","LED work light"],
    specs: { "Max PSI":"150", "CFM":"1.47 CFM", Power:"12V DC", Cord:"16 ft", Brand:"Viair" },
    compat: ["Cars","Trucks","SUVs","RVs","ATVs"],
  },
];

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await Product.countDocuments();
  if (existing >= 15) {
    console.log(`Already ${existing} products in DB. Skipping seed.`);
    await mongoose.disconnect();
    return process.exit(0);
  }

  await Product.deleteMany({});
  const inserted = await Product.insertMany(PRODUCTS);
  console.log(`✅ Inserted ${inserted.length} products successfully!`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
