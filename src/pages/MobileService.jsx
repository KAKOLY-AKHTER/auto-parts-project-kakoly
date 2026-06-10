import ServicePageBase from "./ServicePageBase";

const services = [
  { icon:"fa-home",           title:"At Your Home",         desc:"Schedule service at your driveway. No need to take time off work or sit in a waiting room." },
  { icon:"fa-building",       title:"At Your Business",     desc:"Fleet or company vehicles serviced at your lot — minimal downtime, maximum convenience." },
  { icon:"fa-hard-hat",       title:"At Job Sites",         desc:"We service heavy equipment and work trucks right on your job site — keeping your crew moving." },
  { icon:"fa-road",           title:"Roadside Anywhere",    desc:"Stuck on the freeway or a side street? We come to wherever you are in the Fremont area." },
  { icon:"fa-truck",          title:"Fleet Yards",          desc:"Regular fleet maintenance visits keep your vehicles road-ready without pulling them out of service." },
  { icon:"fa-clock",          title:"Flexible Scheduling",  desc:"Same-day, next-day, or pre-scheduled — we work around your timeline, not ours." },
];

const process = [
  { step:"1", title:"Tell Us Where",   desc:"Share your address, parking lot, or drop a pin — we find you." },
  { step:"2", title:"Pick a Time",     desc:"Same-day or scheduled — your choice. We show up on time." },
  { step:"3", title:"We Come Equipped",desc:"Our mobile units carry tools, parts, and oils for most services." },
  { step:"4", title:"Job Done",        desc:"Service complete, invoice sent — zero hassle on your end." },
];

export default function MobileService() {
  return (
    <ServicePageBase
      icon="fa-location-dot"
      badge="We Come To You"
      title="Mobile Service at Your Location"
      subtitle="Home · Business · Job Site · Roadside"
      description="Why drive to a shop when the shop comes to you? Our fully equipped mobile service trucks bring professional tire, oil change, and auto services directly to your door — home, business, job site, or roadside."
      heroImg="/roadside-assistance.png"
      services={services}
      process={process}
    />
  );
}
