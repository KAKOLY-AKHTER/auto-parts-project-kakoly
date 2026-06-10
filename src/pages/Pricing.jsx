import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-tag",            title:"Upfront Pricing",          desc:"We give you the full price before we start — no surprises, no hidden fees, no upsells. What we quote is what you pay." },
  { icon:"fa-file-invoice-dollar", title:"Free Estimates",      desc:"Call or message us for a free estimate before booking. We'll tell you exactly what the service will cost before we show up." },
  { icon:"fa-handshake",      title:"No Hidden Charges",        desc:"Our quotes include labor, parts, and any applicable disposal fees. There are zero hidden charges added at the end." },
  { icon:"fa-dollar-sign",    title:"Competitive Rates",        desc:"Mobile service should not cost a fortune. Our rates are competitive with — and often below — traditional shop pricing." },
  { icon:"fa-credit-card",    title:"Multiple Payment Options", desc:"We accept cash, all major credit/debit cards, Zelle, Venmo, and CashApp for your convenience." },
  { icon:"fa-star",           title:"Value Guarantee",          desc:"We stand behind the value we deliver. If the job isn't done right, we come back and make it right — at no extra cost." },
];

const steps = [
  { label:"Call or Text",    desc:"Describe your issue and location to get a quote instantly." },
  { label:"Get a Quote",     desc:"We give you a full upfront price before any work begins." },
  { label:"Confirm Service", desc:"Approve the quote and we dispatch a technician to you." },
  { label:"Pay Easily",      desc:"Pay by card, Zelle, Venmo, or cash when the job is done." },
];

export default function Pricing() {
  return (
    <ServiceInfoPage
      icon="fa-tag"
      badge="PRICE"
      title="Honest Pricing"
      subtitle="No Hidden Fees, Ever"
      heroDesc="At 24HR Fremont Tire, honest pricing isn't a policy — it's a promise. We quote upfront, charge fairly, and never add surprise fees. You'll always know exactly what you're paying before we lift a wrench."
      cards={cards}
      steps={steps}
      ctaTitle="Get a Free Estimate Today"
      ctaDesc="Call or text us — we'll give you a full quote before any work begins."
    />
  );
}
