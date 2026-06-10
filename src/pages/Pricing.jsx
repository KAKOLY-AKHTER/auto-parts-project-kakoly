import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-tag",                 title:"Upfront Quotes",          desc:"We give you the full price before we start — parts, labor, and disposal fees included. What we quote is exactly what you pay." },
  { icon:"fa-file-invoice-dollar", title:"Free Estimates",          desc:"Call or text for a free estimate before booking. We'll tell you the cost before we even leave the garage." },
  { icon:"fa-ban",                 title:"No Hidden Charges",       desc:"No surprise line items at the end. No shop supply fees. No disposal surcharges. One price, upfront, always." },
  { icon:"fa-dollar-sign",         title:"Competitive Rates",       desc:"Mobile service quality at fair pricing — often at or below traditional shop rates, with the added convenience of coming to you." },
  { icon:"fa-credit-card",         title:"Multiple Payment Options",desc:"Cash, all major credit/debit cards, Zelle, Venmo, and CashApp. We accept whatever is most convenient for you." },
  { icon:"fa-handshake",           title:"Value Guarantee",         desc:"If the job isn't done right, we come back and fix it at no additional cost. Your value is guaranteed on every call." },
];

const steps = [
  { label:"Call or Text Us",    desc:"Describe your issue — we give you a full quote over the phone." },
  { label:"Approve the Quote",  desc:"Only proceed when you're 100% comfortable with the price." },
  { label:"We Come to You",     desc:"Technician dispatched to your location after quote approval." },
  { label:"Pay When Done",      desc:"Pay after the job is complete — card, Zelle, Venmo, or cash." },
];

const features = [
  { icon:"fa-tag",            label:"100% Upfront Pricing",    detail:"Full quote before we lift a wrench — always, no exceptions." },
  { icon:"fa-phone",          label:"Free Phone Estimates",    detail:"Call us for a quote anytime — no obligation to book." },
  { icon:"fa-ban",            label:"Zero Hidden Fees",        detail:"No shop supplies, no environmental fees, no surprises." },
  { icon:"fa-credit-card",    label:"All Payments Accepted",   detail:"Card, cash, Zelle, Venmo, CashApp — your choice." },
  { icon:"fa-handshake",      label:"Money-Back Guarantee",    detail:"Not satisfied? We return and fix it free of charge." },
  { icon:"fa-star",           label:"Trusted by Hundreds",     detail:"Our honest pricing earns us 5-star reviews consistently." },
];

export default function Pricing() {
  return (
    <ServiceInfoPage
      icon="fa-tag"
      title="Honest Pricing"
      subtitle="No Hidden Fees — Ever"
      heroDesc="At 24HR Fremont Tire, honest pricing isn't a slogan — it's a promise. We quote the full price before we start, charge fairly, and never add surprise fees. You'll always know exactly what you're paying before we pick up a single tool."
      heroImg="/about-img.png"
      sectionImg="/roadside-assistance.png"
      highlights={["Free Estimates","Upfront Quotes","Zero Hidden Fees","All Payments Accepted"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Get a Free Estimate Today"
      ctaDesc="Call or text us — we'll give you a complete, honest quote before any work begins. No obligation."
      ctaImg="/roadside-assistance.png"
    />
  );
}
