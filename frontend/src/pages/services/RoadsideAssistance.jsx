import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-circle-dot",      title:"Emergency Tire Change",        desc:"Flat or blowout anywhere on the road. We dispatch immediately with the right tire size for your car, truck, or SUV — 24/7." },
  { icon:"fa-bolt",            title:"Jump Start Service",           desc:"Dead battery leaving you stranded? We arrive fast, jump-start your vehicle, and replace the battery on-site if needed." },
  { icon:"fa-key",             title:"Vehicle Lockout Service",      desc:"Locked your keys inside? We use professional, non-destructive tools to get you back into your vehicle quickly and safely." },
  { icon:"fa-gas-pump",        title:"Emergency Fuel Delivery",      desc:"Ran out of gas? We deliver enough fuel to get you to the nearest station — available for gasoline and diesel vehicles." },
  { icon:"fa-oil-can",         title:"Roadside Oil Change",          desc:"Need an oil change but stuck on the road? We carry oil and filters on every service call and can handle it on-site." },
  { icon:"fa-wrench",          title:"Minor Roadside Repairs",       desc:"Belts, hoses, loose connections, or minor mechanical issues — if it can be fixed roadside, we'll fix it before we leave." },
];

const steps = [
  { label:"Call Us — We Answer 24/7",    desc:"Describe your situation and exact location. We confirm ETA immediately." },
  { label:"We Dispatch Right Away",       desc:"Nearest available technician is dispatched to your GPS location with all equipment." },
  { label:"On-Site Assessment",          desc:"We assess the issue on arrival and give you a clear, honest recommendation." },
  { label:"Fixed & Back on the Road",    desc:"We resolve the problem on-site so you can continue your journey safely." },
];

const features = [
  { icon:"fa-clock",           label:"True 24/7 Service",            detail:"Midnight, holidays, weekends — someone always answers." },
  { icon:"fa-location-dot",    label:"GPS Dispatch to Your Location",detail:"We find you anywhere — highway, parking lot, or backroads." },
  { icon:"fa-bolt",            label:"Fast Response Time",           detail:"Our goal is to reach you within 30–45 minutes." },
  { icon:"fa-car",             label:"All Vehicle Types",            detail:"Passenger cars, SUVs, pickups, vans, and light commercial." },
  { icon:"fa-tag",             label:"Upfront Pricing",              detail:"We quote before we start. No hidden fees after the fact." },
  { icon:"fa-shield-halved",   label:"Licensed & Insured",           detail:"Every technician is licensed, insured, and background-checked." },
];

export default function RoadsideAssistance() {
  return (
    <ServiceInfoPage
      icon="fa-road"
      title="Roadside Assistance"
      subtitle="Flat Tire • Jump Start • Lockout • Fuel"
      heroDesc="Getting stranded is stressful. 24HR Fremont Tire provides fast, professional roadside assistance for any situation — flat tires, dead batteries, lockouts, or fuel delivery — dispatching to your exact location 24 hours a day, 7 days a week."
      heroImg="https://images.unsplash.com/photo-jpsT7gAnP-c?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-qlx6GLKvgHw?auto=format&fit=crop&w=800&q=80"
      highlights={["Flat Tire Change","Jump Start","Lockout Help","Fuel Delivery"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Stranded? We're On the Way."
      ctaDesc="Call now — a technician will be dispatched to your exact location immediately. We're available 24 hours a day, every day."
      ctaImg="https://images.unsplash.com/photo-jpsT7gAnP-c?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
