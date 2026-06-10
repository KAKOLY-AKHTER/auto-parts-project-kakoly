import ServicePageBase from "./ServicePageBase";

const services = [
  { icon:"fa-oil-can",         title:"Full Synthetic Oil",        desc:"Premium full synthetic for maximum engine protection, better fuel economy, and longer change intervals — up to 10,000 miles." },
  { icon:"fa-fill-drip",       title:"Synthetic Blend Oil",       desc:"A cost-effective mix of conventional and synthetic oil — great for daily drivers that need reliable performance." },
  { icon:"fa-droplet",         title:"Conventional Oil",          desc:"Standard mineral oil for older vehicles or low-mileage cars. Affordable and effective for regular maintenance." },
  { icon:"fa-filter",          title:"Oil Filter Replacement",    desc:"Every oil change includes a new OEM-quality oil filter to keep contaminants out of your fresh oil." },
  { icon:"fa-gauge-high",      title:"Multi-Point Inspection",    desc:"We check fluid levels, tire pressure, belts, and lights with every oil change — at no extra charge." },
  { icon:"fa-truck-fast",      title:"Mobile Oil Change",         desc:"We come to you at home, work, or job site. No appointment wait times. Done in 30 minutes or less." },
];

const process = [
  { step:"1", title:"Choose Your Oil",  desc:"Full synthetic, synthetic blend, or conventional — we help you pick the right one for your vehicle." },
  { step:"2", title:"We Come To You",   desc:"Our tech arrives at your location with the correct oil and a new filter ready to go." },
  { step:"3", title:"Quick Service",    desc:"Oil drained, filter swapped, new oil filled, and levels checked — all in under 30 minutes." },
  { step:"4", title:"Drive Fresh",      desc:"Sticker placed, reminder set, and you're good to go for your next interval." },
];

export default function OilChange() {
  return (
    <ServicePageBase
      icon="fa-oil-can"
      badge="Quick & Clean"
      title="Mobile Oil Change Service"
      subtitle="Full Synthetic · Synthetic Blend · Conventional"
      description="Get a professional oil change without leaving home or work. We bring the right oil, a new filter, and certified technicians directly to you. Fast, clean, and done right — in 30 minutes or less."
      heroImg="/tire-repair-service.png"
      services={services}
      process={process}
    />
  );
}
