import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-house",         title:"At Your Home",             desc:"Schedule service at your driveway. We show up at your convenience — no need to drive anywhere or wait at a shop." },
  { icon:"fa-building",      title:"At Your Business",         desc:"Fleet vehicles, company trucks, employee cars — we service them at your business during your working hours." },
  { icon:"fa-hard-hat",      title:"Job Sites",                desc:"Construction, industrial, remote locations — we come wherever your vehicles are parked and get work done on-site." },
  { icon:"fa-road",          title:"Highway & Roadside",       desc:"Stranded on the freeway? We locate you via GPS and dispatch immediately — 24 hours a day, 7 days a week." },
  { icon:"fa-trailer",       title:"Trucks & Trailers",        desc:"Semi-trucks, box trucks, flatbeds, trailers — our heavy-duty service trucks handle commercial vehicles anywhere." },
  { icon:"fa-calendar-check",title:"Flexible Scheduling",      desc:"Same-day, next-day, or pre-scheduled appointments. We work around your timeline, not the other way around." },
];

const steps = [
  { label:"Book Online or Call",   desc:"Schedule by phone, text, or contact form — available 24/7." },
  { label:"Confirm Your Location", desc:"Give us your address, GPS pin, or job site details." },
  { label:"We Come to You",        desc:"Our tech arrives at your location with a fully equipped truck." },
  { label:"Job Done On-Site",      desc:"Service completed where you are. No shop visit, no hassle." },
];

const features = [
  { icon:"fa-map-marker-alt", label:"Any Location, Any Time",  detail:"Home, office, job site, highway — we cover all of Fremont area." },
  { icon:"fa-truck",          label:"Rolling Garage Trucks",   detail:"Every truck is a fully equipped mobile workshop." },
  { icon:"fa-users",          label:"Certified Technicians",   detail:"All techs are trained, certified, and background-checked." },
  { icon:"fa-tag",            label:"Upfront Pricing",         detail:"Full quote before we start. Zero hidden fees." },
  { icon:"fa-clock",          label:"Same-Day Availability",   detail:"We often have same-day slots open — just call." },
  { icon:"fa-star",           label:"Satisfaction Guaranteed", detail:"We don't leave until you're 100% satisfied." },
];

export default function MobileService() {
  return (
    <ServiceInfoPage
      icon="fa-location-dot"
      title="We Come To You"
      subtitle="Mobile Service — Anywhere You Are"
      heroDesc="Skip the shop. 24HR Fremont Tire brings professional tire and auto service directly to your home, business, job site, or roadside location. Our fully equipped trucks are your mobile garage — ready wherever you need us."
      heroImg="/truck-tire-change.png"
      sectionImg="/mobile-mechanic.png"
      highlights={["Home & Business","Job Sites","Highway Roadside","Trucks & Trailers"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="We'll Come to You Today"
      ctaDesc="Book a mobile service appointment and our technician will come to your location — same day available."
      ctaImg="/truck-tire-change.png"
    />
  );
}
