import ServiceInfoPage from "./ServiceInfoPage";

const cards = [
  { icon:"fa-user-graduate",  title:"Industry Certified",       desc:"All technicians hold current industry certifications and complete regular training to stay up-to-date with the latest vehicles and techniques." },
  { icon:"fa-clock",          title:"10+ Years Experience",     desc:"Our team brings deep hands-on experience servicing passenger cars, commercial trucks, trailers, and everything in between." },
  { icon:"fa-user-check",     title:"Background Checked",       desc:"Every technician is thoroughly vetted before joining — so you know exactly who is showing up at your door." },
  { icon:"fa-headset",        title:"Clear Communication",      desc:"We explain what we find, what we recommend, and what we do — in plain language, no technical jargon." },
  { icon:"fa-car-crash",      title:"Roadside Specialists",     desc:"Trained specifically for mobile and roadside situations — fast diagnosis, efficient execution, zero drama." },
  { icon:"fa-hard-hat",       title:"Safety Trained",           desc:"Strict safety protocols on every job to protect you, your vehicle, and our technicians at any time or location." },
];

const steps = [
  { label:"Certified & Vetted",   desc:"Every tech cleared through background checks and certification before dispatch." },
  { label:"Dispatched to You",    desc:"Closest available certified technician sent to your exact location." },
  { label:"Fast Assessment",      desc:"Quick, accurate diagnosis of your vehicle's issue on-site." },
  { label:"Fixed & Guaranteed",   desc:"Job completed professionally — backed by our satisfaction guarantee." },
];

const features = [
  { icon:"fa-certificate",    label:"Fully Certified Pros",      detail:"Not trainees — certified technicians with proven field experience." },
  { icon:"fa-user-check",     label:"Background Verified",       detail:"Every tech screened before joining our team." },
  { icon:"fa-graduation-cap", label:"Ongoing Training",          detail:"Regular training on new vehicles, tools, and industry standards." },
  { icon:"fa-comment-dots",   label:"Honest Communicators",      detail:"Clear, jargon-free updates before and after every job." },
  { icon:"fa-clock",          label:"Available 24/7",            detail:"Our techs work shifts to ensure full day-and-night coverage." },
  { icon:"fa-star",           label:"5-Star Rated",              detail:"Hundreds of verified reviews from satisfied Fremont customers." },
];

export default function OurTechnicians() {
  return (
    <ServiceInfoPage
      icon="fa-users"
      title="Experienced Technicians"
      subtitle="Certified, Vetted & Highly Trained"
      heroDesc="Our technicians aren't just mechanics — they're certified mobile service specialists trained to handle any vehicle, anywhere. Background-checked, safety-trained, and committed to getting the job done right the first time, every time."
      heroImg="/mobile-mechanic.png"
      sectionImg="/about-img.png"
      highlights={["Industry Certified","Background Checked","10+ Years Experience","Safety Trained"]}
      cards={cards}
      steps={steps}
      features={features}
      ctaTitle="Meet Our Team on the Road"
      ctaDesc="Call now and a certified, background-checked technician will come to you — day or night, wherever you are."
      ctaImg="/mobile-mechanic.png"
    />
  );
}
