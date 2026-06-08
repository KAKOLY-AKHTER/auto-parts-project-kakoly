import Header from "../components/layout/Header";
import AboutUs from "./AboutUs";
import BannerCards from "./BannerCards";
import BestSellers from "./BestSellers";
import CallToAction from "./Calltoaction";
import Features from "./Features";
import Hero from "./Hero";
import LatestNews from "./LatestNews";


export default function Home() {
  return (
    <>
      <Header />
      <Hero/>
      
      {/* Banner Cards - Dark Section */}
      <BannerCards />

      {/* White Features Section */}
      <Features />
      <BestSellers></BestSellers>
      <AboutUs></AboutUs>
<CallToAction></CallToAction>
<LatestNews></LatestNews>
      {/* Rest of your sections (Why Choose Us, Categories, CTA) */}
      {/* ... your other sections here */}
    </>
  );
}