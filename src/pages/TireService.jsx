import ServicePageBase from "./ServicePageBase";

const services = [
  { icon:"fa-circle-dot",      title:"Tire Installation",         desc:"We mount and balance new tires on-site at your location. All vehicle types — cars, trucks, SUVs, trailers." },
  { icon:"fa-rotate",          title:"Tire Rotation",             desc:"Regular rotation extends tire life and improves handling. We rotate all four tires at your home or office." },
  { icon:"fa-wrench",          title:"Flat Tire Repair",          desc:"Nail, screw, or road debris — if the tire can be repaired safely, we patch it on-site and get you rolling." },
  { icon:"fa-truck",           title:"Truck & Trailer Tires",     desc:"Heavy-duty service for semi trucks, box trucks, trailers, and commercial vehicles. We handle big rigs too." },
  { icon:"fa-gauge",           title:"Tire Pressure Check",       desc:"Properly inflated tires save fuel and prevent blowouts. We check and adjust all four tires on every visit." },
  { icon:"fa-store",           title:"New & Used Tires",          desc:"We supply quality new and budget-friendly used tires to fit your vehicle and your wallet. Brand options available." },
];

const process = [
  { step:"1", title:"Tell Us Your Size",  desc:"Share your vehicle make, model, and year — or read the sidewall size. We source the right tire." },
  { step:"2", title:"We Bring the Tires", desc:"Tires sourced and loaded onto our truck. We come to your location with everything needed." },
  { step:"3", title:"Mount & Balance",    desc:"Old tires removed, new ones mounted and balanced for a smooth, safe ride." },
  { step:"4", title:"Drive Safe",         desc:"Torque checked, pressure set, and you're cleared to drive. Done at your driveway." },
];

export default function TireService() {
  return (
    <ServicePageBase
      icon="fa-truck"
      badge="All Vehicle Types"
      title="Mobile Tire Service"
      subtitle="Truck · Trailer · Auto · New & Used"
      description="From a single flat to a full fleet tire change — we bring professional tire service directly to you. Cars, trucks, trailers, and heavy-duty commercial vehicles. New tires, repairs, rotations, and balancing — all on-site."
      heroImg="/tire-repair-service.png"
      services={services}
      process={process}
    />
  );
}
