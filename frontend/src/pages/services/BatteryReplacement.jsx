import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-battery-half",    title:"Battery Load Testing",        desc:"We test cold cranking amps, reserve capacity, and state of charge — so we only replace if your battery is genuinely failing." },
  { icon:"fa-bolt",            title:"Battery Replacement",         desc:"We source and install the correct group-size battery for your vehicle, matching OEM specs for voltage, CCA, and terminal placement." },
  { icon:"fa-plug",            title:"Charging System Check",       desc:"A new battery won't last if the alternator isn't charging properly. We test the full charging system with every battery service." },
  { icon:"fa-spray-can",       title:"Terminal Cleaning",           desc:"Corroded terminals cause poor contact and premature failure. We clean and treat terminals with anti-corrosion compound." },
  { icon:"fa-cable-car",       title:"Battery Cable Inspection",    desc:"Frayed or cracked cables cause hard starts and electrical faults. We inspect and replace damaged cables on the spot." },
  { icon:"fa-car-battery",     title:"Jump Start Service",          desc:"Dead battery right now? We jump-start your vehicle immediately and replace the battery on-site if needed." },
];

const steps = [
  { label:"Call for Battery Help",     desc:"Slow crank, no start, or warning light — tell us your symptoms and location." },
  { label:"We Come Immediately",       desc:"Mobile unit arrives with a battery tester and full battery inventory." },
  { label:"Test Before We Replace",    desc:"We load-test your battery first. We only replace if it's genuinely failing." },
  { label:"Installed & Verified",      desc:"New battery installed, terminals treated, charging system confirmed good." },
];

const features = [
  { icon:"fa-certificate",    label:"Top Brand Batteries",         detail:"AC Delco, Optima, Interstate — correct group size for your vehicle." },
  { icon:"fa-magnifying-glass",label:"Test Before Replace",        detail:"We never swap a battery that still has life in it." },
  { icon:"fa-truck",          label:"Mobile — On-Site Service",    detail:"Driveway, parking lot, roadside — wherever you need us." },
  { icon:"fa-clock",          label:"24/7 Emergency Service",      detail:"Dead battery at midnight? We're dispatching right now." },
  { icon:"fa-plug",           label:"Charging System Verified",    detail:"We check the alternator so your new battery lasts." },
  { icon:"fa-car",            label:"All Makes & Models",          detail:"Import, domestic, hybrid-compatible — every vehicle type." },
];

export default function BatteryReplacement() {
  return (
    <ServiceInfoPage
      icon="fa-battery-half"
      title="Battery Replacement"
      subtitle="Test • Replace • Charging System Check"
      heroDesc="A dead or failing battery can leave you stranded anywhere. 24HR Fremont Tire offers fast, on-site battery testing and replacement — we come to your location with the right battery for your vehicle and get you started in minutes."
      heroImg="https://images.unsplash.com/photo-qRw3qTGLL6Q?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-aK9U0mmqo1U?auto=format&fit=crop&w=800&q=80"
      highlights={["Battery Testing","On-Site Replacement","Alternator Check","24/7 Service"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Dead Battery? We're On the Way."
      ctaDesc="Call now — we'll test, replace, and verify your charging system on-site. Any location, any time."
      ctaImg="https://images.unsplash.com/photo-qRw3qTGLL6Q?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
