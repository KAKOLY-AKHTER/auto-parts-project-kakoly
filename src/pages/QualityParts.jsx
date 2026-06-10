import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-certificate",   title:"Top Brand Tires",         desc:"We carry Michelin, Bridgestone, Goodyear, Cooper, and more — new and quality used tires for all vehicle types and budgets." },
  { icon:"fa-flask",         title:"Premium Motor Oils",       desc:"Full synthetic, synthetic blend, and conventional motor oils from brands like Mobil 1, Castrol, Pennzoil, and Valvoline." },
  { icon:"fa-filter",        title:"OEM-Quality Filters",      desc:"Engine, oil, and air filters that meet or exceed original manufacturer specifications for every make and model." },
  { icon:"fa-wrench",        title:"Brake Components",         desc:"Brake pads, rotors, calipers, and fluid from trusted manufacturers — installed and tested on-site by our technicians." },
  { icon:"fa-battery-full",  title:"Batteries",                desc:"Long-lasting batteries from top manufacturers with warranty — tested, installed, and old battery disposed of responsibly." },
  { icon:"fa-recycle",       title:"Eco-Friendly Disposal",    desc:"All used oil, tires, and parts are disposed of in an environmentally responsible manner in compliance with California regulations." },
];

const steps = [
  { label:"Inspect",  desc:"We diagnose exactly what parts your vehicle needs." },
  { label:"Source",   desc:"We supply quality parts from our fully stocked trucks." },
  { label:"Install",  desc:"Parts installed correctly by our certified technicians." },
  { label:"Verify",   desc:"Job tested and verified before we leave your location." },
];

export default function QualityParts() {
  return (
    <ServiceInfoPage
      icon="fa-certificate"
      badge="PARTS"
      title="Quality Parts & Oils"
      subtitle="Top Brands You Trust"
      heroDesc="We never compromise on quality. Every tire, oil, filter, and part we use comes from trusted brands you already know. Our trucks carry a wide selection so most jobs are completed in a single visit — no waiting, no ordering, no delays."
      cards={cards}
      steps={steps}
      ctaTitle="Need Quality Parts Installed?"
      ctaDesc="We bring the right parts to you — no shop visit needed."
    />
  );
}
