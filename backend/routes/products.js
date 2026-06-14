const router  = require('express').Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all  — public, supports ?category=tire&featured=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.cat)      filter.cat        = req.query.cat;
    if (req.query.category) filter.cat        = req.query.category;
    if (req.query.featured) filter.isFeatured = req.query.featured === 'true';
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TEMP seed endpoint — remove after use
router.get('/seed-now', async (req, res) => {
  try {
    const PRODUCTS = [
      { name:"Michelin Defender T+H All-Season", brand:"Michelin", cat:"tire", catLabel:"All-Season Tires", price:142.00, oldPrice:179.00, stock:45, isFeatured:true, tag:"Best Seller", badge:"Most Popular", img:"/tire-1.png", rating:4.9, reviews:312, desc:"The Michelin Defender T+H delivers exceptional tread life with up to 80,000 miles of confident, all-season driving.", features:["Up to 80,000-mile tread life warranty","IntelliSipe technology for wet/dry grip","All-season traction including light snow"], specs:{ Width:"225 mm", Profile:"60", Rim:'16"', Season:"All-Season" }, compat:["Toyota Camry 2015–2024","Honda Accord 2014–2024"] },
      { name:"Goodyear Assurance MaxLife", brand:"Goodyear", cat:"tire", catLabel:"Touring Tires", price:156.00, oldPrice:198.00, stock:30, isFeatured:true, tag:"Sale", badge:"Top Pick", img:"/tire-2.png", rating:4.8, reviews:278, desc:"Goodyear's longest-lasting touring tire with TripleTred Technology for year-round traction.", features:["85,000-mile tread life","TripleTred Technology","WearCheck wear indicator"], specs:{ Width:"215 mm", Rim:'17"', Season:"All-Season" }, compat:["Honda Civic 2016–2024","Toyota Corolla 2014–2024"] },
      { name:"Cooper Adventurer A/T", brand:"Cooper", cat:"tire", catLabel:"All-Terrain Tires", price:128.00, oldPrice:159.00, stock:55, isFeatured:false, tag:"Popular", img:"/tire-3.png", rating:4.7, reviews:189, desc:"Built for adventure. Handles both highway and off-road terrain with confidence.", features:["On/off road all-terrain capability","Stone ejector ribs","Aggressive sidewall styling"], specs:{ Width:"265 mm", Rim:'17"', Season:"All-Season" }, compat:["Ford F-150 2015–2024","Toyota Tacoma 2016–2024"] },
      { name:"Bridgestone Turanza QuietTrack", brand:"Bridgestone", cat:"tire", catLabel:"Grand Touring Tires", price:167.00, oldPrice:210.00, stock:22, isFeatured:false, tag:"Top Rated", img:"/tire-4.png", rating:4.8, reviews:203, desc:"Ultra-quiet grand touring tire for luxury sedans and crossovers.", features:["QuietTrack noise reduction","70,000-mile warranty","Wet braking excellence"], specs:{ Width:"235 mm", Rim:'18"', Season:"All-Season" }, compat:["BMW 3 Series","Audi A4","Mercedes C-Class"] },
      { name:"Pirelli Scorpion All-Terrain Plus", brand:"Pirelli", cat:"tire", catLabel:"All-Terrain Tires", price:189.00, oldPrice:235.00, stock:18, isFeatured:true, tag:"Premium", badge:"New Arrival", img:"/tire1.png", rating:4.9, reviews:145, desc:"Premium all-terrain tire for SUVs and light trucks with exceptional grip.", features:["3-Peak Mountain Snowflake rated","Self-cleaning tread","Reinforced sidewalls"], specs:{ Width:"275 mm", Rim:'18"', Season:"All-Weather" }, compat:["Jeep Grand Cherokee","Land Rover Defender","Toyota 4Runner"] },
      { name:"Full Synthetic 5W-30 Motor Oil", brand:"Valvoline", cat:"oil", catLabel:"Motor Oil", price:38.99, oldPrice:52.00, stock:120, isFeatured:true, tag:"Top Rated", badge:"Top Rated", img:"/oil-4.png", rating:4.8, reviews:245, desc:"Premium full-synthetic 5W-30 motor oil for modern engines. Extended drain intervals up to 10,000 miles.", features:["Full synthetic formula","Extended drain up to 10,000 miles","Excellent cold-start performance"], specs:{ Viscosity:"5W-30", Volume:"5 Quarts", Type:"Full Synthetic" }, compat:["Most 4-cylinder & V6 engines","Turbocharged engines"] },
      { name:"Castrol Edge 10W-40 Full Synthetic", brand:"Castrol", cat:"oil", catLabel:"Motor Oil", price:44.99, oldPrice:58.00, stock:95, isFeatured:false, tag:"Popular", img:"/oil-1.png", rating:4.7, reviews:198, desc:"Castrol EDGE with Fluid Titanium Technology strengthens the oil film to reduce engine wear.", features:["Fluid Titanium Technology","5x better wear protection","Turbo protection"], specs:{ Viscosity:"10W-40", Volume:"5 Quarts", Type:"Full Synthetic" }, compat:["High-performance engines","European vehicles"] },
      { name:"Mobil 1 0W-20 Advanced Full Synthetic", brand:"Mobil 1", cat:"oil", catLabel:"Motor Oil", price:54.99, oldPrice:68.00, stock:80, isFeatured:true, tag:"Best Seller", badge:"Editor's Choice", img:"/oil-2.png", rating:4.9, reviews:421, desc:"Outstanding engine protection and performance in all temperatures. Up to 20,000 miles between oil changes.", features:["Up to 20,000 miles drain interval","Exceeds ILSAC GF-6 standard","Active Cleansing Technology"], specs:{ Viscosity:"0W-20", Volume:"5 Quarts", Type:"Full Synthetic" }, compat:["Toyota Prius","Honda CR-V","Hybrid vehicles"] },
      { name:"Pennzoil Platinum 5W-20 Full Synthetic", brand:"Pennzoil", cat:"oil", catLabel:"Motor Oil", price:41.99, oldPrice:55.00, stock:75, isFeatured:false, tag:"Sale", img:"/oil-3.png", rating:4.7, reviews:167, desc:"Made from natural gas, not crude oil. Keeps pistons cleaner than any other leading motor oil.", features:["Made from natural gas","Superior piston cleanliness","Complete protection in extreme temperatures"], specs:{ Viscosity:"5W-20", Volume:"5 Quarts", Type:"Full Synthetic" }, compat:["Ford F-150 EcoBoost","Chevy Silverado","Most modern engines"] },
      { name:"Performance Ceramic Brake Pad Set", brand:"Bosch", cat:"brake", catLabel:"Brake Pads", price:65.00, oldPrice:89.00, stock:60, isFeatured:true, tag:"Top Rated", badge:"Best Value", img:"/pro1.png", rating:4.8, reviews:334, desc:"Bosch ceramic brake pads deliver smooth, quiet braking. Includes hardware kit for easy installation.", features:["Ceramic formula — quiet performance","Includes shims and hardware","Low dust formula","OE fit guaranteed"], specs:{ Position:"Front", Material:"Ceramic" }, compat:["Honda Accord 2013–2024","Toyota Camry 2012–2024"] },
      { name:"EBC Greenstuff Sport Brake Pads", brand:"EBC", cat:"brake", catLabel:"Brake Pads", price:78.00, oldPrice:99.00, stock:40, isFeatured:false, tag:"Sport", img:"/pro2.png", rating:4.7, reviews:156, desc:"Designed for fast road use offering improved braking and handling over standard OEM pads.", features:["Sport compound for better bite","Extremely low dust","Bedded-in from new"], specs:{ Position:"Front", Material:"Sport Compound" }, compat:["BMW 3 Series","Audi A4","Honda Civic Si"] },
      { name:"Brembo UV Coated Brake Rotor Pair", brand:"Brembo", cat:"brake", catLabel:"Brake Rotors", price:112.00, oldPrice:145.00, stock:28, isFeatured:true, tag:"Premium", badge:"Pro Choice", img:"/pro3.png", rating:4.9, reviews:211, desc:"Brembo UV coated rotors resist rust. Precision machined for perfect balance. Direct OE replacement.", features:["UV coating prevents rust","Precision balanced","3-year/36,000 mile warranty"], specs:{ Position:"Front", Coating:"UV Zinc" }, compat:["Ford F-150 2015–2024","Chevy Silverado 2014–2022"] },
      { name:"Optima RedTop AGM Battery", brand:"Optima", cat:"battery", catLabel:"Car Battery", price:229.00, oldPrice:279.00, stock:25, isFeatured:true, tag:"Best Seller", badge:"Top Rated", img:"/pro4.png", rating:4.9, reviews:389, desc:"The ultimate starting battery. Delivers powerful burst of ignition power for a reliable start-up every time.", features:["15x more vibration resistant","Strong cranking power in cold","Completely maintenance free"], specs:{ "Cold Cranking Amps":"800A", "Reserve Capacity":"100 min", Type:"AGM" }, compat:["Most 12V automotive applications","Trucks","SUVs"] },
      { name:"DieHard Platinum AGM Battery", brand:"DieHard", cat:"battery", catLabel:"Car Battery", price:189.00, oldPrice:229.00, stock:35, isFeatured:false, tag:"Sale", img:"/pro5.png", rating:4.7, reviews:245, desc:"2x more cycle life than standard batteries. Optimal performance in extreme temperatures.", features:["2x more cycle life","Spill-proof AGM design","3-year free replacement warranty"], specs:{ "Cold Cranking Amps":"710A", Type:"AGM" }, compat:["Sedans","SUVs","Trucks"] },
      { name:"Premium Oil Filter Kit", brand:"K&N", cat:"filter", catLabel:"Oil Filter", price:24.99, oldPrice:35.00, stock:150, isFeatured:false, tag:"Popular", img:"/pro6.png", rating:4.8, reviews:421, desc:"K&N oil filters provide high oil flow while filtering harmful contaminants. Fits most popular vehicles.", features:["Wrench-off design","Leak-free seal","High flow design"], specs:{ Thread:"M20x1.5", Type:"Spin-On", Media:"Synthetic" }, compat:["Toyota","Honda","Ford","Chevrolet"] },
      { name:"High-Flow Air Filter", brand:"K&N", cat:"filter", catLabel:"Engine Air Filter", price:29.99, oldPrice:42.00, stock:110, isFeatured:false, tag:"Sale", img:"/pro7.png", rating:4.6, reviews:198, desc:"K&N high-flow air filter increases horsepower. Washable and reusable for up to 50,000 miles.", features:["Increases horsepower","Washable & reusable","Up to 50,000 miles service life"], specs:{ Type:"Panel", Material:"Cotton Gauze", Washable:"Yes" }, compat:["Honda Civic 2016–2024","Toyota Camry 2018–2024"] },
      { name:"Cabin Air Filter — HEPA Grade", brand:"Fram", cat:"filter", catLabel:"Cabin Air Filter", price:19.99, oldPrice:28.00, stock:200, isFeatured:false, tag:"Value", img:"/pro8.png", rating:4.5, reviews:312, desc:"Blocks dust, pollen, mold spores from entering your vehicle. Activated carbon layer eliminates odors.", features:["Blocks 98% of dust & pollen","Activated carbon odor elimination","Easy 15-minute installation"], specs:{ Type:"Cabin", Grade:"HEPA" }, compat:["Toyota RAV4 2019–2024","Honda CR-V 2017–2024"] },
      { name:"Fuel Filter Heavy Duty", brand:"WIX", cat:"filter", catLabel:"Fuel Filter", price:22.99, oldPrice:32.00, stock:85, isFeatured:false, img:"/pro9.png", rating:4.6, reviews:134, desc:"Protects fuel injectors and carburetor from rust, dirt, and particles in gasoline.", features:["Removes rust and dirt from fuel","Protects fuel injectors","Heavy-duty steel housing"], specs:{ Type:"In-Line", Micron:"10 micron" }, compat:["Ford F-Series","Chevy Silverado","Dodge Ram"] },
      { name:"18\" Alloy Wheel — Gunmetal Finish", brand:"Enkei", cat:"wheel", catLabel:"Alloy Wheels", price:189.00, oldPrice:240.00, stock:16, isFeatured:true, tag:"Premium", badge:"New", img:"/wheel.png", rating:4.8, reviews:89, desc:"Enkei 18-inch alloy wheel in gunmetal finish. MAT process for superior strength and lighter weight.", features:["MAT Technology — stronger & lighter","Flow-formed construction","Hub-centric rings included"], specs:{ Diameter:'18"', "Bolt Pattern":"5x114.3", Material:"Alloy" }, compat:["Honda Accord","Toyota Camry","Mazda 6"] },
      { name:"17\" Steel Wheel Winter Set", brand:"Dorman", cat:"wheel", catLabel:"Steel Wheels", price:89.00, oldPrice:115.00, stock:30, isFeatured:false, tag:"Value", img:"/tire11.png", rating:4.5, reviews:67, desc:"Durable powder-coated black finish. Perfect for winter tire setups. Rust and corrosion resistant.", features:["Durable powder-coat finish","Rust & corrosion resistant","Direct OE replacement"], specs:{ Diameter:'17"', Material:"Steel" }, compat:["Volkswagen Jetta","Audi A3","Skoda Octavia"] },
      { name:"LED Headlight Bulb Kit H11 — 6000K", brand:"Auxbeam", cat:"lighting", catLabel:"LED Headlights", price:49.99, oldPrice:72.00, stock:90, isFeatured:true, tag:"Best Seller", badge:"Hot", img:"/pro10.png", rating:4.7, reviews:567, desc:"6000K bright white LED headlights. 30W per bulb, 360° illumination, IP68 waterproof. Plug-and-play.", features:["6000K pure white light","IP68 waterproof","10,000+ hour lifespan","Plug-and-play installation"], specs:{ Bulb:"H11/H8/H9", Color:"6000K White", Power:"30W/bulb" }, compat:["Most vehicles with H11/H8/H9 bulbs"] },
      { name:"HID Xenon Conversion Kit 9005", brand:"Kensun", cat:"lighting", catLabel:"HID Kits", price:74.99, oldPrice:99.00, stock:42, isFeatured:false, tag:"Popular", img:"/best1.png", rating:4.6, reviews:213, desc:"Complete HID conversion kit. 6000K xenon bulbs produce crisp white light far superior to halogen.", features:["Slim AC ballasts","6000K xenon bulbs included","Waterproof connectors"], specs:{ Bulb:"9005/HB3", Color:"6000K", Wattage:"35W" }, compat:["Honda CR-V","Toyota Highlander","Ford Expedition"] },
      { name:"LED Fog Light Kit — Yellow 3000K", brand:"Nilight", cat:"lighting", catLabel:"Fog Lights", price:34.99, oldPrice:49.00, stock:65, isFeatured:false, tag:"Sale", img:"/best2.png", rating:4.5, reviews:178, desc:"3000K yellow LED fog lights cut through rain, snow, and fog. H11 plug-and-play.", features:["3000K yellow for better fog penetration","H11 plug-and-play","IP67 waterproof","2-year warranty"], specs:{ Bulb:"H11", Color:"3000K Yellow" }, compat:["Universal H11 fog light applications"] },
      { name:"Universal Car Floor Mats — All-Weather", brand:"WeatherTech", cat:"accessory", catLabel:"Floor Mats", price:89.99, oldPrice:120.00, stock:70, isFeatured:false, tag:"Popular", img:"/best3.png", rating:4.8, reviews:445, desc:"Custom laser-measured fit. Heavy-duty rubber protects from mud, snow, and spills.", features:["Custom laser-measured fit","Heavy-duty rubber","Raised edges contain spills"], specs:{ Material:"Heavy Duty Rubber", Coverage:"Front & Rear" }, compat:["Custom fit — most 2010–2024 vehicles"] },
      { name:"Dash Camera — 4K UHD with Night Vision", brand:"Vantrue", cat:"accessory", catLabel:"Dash Cameras", price:149.99, oldPrice:199.00, stock:38, isFeatured:true, tag:"Hot", badge:"New Arrival", img:"/best4.png", rating:4.8, reviews:289, desc:"4K dash camera with Sony STARVIS night vision. Parking mode, loop recording, G-sensor included.", features:["4K 30fps recording","Sony STARVIS night vision","Parking monitor mode","Built-in GPS"], specs:{ Resolution:"4K/2160P", GPS:"Built-in" }, compat:["Universal — fits all vehicles"] },
      { name:"Car Jump Starter 2000A Peak", brand:"NOCO", cat:"accessory", catLabel:"Jump Starters", price:119.99, oldPrice:159.00, stock:45, isFeatured:true, tag:"Best Seller", badge:"Must Have", img:"/motor.png", rating:4.9, reviews:612, desc:"NOCO Boost Plus safely jump starts dead batteries on gas engines up to 8L and diesel up to 6L.", features:["2000A peak current","Spark-proof — reverse polarity protection","Built-in 400-lumen LED flashlight","USB charging ports"], specs:{ "Peak Current":"2000A", "Gas Engine":"Up to 8.0L" }, compat:["Cars","Trucks","SUVs","Motorcycles"] },
      { name:"Tire Inflator & Air Compressor", brand:"Viair", cat:"accessory", catLabel:"Tire Tools", price:64.99, oldPrice:89.00, stock:55, isFeatured:false, tag:"Popular", img:"/roadside.png", rating:4.6, reviews:334, desc:"12V portable air compressor. Inflates a standard tire in 4–5 minutes. Includes carry bag and accessories.", features:["Max 150 PSI","Inflates tire in 4–5 minutes","LED work light"], specs:{ "Max PSI":"150", Power:"12V DC" }, compat:["Cars","Trucks","SUVs","RVs"] },
    ];
    await Product.deleteMany({});
    const inserted = await Product.insertMany(PRODUCTS);
    res.json({ success: true, inserted: inserted.length, message: `${inserted.length} products seeded!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one — public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create — admin only
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update — admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE — admin only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
