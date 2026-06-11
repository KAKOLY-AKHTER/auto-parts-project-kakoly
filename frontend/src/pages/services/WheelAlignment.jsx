import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-ruler-combined",  title:"Computerized Alignment Check",  desc:"We use precision digital equipment to measure your camber, caster, and toe angles and compare against your vehicle's factory spec." },
  { icon:"fa-arrow-right-arrow-left", title:"Front-End Alignment",    desc:"Adjusts the front wheels to ensure they're pointing the right direction — corrects pulling, uneven wear, and drifting." },
  { icon:"fa-circle-dot",      title:"Four-Wheel Alignment",          desc:"Full alignment on all four wheels for vehicles with independent rear suspension — the gold standard for handling and maximum tire life." },
  { icon:"fa-rotate",          title:"Thrust Angle Correction",       desc:"Ensures the rear axle is square to the vehicle centerline — fixes dog-tracking, sideways drift, and off-center steering." },
  { icon:"fa-steering-wheel",  title:"Steering Wheel Centering",      desc:"We center your steering wheel as part of every alignment so it sits straight when the vehicle drives in a straight line." },
  { icon:"fa-file-lines",      title:"Alignment Report Provided",     desc:"We test-drive after every alignment and provide a printed before/after report showing all measured angles." },
];

const steps = [
  { label:"Call or Schedule",       desc:"Tell us your symptoms: pulling, vibration, uneven tire wear, or crooked steering wheel." },
  { label:"We Come to You",         desc:"Our equipped truck arrives with alignment tools and measurement equipment." },
  { label:"Measure & Adjust",       desc:"We check all angles against factory specs and make precise adjustments." },
  { label:"Test-Drive & Confirm",   desc:"We verify alignment with a test drive and give you a full before/after printout." },
];

const features = [
  { icon:"fa-microchip",      label:"Digital Alignment Equipment",  detail:"Precision computerized measurement for accurate angle readings." },
  { icon:"fa-car",            label:"All Suspension Types",         detail:"Independent front, solid axle, independent rear — all handled." },
  { icon:"fa-truck",          label:"Mobile Service",               detail:"We come to you — no need to visit an alignment shop." },
  { icon:"fa-clock",          label:"Fast Service",                 detail:"Most alignments completed in 45–60 minutes on-site." },
  { icon:"fa-circle-dot",     label:"Tire Life Extended",           detail:"Proper alignment can extend tire life by up to 25%." },
  { icon:"fa-tag",            label:"Upfront Pricing",              detail:"Full quote before we start. No hidden charges." },
];

export default function WheelAlignment() {
  return (
    <ServiceInfoPage
      icon="fa-rotate"
      title="Wheel Alignment Service"
      subtitle="Front-End • Four-Wheel • Thrust Angle"
      heroDesc="Misaligned wheels wear your tires faster, cause your vehicle to pull, and make driving exhausting. 24HR Fremont Tire uses precision computerized alignment equipment to restore your vehicle's factory-spec handling — at your location."
      heroImg="https://images.unsplash.com/photo-7QDVDZ_vj1g?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo--FP8yZSbWgQ?auto=format&fit=crop&w=800&q=80"
      highlights={["Front-End Alignment","Four-Wheel Alignment","Thrust Angle","Steering Centering"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Drive Straight. Drive Safe."
      ctaDesc="Book a wheel alignment today and protect your tires, suspension, and steering — we come to your location."
      ctaImg="https://images.unsplash.com/photo-7QDVDZ_vj1g?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
