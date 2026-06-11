import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-bolt",          title:"Rapid Dispatch",           desc:"The moment you call, our dispatcher locates the nearest available truck and sends it your way — zero delay." },
  { icon:"fa-map-marker-alt",title:"GPS-Tracked Arrival",      desc:"We track your location and our tech's route in real time so you always know exactly how far away help is." },
  { icon:"fa-toolbox",       title:"Fully Stocked Trucks",     desc:"Our trucks carry tires, oils, tools, batteries, and parts — so the job is done in one visit with no return trips." },
  { icon:"fa-headset",       title:"Live Dispatcher 24/7",     desc:"A real person answers every call. No automated menus. No voicemail. Just a fast, human response every time." },
  { icon:"fa-clock",         title:"Minimal Downtime",         desc:"We understand time is money. Our techs work efficiently to minimize your vehicle downtime and get you moving fast." },
  { icon:"fa-star",          title:"First-Time Fix Rate",      desc:"Our well-trained techs and fully equipped trucks mean the vast majority of jobs are completed correctly on the first visit." },
];

const steps = [
  { label:"You Call or Text",    desc:"Reach us at (415) 634-7777. A dispatcher picks up immediately." },
  { label:"Location Confirmed",  desc:"We confirm your exact location for the fastest possible routing." },
  { label:"Tech En Route",       desc:"Nearest available truck is dispatched and heading your way." },
  { label:"Fast Arrival & Fix",  desc:"Tech arrives quickly and completes the job on-site, first visit." },
];

const features = [
  { icon:"fa-clock",          label:"24/7 Real Availability",  detail:"Not just 'available' — actually responding at 3 AM on a Sunday." },
  { icon:"fa-location-dot",   label:"GPS Dispatch System",     detail:"We route the closest truck to your location automatically." },
  { icon:"fa-truck",          label:"Always Fully Stocked",    detail:"Every truck carries everything needed to handle most jobs." },
  { icon:"fa-user-check",     title:"Certified Techs",         label:"Certified Techs Only",   detail:"No trainees dispatched solo. Every tech is certified." },
  { icon:"fa-tag",            label:"No Hidden Overtime Fees", detail:"Our pricing is flat-rate — no surcharges for nights or weekends." },
  { icon:"fa-handshake",      label:"Satisfaction Guaranteed", detail:"We don't close the call until you're satisfied and safe." },
];

export default function FastResponse() {
  return (
    <ServiceInfoPage
      icon="fa-shield-halved"
      title="Fast Response Service"
      subtitle="Reliable Service You Can Count On"
      heroDesc="When you're stranded, every minute counts. 24HR Fremont Tire operates a GPS-dispatched fleet of fully equipped service trucks, ready to reach you faster than anyone else — day or night, anywhere in the Fremont area."
      heroImg="/roadside.png"
      sectionImg="/mobile-mechanic.png"
      highlights={["GPS Dispatch","24/7 Live Answering","First-Time Fix","No Overtime Fees"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Need Fast Help Right Now?"
      ctaDesc="Call (415) 634-7777 — a real dispatcher answers immediately and a truck is sent your way."
      ctaImg="/roadside-assistance.png"
    />
  );
}
