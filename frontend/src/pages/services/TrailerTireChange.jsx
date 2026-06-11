import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-trailer",         title:"Semi Trailer Tire Service",     desc:"18-wheeler trailers, enclosed semi trailers, flatbeds — we carry commercial-grade trailer tires and service all axle positions on-site." },
  { icon:"fa-caravan",         title:"Utility & Cargo Trailer Tires", desc:"Light utility trailers, cargo trailers, enclosed box trailers — we change and repair tires for all trailer types at your location." },
  { icon:"fa-temperature-low", title:"Reefer Trailer Service",        desc:"Refrigerated trailer down? We service reefer trailer tires on-site to minimize temperature exposure and product loss." },
  { icon:"fa-triangle-exclamation", title:"Emergency Blowout Service",desc:"Blown trailer tire on the highway or at a loading dock? We dispatch 24/7 and get your trailer rolling again with minimal delay." },
  { icon:"fa-arrows-rotate",   title:"Trailer Tire Rotation",         desc:"Regular rotation keeps wear even across all trailer axles, extending tire life and reducing costly roadside breakdowns." },
  { icon:"fa-clipboard-check", title:"Pre-Trip Tire Inspection",      desc:"Heading out for a long haul? We do a full trailer tire inspection and pressure check to ensure you're road-legal and safe." },
];

const steps = [
  { label:"Call with Trailer Details",   desc:"Tell us your trailer type, location, and the tire position that needs service." },
  { label:"We Come to Your Location",    desc:"Our mobile truck arrives with trailer-spec tires and all mounting equipment." },
  { label:"Tire Changed On-Site",        desc:"Old tire removed, new tire mounted, balanced, and torqued to spec on-site." },
  { label:"Inspected & Cleared",         desc:"Full axle checked, inflation verified, and trailer cleared for road departure." },
];

const features = [
  { icon:"fa-trailer",         label:"All Trailer Types Covered",    detail:"Semi, utility, cargo, flatbed, reefer, enclosed — every type." },
  { icon:"fa-clock",           label:"24/7 Emergency Dispatch",      detail:"Trailer blowout at 2 AM? We're answering and dispatching." },
  { icon:"fa-location-dot",    label:"Any Location",                 detail:"Yard, dock, highway shoulder, job site — we come to you." },
  { icon:"fa-certificate",     label:"Commercial-Grade Tires",       detail:"Proper trailer-spec tires that meet DOT and load requirements." },
  { icon:"fa-tag",             label:"Fleet-Friendly Pricing",       detail:"Competitive flat rates for owner-operators and large fleets." },
  { icon:"fa-shield-halved",   label:"DOT-Compliant Service",        detail:"All work performed to DOT safety and torque specifications." },
];

export default function TrailerTireChange() {
  return (
    <ServiceInfoPage
      icon="fa-trailer"
      title="Trailer Tire Change"
      subtitle="Semi • Utility • Cargo • Flatbed • Reefer"
      heroDesc="A blown trailer tire doesn't just slow you down — it can ground your entire load. 24HR Fremont Tire provides fast, professional mobile trailer tire service for all trailer types, at your yard, dock, or roadside location, 24 hours a day."
      heroImg="https://images.unsplash.com/photo-nMYHlYfvNsY?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-D4Kulx4h8GQ?auto=format&fit=crop&w=800&q=80"
      highlights={["Semi Trailers","Utility Trailers","Reefer Trailers","24/7 Emergency"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Trailer Tire Down? Call Now."
      ctaDesc="We dispatch immediately to your yard, dock, or highway location with the right trailer tire. Any time, any type."
      ctaImg="https://images.unsplash.com/photo-nMYHlYfvNsY?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
