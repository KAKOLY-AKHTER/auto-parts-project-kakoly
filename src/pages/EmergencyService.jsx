import ServicePageBase from "./ServicePageBase";

const services = [
  { icon:"fa-bolt",          title:"Flat Tire Change",      desc:"Stuck on the road with a flat? We dispatch a tech to your exact location fast — 24 hours a day, 7 days a week." },
  { icon:"fa-battery-full",  title:"Dead Battery Jump",     desc:"Battery won't start? We'll jump-start or replace your battery on-site, getting you back on the road in minutes." },
  { icon:"fa-gas-pump",      title:"Fuel Delivery",         desc:"Ran out of gas? We deliver fuel directly to you so you're not stranded. No towing required." },
  { icon:"fa-lock-open",     title:"Lockout Service",       desc:"Locked your keys inside? Our techs can help you regain access to your vehicle quickly and safely." },
  { icon:"fa-wrench",        title:"On-Site Minor Repairs", desc:"Minor mechanical issues keeping you stuck? We handle basic roadside repairs to get you moving again." },
  { icon:"fa-phone",         title:"24/7 Dispatch",         desc:"Our team is always on call. One call or text gets a certified technician heading your way — no waiting until morning." },
];

const process = [
  { step:"1", title:"Call or Text",    desc:"Reach us at (415) 634-7777 any time — day or night. Explain your situation and location." },
  { step:"2", title:"We Dispatch",     desc:"A certified tech is dispatched immediately to your GPS location." },
  { step:"3", title:"Fast Arrival",    desc:"We arrive quickly with the tools and parts needed to resolve your emergency." },
  { step:"4", title:"Back on Road",    desc:"Problem solved. You're moving again — safe and stress-free." },
];

export default function EmergencyService() {
  return (
    <ServicePageBase
      icon="fa-bolt"
      badge="24/7 Available"
      title="Emergency Roadside Service"
      subtitle="We're There When You Need Us Most"
      description="Flat tire, dead battery, locked out — whatever the emergency, our mobile techs come to you. Available 24 hours a day, 7 days a week. No tow needed. Fast, reliable, professional."
      heroImg="/truck-tire-change.png"
      services={services}
      process={process}
    />
  );
}
