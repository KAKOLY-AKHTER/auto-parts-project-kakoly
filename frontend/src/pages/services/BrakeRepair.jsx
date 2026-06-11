import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-circle-stop",   title:"Brake Pad Replacement",    desc:"Thin pads mean weak stopping power. We replace front and rear brake pads with premium OEM-quality parts, on-site at your location." },
  { icon:"fa-compact-disc",  title:"Rotor Resurfacing & Replace",desc:"Scored or warped rotors cause vibration and noise. We resurface or replace rotors to restore smooth, confident braking." },
  { icon:"fa-grip-lines",    title:"Brake Caliper Service",    desc:"Seized calipers cause uneven wear and pulling. We service or replace calipers as needed to keep braking force balanced." },
  { icon:"fa-droplet",       title:"Brake Fluid Flush",        desc:"Old, contaminated fluid reduces stopping power. We flush and replace with fresh DOT-spec fluid to restore full performance." },
  { icon:"fa-car-side",      title:"Emergency Brake Adjustment",desc:"A loose or weak parking brake leaves your vehicle at risk. We inspect, adjust, or replace the emergency brake cable on the spot." },
  { icon:"fa-magnifying-glass",title:"Full Brake Inspection",  desc:"Not sure if brakes need work? We check pads, rotors, calipers, lines, and fluid — fully, honestly, and with no pressure to upsell." },
];

const steps = [
  { label:"Call & Describe Symptoms", desc:"Squealing, grinding, vibration, or pulling — tell us what you're experiencing and your location." },
  { label:"We Come to You",           desc:"Our mobile unit arrives with brake parts, tools, and equipment for on-site repair." },
  { label:"Full Diagnosis",           desc:"We measure pad thickness, inspect rotors, calipers, fluid, and brake lines before touching anything." },
  { label:"Repaired & Road-Ready",    desc:"Brakes replaced, fluid verified, and test-checked. You're safe to drive before we leave." },
];

const features = [
  { icon:"fa-certificate",    label:"OEM-Quality Parts",          detail:"Bosch, Brembo, ACDelco — brands your vehicle deserves." },
  { icon:"fa-truck",          label:"Mobile — We Come to You",    detail:"Your driveway, parking lot, or job site. No shop needed." },
  { icon:"fa-clock",          label:"24/7 Availability",          detail:"Brake failure doesn't wait. Neither do we — day or night." },
  { icon:"fa-tag",            label:"Transparent Pricing",        detail:"We quote before we start. No surprises on your bill." },
  { icon:"fa-car",            label:"All Vehicle Types",          detail:"Cars, SUVs, trucks, and light commercial vehicles." },
  { icon:"fa-handshake",      label:"Work Guaranteed",            detail:"All brake repairs backed by our satisfaction guarantee." },
];

export default function BrakeRepair() {
  return (
    <ServiceInfoPage
      icon="fa-circle-stop"
      title="Brake Repair Service"
      subtitle="Pads • Rotors • Calipers • Fluid Flush"
      heroDesc="Brakes are your vehicle's most critical safety system. 24HR Fremont Tire delivers expert mobile brake repair directly to your home, business, or roadside — with OEM-quality parts and certified technicians available 24 hours a day."
      heroImg="https://images.unsplash.com/photo-I7VQyeSS6Oo?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-FF2IFGz2lOM?auto=format&fit=crop&w=800&q=80"
      highlights={["Brake Pads","Rotors","Calipers","Brake Fluid Flush"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Brake Problem? We're On the Way."
      ctaDesc="Don't drive on bad brakes. Call now and a certified technician will be dispatched to your location immediately."
      ctaImg="https://images.unsplash.com/photo-WuOdwlPKzAM?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
