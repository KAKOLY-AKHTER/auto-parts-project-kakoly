import ServicePageBase from "./ServicePageBase";

const services = [
  { icon:"fa-stopwatch",       title:"Rapid Dispatch",        desc:"The moment you call, our nearest available tech is dispatched to your location — no hold queues or call centers." },
  { icon:"fa-map-location-dot",title:"GPS Tracking",          desc:"Know exactly when your tech will arrive. We send real-time updates so you're never left guessing." },
  { icon:"fa-toolbox",         title:"Fully Stocked Trucks",  desc:"Our mobile units carry the most common tires, oils, filters, and tools — so we fix it on the first visit." },
  { icon:"fa-shield-halved",   title:"Certified Technicians", desc:"Every tech is trained, certified, and background-checked. You get a professional, not a stranger." },
  { icon:"fa-star",            title:"Quality Guaranteed",    desc:"Not happy with the service? We make it right — no questions, no hassle. Your satisfaction is our promise." },
  { icon:"fa-clock",           title:"24/7 Availability",     desc:"Mornings, nights, weekends, holidays — we're always on. Emergencies don't wait, and neither do we." },
];

const process = [
  { step:"1", title:"You Call",        desc:"One call to (415) 634-7777 connects you directly to dispatch — no phone trees." },
  { step:"2", title:"Immediate Send",  desc:"The closest tech is dispatched right away with your location pinned." },
  { step:"3", title:"Updates Sent",    desc:"You receive an ETA and live progress so you always know where we are." },
  { step:"4", title:"Problem Solved",  desc:"Tech arrives, completes the job, and confirms you're satisfied before leaving." },
];

export default function FastResponse() {
  return (
    <ServicePageBase
      icon="fa-shield-halved"
      badge="Always Ready"
      title="Fast Response Mobile Service"
      subtitle="Reliable Service You Can Count On"
      description="When something goes wrong, every minute counts. Our fast-response mobile team is on standby 24/7 — dispatched immediately, arriving quickly, and equipped to handle the job on-site. No delays. No excuses."
      heroImg="/truck-tire-change.png"
      services={services}
      process={process}
    />
  );
}
