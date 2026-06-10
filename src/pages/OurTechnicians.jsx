import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-user-graduate",  title:"Certified Technicians",   desc:"All our technicians hold industry certifications and undergo regular training to stay current with the latest vehicles, tires, and service techniques." },
  { icon:"fa-clock",          title:"Years of Experience",      desc:"Our team brings 10+ years of hands-on experience servicing passenger cars, commercial trucks, trailers, and everything in between." },
  { icon:"fa-check-double",   title:"Background Checked",       desc:"Every technician is thoroughly background-checked and vetted before joining our team so you can trust who shows up at your door." },
  { icon:"fa-headset",        title:"Professional & Courteous", desc:"We treat every customer with respect — clear communication, honest advice, and a clean workspace every single time." },
  { icon:"fa-car-crash",      title:"Roadside Specialists",     desc:"Our technicians are trained specifically for roadside situations — quick diagnosis, fast execution, and zero drama." },
  { icon:"fa-hard-hat",       title:"Safety Trained",           desc:"All technicians follow strict safety protocols to protect you, your vehicle, and themselves at any location or time of day." },
];

const steps = [
  { label:"Certified", desc:"All techs hold current professional certifications." },
  { label:"Dispatched", desc:"The closest available technician is sent to you." },
  { label:"Assessed", desc:"Quick, accurate diagnosis of the issue on-site." },
  { label:"Fixed", desc:"Job completed professionally — guaranteed." },
];

export default function OurTechnicians() {
  return (
    <ServiceInfoPage
      icon="fa-users"
      badge="TEAM"
      title="Experienced Technicians"
      subtitle="Trained & Certified Professionals"
      heroDesc="Our technicians aren't just mechanics — they're certified mobile service specialists trained to handle any vehicle, anywhere. Background-checked, safety-trained, and committed to getting the job done right the first time."
      cards={cards}
      steps={steps}
      ctaTitle="Meet Our Team on the Road"
      ctaDesc="Call now and a certified technician will come to you — day or night."
    />
  );
}
