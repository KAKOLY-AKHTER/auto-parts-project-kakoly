import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-tire",           title:"Flat Tire Change",         desc:"Blowout or slow leak — we replace your flat with a new or quality used tire from our onboard inventory. Any location." },
  { icon:"fa-rotate",         title:"Tire Rotation",            desc:"Extend the life of your tires with a proper rotation. We do it on-site at your home, business, or job site." },
  { icon:"fa-circle-dot",     title:"Tire Repair & Plug",       desc:"Nail or screw in the tread? We plug and patch repairable tires on-site to get you rolling without replacing the tire." },
  { icon:"fa-truck",          title:"Commercial Truck Tires",   desc:"Semi-trucks, box trucks, trailers — we carry commercial-grade tires and service all sizes on-site, 24/7." },
  { icon:"fa-trailer",        title:"Trailer Tire Service",     desc:"Utility trailers, enclosed trailers, flatbeds — we handle trailer tire changes and repairs wherever they're parked." },
  { icon:"fa-magnifying-glass",title:"Tire Inspection",        desc:"Not sure about your tire's condition? We perform a thorough inspection and give you an honest, expert recommendation." },
];

const steps = [
  { label:"Call or Schedule",    desc:"Call, text, or book online. Tell us your tire issue and location." },
  { label:"We Match Your Tire",  desc:"We confirm your vehicle's tire size and find the right fit from our inventory." },
  { label:"We Come to You",      desc:"Our truck arrives at your location with the tire and all equipment needed." },
  { label:"Mounted & Rolling",   desc:"New tire mounted, inflated, and torqued to spec. You're back on the road." },
];

const features = [
  { icon:"fa-certificate",    label:"Top Brand Tires",          detail:"Michelin, Bridgestone, Goodyear, Cooper, and more." },
  { icon:"fa-truck",          label:"Mobile Service — We Come", detail:"No shop visit needed. We bring the tires to you." },
  { icon:"fa-clock",          label:"24/7 Availability",        detail:"Flat at midnight? We're available and dispatching." },
  { icon:"fa-tag",            label:"Fair & Transparent Pricing",detail:"Full quote upfront. No hidden fees or markups." },
  { icon:"fa-users",          label:"Experienced Technicians",  detail:"Techs trained on all vehicle types including commercial." },
  { icon:"fa-recycle",        label:"Old Tire Disposal",        detail:"We remove and dispose of your old tire responsibly." },
];

export default function TireService() {
  return (
    <ServiceInfoPage
      icon="fa-tire"
      title="Tire Service & Repair"
      subtitle="Truck • Trailer • Auto — New & Used Tires"
      heroDesc="Whether you need a flat changed at 3 AM, a commercial truck tire replaced on a job site, or a full set mounted at your home — 24HR Fremont Tire delivers expert mobile tire service to any location, any time of day or night."
      heroImg="/tire-repair-service.png"
      sectionImg="/red-tire2.png"
      highlights={["Flat Tire Change","Tire Rotation","Commercial Trucks","Trailers"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Tire Problem? We're on the Way."
      ctaDesc="Call us now and a technician with the right tire will be dispatched to your location immediately."
      ctaImg="/tire-repair-service.png"
    />
  );
}
