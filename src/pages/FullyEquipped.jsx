import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-truck",         title:"Mobile Service Trucks",   desc:"Each truck is fully stocked with professional-grade tools, hydraulic jacks, tire machines, and everything needed to handle any job on-site." },
  { icon:"fa-toolbox",       title:"Professional Equipment",  desc:"We carry state-of-the-art tire changers, wheel balancers, impact wrenches, and diagnostic tools so every job is done right the first time." },
  { icon:"fa-gas-pump",      title:"Oils & Fluids On Board",  desc:"Full synthetic, synthetic blend, and conventional oils — plus all filters and fluids — are stocked on every truck so we never have to make a second trip." },
  { icon:"fa-tire",          title:"Wide Tire Inventory",     desc:"From passenger cars to semi-trucks and trailers, we carry a wide selection of new and used tires to get you back on the road fast." },
  { icon:"fa-bolt",          title:"Power & Compressors",     desc:"Our trucks carry onboard generators and air compressors, so we operate anywhere — no garage, no outlet, no problem." },
  { icon:"fa-shield-halved", title:"Safety Gear & Lights",    desc:"Every truck is equipped with safety cones, high-visibility lighting, and PPE to ensure a safe working environment at any location." },
];

const steps = [
  { label:"You Call", desc:"Reach us by phone or online form — 24 hours a day, 7 days a week." },
  { label:"Truck Dispatched", desc:"The nearest fully equipped truck is immediately dispatched to your location." },
  { label:"Job Completed", desc:"Our technician arrives with everything needed and completes the job on-site." },
  { label:"Back on the Road", desc:"No tow, no wait — you're rolling again in the shortest time possible." },
];

export default function FullyEquipped() {
  return (
    <ServiceInfoPage
      icon="fa-truck"
      badge="FLEET"
      title="Fully Equipped"
      subtitle="Mobile Service Trucks"
      heroDesc="Every 24HR Fremont Tire service truck is a rolling garage — packed with professional tools, a full tire inventory, oils, and everything we need to fix your vehicle on the spot. No tow truck required."
      cards={cards}
      steps={steps}
      ctaTitle="Need Service Right Now?"
      ctaDesc="Our fully equipped trucks are standing by 24/7 for you."
    />
  );
}
