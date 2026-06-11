import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-microchip",       title:"A/C Diagnostic Scan",         desc:"We scan your HVAC system for fault codes and identify the root cause of cooling failure before recommending any repairs." },
  { icon:"fa-snowflake",       title:"Refrigerant Recharge",        desc:"Low refrigerant is the #1 cause of weak A/C. We evacuate, check for leaks, and recharge with the correct type — R-134a or R-1234yf." },
  { icon:"fa-magnifying-glass",title:"Leak Detection",              desc:"Using UV dye and an electronic leak detector, we pinpoint refrigerant leaks at the compressor, condenser, evaporator, or hose fittings." },
  { icon:"fa-gear",            title:"Compressor Inspection",       desc:"The heart of your A/C system. We check compressor engagement, clutch operation, and pressure output to evaluate its condition." },
  { icon:"fa-wind",            title:"Condenser & Evaporator Check",desc:"We inspect for blockages, corrosion, and damage to condenser and evaporator coils that reduce cooling efficiency." },
  { icon:"fa-filter",          title:"Cabin Filter Replacement",    desc:"A clogged cabin filter restricts airflow and makes A/C less effective. We inspect and replace it as part of every A/C service." },
];

const steps = [
  { label:"Call & Describe the Issue",   desc:"Warm air, no airflow, strange smell, or clicking noise — describe what you're experiencing." },
  { label:"We Come to You",              desc:"Our mobile unit arrives with A/C diagnostics, pressure gauges, and refrigerant equipment." },
  { label:"Full System Evaluation",      desc:"We scan, pressure-test, leak-check, and inspect every A/C component thoroughly." },
  { label:"Report & Repair On-Site",     desc:"We give you a complete written diagnosis and perform approved repairs before we leave." },
];

const features = [
  { icon:"fa-certificate",    label:"Certified A/C Technicians",   detail:"Trained on R-134a and R-1234yf refrigerant systems." },
  { icon:"fa-truck",          label:"Mobile A/C Service",          detail:"We bring diagnostics and refrigerant equipment to you." },
  { icon:"fa-shield-halved",  label:"No Overselling",              detail:"We only recharge or repair what's actually needed." },
  { icon:"fa-car",            label:"All Vehicle Types",           detail:"Sedans, SUVs, pickup trucks, and light commercial vehicles." },
  { icon:"fa-clock",          label:"Fast Turnaround",             detail:"Most A/C evaluations done in 30–45 minutes on-site." },
  { icon:"fa-file-lines",     label:"Honest Written Diagnosis",    detail:"Full report of findings before any work is authorized." },
];

export default function AcEvaluation() {
  return (
    <ServiceInfoPage
      icon="fa-snowflake"
      title="A/C Evaluation & Repair"
      subtitle="Diagnostic • Recharge • Leak Detection"
      heroDesc="A failing A/C system makes every drive uncomfortable. 24HR Fremont Tire provides comprehensive mobile A/C diagnostic and recharge service — we come to your location with professional equipment and give you an honest, accurate assessment."
      heroImg="https://images.unsplash.com/photo-SXu-xvhLpQE?auto=format&fit=crop&w=1600&q=80"
      sectionImg="https://images.unsplash.com/photo-WuOdwlPKzAM?auto=format&fit=crop&w=800&q=80"
      highlights={["A/C Diagnostic","Refrigerant Recharge","Leak Detection","Cabin Filter"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Stay Cool — We Come to You."
      ctaDesc="Book an A/C evaluation today and get a full diagnosis with honest repair recommendations, on-site."
      ctaImg="https://images.unsplash.com/photo-SXu-xvhLpQE?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
