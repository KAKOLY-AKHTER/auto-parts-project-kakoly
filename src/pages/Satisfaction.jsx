import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-star",             title:"5-Star Rated Service",      desc:"Hundreds of verified 5-star reviews from Fremont drivers and fleet operators who trust us with their vehicles day and night." },
  { icon:"fa-redo",             title:"Free Return Visits",        desc:"If something isn't right after we leave, we come back and fix it — at no additional charge. Your satisfaction is non-negotiable." },
  { icon:"fa-comment-dots",     title:"Honest Communication",      desc:"We tell you exactly what we found and what we recommend before doing anything. No upsells, no pressure — just honest assessments." },
  { icon:"fa-clock",            title:"On-Time, Every Time",       desc:"We commit to arrival windows and stick to them. Your time is valuable — we never waste it with vague ETAs or no-shows." },
  { icon:"fa-user-check",       title:"Respectful Technicians",    desc:"Professional conduct, clean workspaces, and clear updates. Our techs treat your property and your time with full respect." },
  { icon:"fa-shield-halved",    title:"Work Guaranteed",           desc:"Every job is backed by our satisfaction guarantee — if the work doesn't hold up, we stand behind it and make it right." },
];

const steps = [
  { label:"You Reach Out",       desc:"Call or text — we listen carefully and ask the right questions." },
  { label:"Clear Quote Given",   desc:"We provide a full, honest quote before any work is scheduled." },
  { label:"Expert Service",      desc:"Certified tech arrives on time and completes the job professionally." },
  { label:"We Follow Up",        desc:"We check in after service to make sure you're completely satisfied." },
];

const features = [
  { icon:"fa-star",           label:"Verified 5-Star Reviews",    detail:"Hundreds of real customers rating our service 5 stars consistently." },
  { icon:"fa-redo",           label:"Free Return Policy",         detail:"We come back and fix it free if anything isn't right." },
  { icon:"fa-shield-halved",  label:"Satisfaction Guarantee",     detail:"Every job backed by our written satisfaction guarantee." },
  { icon:"fa-clock",          label:"On-Time Commitment",         detail:"We respect your schedule and give accurate arrival windows." },
  { icon:"fa-comment-dots",   label:"Transparent Updates",        detail:"You're informed at every stage — no surprises, ever." },
  { icon:"fa-handshake",      label:"Long-Term Relationships",    detail:"Most of our customers come back and refer friends and family." },
];

export default function Satisfaction() {
  return (
    <ServiceInfoPage
      icon="fa-star"
      title="Customer Satisfaction"
      subtitle="Our Promise — Every Single Visit"
      heroDesc="At 24HR Fremont Tire, customer satisfaction isn't just a goal — it's our standard. From honest quotes to on-time arrivals and free return visits, every part of our service is built around making sure you leave satisfied, every time."
      heroImg="/roadside-assistance.png"
      sectionImg="/mobile-mechanic.png"
      highlights={["5-Star Rated","Free Return Visits","Always On-Time","Work Guaranteed"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Experience the Difference Today"
      ctaDesc="Join hundreds of Fremont drivers who trust us for honest, professional, guaranteed mobile tire and oil service."
      ctaImg="/roadside-assistance.png"
    />
  );
}
