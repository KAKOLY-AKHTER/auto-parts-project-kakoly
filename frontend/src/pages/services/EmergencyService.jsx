import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-bolt",          title:"Instant Dispatch",         desc:"One call and the nearest technician is dispatched to your exact location immediately — no hold music, no delays." },
  { icon:"fa-tire",          title:"Flat Tire Change",         desc:"Blowout or slow leak — we carry a wide range of replacement tires and repair kits for all vehicle types on every truck." },
  { icon:"fa-car-battery",   title:"Dead Battery Service",     desc:"We jump-start or replace your battery on-site with premium brands. No tow required — we come to you." },
  { icon:"fa-wrench",        title:"On-Site Repairs",          desc:"Minor mechanical breakdowns handled roadside. Our trucks carry tools and common parts to fix many issues on the spot." },
  { icon:"fa-lock-open",     title:"Vehicle Lockout",          desc:"Locked out of your vehicle? We coordinate fast lockout assistance so you regain access without damage." },
  { icon:"fa-phone-volume",  title:"24/7 Live Answering",      desc:"A real person answers every call around the clock — including nights, weekends, and holidays. No voicemail, ever." },
];

const steps = [
  { label:"Call Us",          desc:"Dial (415) 634-7777 any time. A live dispatcher answers immediately." },
  { label:"Share Location",   desc:"Tell us where you are or drop a pin. We track your GPS for fastest arrival." },
  { label:"Truck Dispatched", desc:"The nearest fully equipped truck heads to you right away." },
  { label:"Problem Solved",   desc:"Technician arrives fast, fixes the issue on-site. You're rolling again." },
];

const features = [
  { icon:"fa-clock",          label:"True 24/7 Availability",   detail:"We answer every call — day, night, weekends, and holidays." },
  { icon:"fa-map-marker-alt", label:"On-Site, No Tow Needed",   detail:"We come directly to your car — highway, parking lot, or driveway." },
  { icon:"fa-shield-halved",  label:"Certified Technicians",    detail:"Every tech is background-checked, trained, and certified." },
  { icon:"fa-tag",            label:"Upfront, Honest Pricing",  detail:"Full price quoted before we start. Zero hidden fees." },
  { icon:"fa-star",           label:"5-Star Rated Service",     detail:"Hundreds of verified 5-star reviews from Fremont customers." },
  { icon:"fa-truck",          label:"Fully Equipped Trucks",    detail:"Tools, tires, oils, batteries — everything onboard every truck." },
];

export default function EmergencyService() {
  return (
    <ServiceInfoPage
      icon="fa-clock"
      title="24/7 Emergency Service"
      subtitle="Day or Night, We're Here"
      heroDesc="Flat tire on the freeway at 2 AM? Dead battery in a parking lot? Whatever the roadside emergency, 24HR Fremont Tire dispatches a certified technician directly to you — fast, professional, and available around the clock."
      heroImg="/roadside-assistance.png"
      sectionImg="/truck-tire-change.png"
      highlights={["24/7 Availability","No Tow Needed","Fast Dispatch","Certified Techs"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Emergency? Call Right Now."
      ctaDesc="We answer every call 24 hours a day, 7 days a week including holidays. One call and we're on our way."
      ctaImg="/roadside-assistance.png"
    />
  );
}
