import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-truck",          title:"Commercial Flat Tire Change",   desc:"Blowout on the highway or job site? We dispatch immediately with the right commercial tire size and change it on-site, 24/7." },
  { icon:"fa-circle-dot",     title:"Steer Axle Tire Service",       desc:"Steer tires require precision installation. We use proper torque specs and inflation settings for safe, compliant steer axle service." },
  { icon:"fa-rotate",         title:"Drive Axle Tire Service",       desc:"Dual rear drive axle tires serviced, rotated, or replaced on-site. We stock the most common commercial drive axle sizes." },
  { icon:"fa-weight-scale",   title:"Mounting & Balancing",          desc:"Full mounting and balancing for drive, steer, and tag axles. Balanced commercial tires reduce vibration and extend tire life significantly." },
  { icon:"fa-arrows-rotate",  title:"Tire Rotation & Inspection",    desc:"Regular rotation extends commercial tire life and prevents uneven wear. We inspect and rotate on your schedule at your yard." },
  { icon:"fa-gauge-high",     title:"Inflation & TPMS Check",        desc:"Proper inflation on every axle is critical for safety and fuel economy. We check and set tire pressure to manufacturer spec." },
];

const steps = [
  { label:"Call with Truck Location",    desc:"Tell us your location, truck type, and axle position of the flat or tire needed." },
  { label:"We Dispatch Immediately",     desc:"Our commercial service truck rolls with the right tire size and all equipment." },
  { label:"On-Site Service",             desc:"We jack the truck, remove the old tire, mount and torque the new one to spec." },
  { label:"Inflated & Road-Ready",       desc:"Tire inflated, torqued correctly, and verified — minimal downtime for your fleet." },
];

const features = [
  { icon:"fa-truck-ramp-box",  label:"Commercial Tire Inventory",    detail:"We stock common steer, drive, and tag axle sizes on our service trucks." },
  { icon:"fa-clock",           label:"24/7 — No Downtime",           detail:"Day or night, we dispatch fast to minimize lost driving hours." },
  { icon:"fa-location-dot",    label:"Any Location",                 detail:"Highway, yard, job site, warehouse — we come wherever your truck is." },
  { icon:"fa-certificate",     label:"Top Brand Tires",              detail:"Michelin, Bridgestone, Goodyear, Continental — your choice of brand." },
  { icon:"fa-tag",             label:"Upfront Fleet Pricing",        detail:"Flat rates for fleets. No surprise charges on your invoice." },
  { icon:"fa-users",           label:"Experienced Commercial Techs", detail:"Trained on all commercial truck sizes and axle configurations." },
];

export default function TruckTireChange() {
  return (
    <ServiceInfoPage
      icon="fa-truck"
      title="Truck Tire Change"
      subtitle="Commercial • Semi • Box Truck • 24/7"
      heroDesc="Every hour your commercial truck sits idle costs money. 24HR Fremont Tire dispatches mobile commercial tire technicians to your exact location — highway, yard, or job site — with the right tires and equipment to get your truck rolling fast."
      heroImg="https://images.unsplash.com/photo-D4Kulx4h8GQ?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-nMYHlYfvNsY?auto=format&fit=crop&w=800&q=80"
      highlights={["Commercial Tires","Steer Axle","Drive Axle","24/7 Dispatch"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Truck Down? We're Rolling to You."
      ctaDesc="Call now — our commercial tire service truck will be dispatched to your location immediately, any time of day or night."
      ctaImg="https://images.unsplash.com/photo-D4Kulx4h8GQ?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
