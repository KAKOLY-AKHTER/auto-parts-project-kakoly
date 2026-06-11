import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-truck",         title:"Mobile Service Trucks",    desc:"Each truck is a fully stocked rolling garage — hydraulic jacks, tire machines, compressors, and everything needed to fix any job on-site." },
  { icon:"fa-toolbox",       title:"Professional Tools",       desc:"State-of-the-art tire changers, wheel balancers, impact wrenches, and diagnostic scanners on every truck." },
  { icon:"fa-gas-pump",      title:"Oils & Fluids On Board",   desc:"Full synthetic, synthetic blend, conventional oils — all filters and fluids stocked so we never need a return trip." },
  { icon:"fa-tire",          title:"Wide Tire Inventory",      desc:"Passenger cars to semi-trucks and trailers — we carry new and quality-used tires in common sizes on every truck." },
  { icon:"fa-bolt",          title:"Power & Air On-Site",      desc:"Onboard generators and air compressors mean we operate anywhere — no power outlet, no problem." },
  { icon:"fa-shield-halved", title:"Safety Equipment",         desc:"Safety cones, high-visibility lighting, PPE gear — every truck is equipped to work safely at any location, day or night." },
];

const steps = [
  { label:"You Call",           desc:"Reach us at (415) 634-7777 any time — 24 hours, 7 days a week." },
  { label:"Truck Dispatched",   desc:"The nearest fully stocked truck is immediately sent to your location." },
  { label:"Arrives Prepared",   desc:"Tech arrives with every tool and part needed for your specific job." },
  { label:"Job Done — On-Site", desc:"Service completed at your location. No tow, no shop, no hassle." },
];

const features = [
  { icon:"fa-truck",          label:"Every Truck Fully Stocked",  detail:"Tools, tires, oils, batteries — all onboard before dispatch." },
  { icon:"fa-bolt",           label:"Independent Power Supply",   detail:"Generators & compressors mean we work anywhere, no grid needed." },
  { icon:"fa-certificate",    label:"Top Brand Parts & Oils",     detail:"Michelin, Mobil 1, Castrol, Valvoline — only trusted brands." },
  { icon:"fa-users",          label:"Certified Technicians",      detail:"Every tech trained and certified for mobile field service." },
  { icon:"fa-clock",          label:"Available 24/7",             detail:"Day, night, weekends, holidays — we're always fully equipped." },
  { icon:"fa-tag",            label:"No Hidden Fees",             detail:"Upfront pricing — you know the cost before we start." },
];

export default function FullyEquipped() {
  return (
    <ServiceInfoPage
      icon="fa-truck"
      title="Fully Equipped"
      subtitle="Mobile Service Trucks — Always Ready"
      heroDesc="Every 24HR Fremont Tire service truck is a rolling garage — packed with professional tools, a wide tire inventory, premium oils, and all the equipment needed to fix your vehicle wherever you are. No tow truck required."
      heroImg="/truck-tire-change.png"
      sectionImg="/roadside.png"
      highlights={["Rolling Garage Trucks","Tire Inventory Onboard","Tools & Compressors","24/7 Ready"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Need Service Right Now?"
      ctaDesc="Our fully equipped trucks are standing by 24/7 — one call and we're on the way with everything needed."
      ctaImg="/truck-tire-change.png"
    />
  );
}
