import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-flask",        title:"Full Synthetic Oil",        desc:"Maximum engine protection and performance. Ideal for high-mileage vehicles, turbocharged engines, and extreme conditions." },
  { icon:"fa-vial",         title:"Synthetic Blend",           desc:"A balance of conventional and synthetic. Great protection at a more affordable price point for everyday vehicles." },
  { icon:"fa-oil-can",      title:"Conventional Oil",         desc:"Standard motor oil for older vehicles or those with low mileage. Quick, affordable, and effective." },
  { icon:"fa-filter",       title:"Filter Replacement",        desc:"We replace the oil filter with every change — OEM-quality filters that protect your engine from contaminants." },
  { icon:"fa-gauge-high",   title:"Multi-Point Inspection",    desc:"Every oil change includes a complimentary multi-point inspection — fluid levels, tire pressure, and visible wear items." },
  { icon:"fa-droplet",      title:"Fluid Top-Off",             desc:"We top off windshield washer fluid, coolant, and other accessible fluids as part of our standard oil change service." },
];

const steps = [
  { label:"Schedule Service",    desc:"Call, text, or book online. We come to your location." },
  { label:"Oil & Filter Drained",desc:"Old oil and filter are safely removed and disposed of properly." },
  { label:"Fresh Oil Installed", desc:"New oil and filter installed to your vehicle's manufacturer spec." },
  { label:"Inspection & Report", desc:"Multi-point check completed. We share a brief report with you." },
];

const features = [
  { icon:"fa-certificate",    label:"Top Brand Oils",          detail:"Mobil 1, Castrol, Pennzoil, Valvoline — your choice." },
  { icon:"fa-recycle",        title:"Eco-Friendly Disposal",   label:"Eco-Friendly Disposal",  detail:"Used oil disposed of responsibly per California regulations." },
  { icon:"fa-truck",          label:"Mobile — We Come to You", detail:"No need to drive to a shop. We do it at your location." },
  { icon:"fa-tag",            label:"Flat-Rate Pricing",       detail:"No surprises. Full price quoted upfront before we start." },
  { icon:"fa-clock",          label:"Quick Service",           detail:"Most oil changes completed in under 30 minutes on-site." },
  { icon:"fa-shield-halved",  label:"Certified Technicians",   detail:"Licensed techs who know exactly what your engine needs." },
];

export default function OilChange() {
  return (
    <ServiceInfoPage
      icon="fa-oil-can"
      title="Oil Change Service"
      subtitle="Full Synthetic • Synthetic Blend • Conventional"
      heroDesc="Fresh oil is the single most important thing you can do for your engine. 24HR Fremont Tire brings professional, fast oil change service directly to your location — using top-brand oils and OEM-quality filters every time."
      heroImg="/oil-change-service.png"
      sectionImg="/oil-change.png"
      highlights={["Full Synthetic","Synthetic Blend","Filter Replacement","Multi-Point Inspection"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Book Your Oil Change Today"
      ctaDesc="We come to you. No shop visit needed. Fast, professional, and done right with premium oils."
      ctaImg="/oil-change-service.png"
    />
  );
}
