import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-certificate",   title:"Top Brand Tires",          desc:"Michelin, Bridgestone, Goodyear, Cooper, and more — new and quality-used tires for all vehicle types and budgets, onboard every truck." },
  { icon:"fa-flask",         title:"Premium Motor Oils",       desc:"Full synthetic, synthetic blend, and conventional motor oils from Mobil 1, Castrol, Pennzoil, and Valvoline. Right spec for every engine." },
  { icon:"fa-filter",        title:"OEM-Quality Filters",      desc:"Engine, oil, and air filters that meet or exceed original manufacturer specs — for every make and model we service." },
  { icon:"fa-wrench",        title:"Brake Components",         desc:"Pads, rotors, calipers, and brake fluid from trusted manufacturers — installed and tested on-site by our certified techs." },
  { icon:"fa-battery-full",  title:"Long-Life Batteries",      desc:"Premium batteries with warranty coverage — tested, installed on-site, and old battery disposed of responsibly." },
  { icon:"fa-recycle",       title:"Eco-Friendly Disposal",    desc:"All used oil, tires, and parts disposed of in compliance with California environmental regulations — every time." },
];

const steps = [
  { label:"Diagnose First",   desc:"We inspect your vehicle and identify exactly what parts are needed." },
  { label:"Source On-Truck",  desc:"We supply quality parts from our fully stocked mobile trucks on-site." },
  { label:"Install Correctly",desc:"Parts installed by certified techs to manufacturer specifications." },
  { label:"Test & Verify",    desc:"Job tested and verified — we confirm everything works before we leave." },
];

const features = [
  { icon:"fa-certificate",    label:"Name Brands Only",          detail:"Michelin, Mobil 1, Castrol, Goodyear — no off-brand shortcuts." },
  { icon:"fa-truck",          label:"Parts Onboard Every Truck", detail:"Most jobs completed in one visit from our stocked trucks." },
  { icon:"fa-shield-halved",  label:"OEM or Better Standards",   detail:"Every part meets or exceeds original manufacturer specs." },
  { icon:"fa-recycle",        label:"Responsible Disposal",      detail:"Used parts and fluids disposed of per California law." },
  { icon:"fa-tag",            label:"No Markup Surprises",       detail:"Part costs quoted upfront — what we quote is what you pay." },
  { icon:"fa-star",           label:"Quality Guaranteed",        detail:"If a part fails early, we make it right — no questions asked." },
];

export default function QualityParts() {
  return (
    <ServiceInfoPage
      icon="fa-certificate"
      title="Quality Parts & Oils"
      subtitle="Top Brands You Trust — Always"
      heroDesc="We never cut corners on quality. Every tire, oil, filter, and part we install comes from the top brands you already trust. Our trucks carry a wide selection so most jobs are completed in a single visit — no waiting, no delays."
      heroImg="/oil-change-service.png"
      sectionImg="/oil-change.png"
      highlights={["Michelin • Bridgestone","Mobil 1 • Castrol","OEM-Quality Filters","Eco-Friendly Disposal"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Only the Best for Your Vehicle"
      ctaDesc="We bring top-brand parts and oils directly to you. No shop visit needed — quality service at your location."
      ctaImg="/oil-change-service.png"
    />
  );
}
