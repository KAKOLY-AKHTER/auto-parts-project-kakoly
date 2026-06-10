import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-shield-check",   title:"Work Guaranteed",          desc:"Every service we perform comes with a satisfaction guarantee. If you're not happy with the result, we'll come back and make it right." },
  { icon:"fa-star",           title:"5-Star Service",           desc:"We've built our reputation on 5-star reviews from real customers. Our goal is to earn your trust on every single call." },
  { icon:"fa-redo",           title:"Free Return Visits",       desc:"If an issue persists after our service, we return at no additional charge. We don't walk away until the job is done correctly." },
  { icon:"fa-comment-dots",   title:"Transparent Communication",desc:"We explain everything we find, everything we do, and everything you should know — clearly, honestly, and without jargon." },
  { icon:"fa-clock",          title:"On-Time Arrival",          desc:"We respect your time. Our technicians arrive when we say they will — with real-time updates so you're never left wondering." },
  { icon:"fa-heart",          title:"We Care About You",        desc:"We're a local business built on community trust. Your safety, satisfaction, and experience matter deeply to every person on our team." },
];

const steps = [
  { label:"Book Service",     desc:"Schedule by phone, text, or online — easy and fast." },
  { label:"We Show Up",       desc:"Technician arrives on time, ready to work." },
  { label:"Job Done Right",   desc:"Quality service performed with care and precision." },
  { label:"You're Satisfied", desc:"We follow up to make sure everything is perfect." },
];

export default function Satisfaction() {
  return (
    <ServiceInfoPage
      icon="fa-handshake"
      badge="GUARANTEE"
      title="Satisfaction Guaranteed"
      subtitle="We Stand Behind Every Job"
      heroDesc="Your satisfaction is not optional — it's the standard. From the moment you call to the moment we leave your location, we are committed to delivering service that exceeds your expectations. If you're not satisfied, we're not done."
      cards={cards}
      steps={steps}
      ctaTitle="Experience the Difference"
      ctaDesc="Thousands of satisfied customers across Fremont, CA trust us. Join them today."
    />
  );
}
