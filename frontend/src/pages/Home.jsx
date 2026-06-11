import Header from "../components/layout/Header";
import AboutUs from "../components/sections/AboutUs";
import AwardBanner from "../components/sections/AwardBanner";
import BannerCards from "../components/sections/BannerCards";
import BestSellers from "../components/sections/BestSellers";
import CallToAction from "../components/sections/Calltoaction";
import DealsSection from "../components/sections/DealsSection";
import Features from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import LatestNews from "../components/sections/Latestnews";
import AllProducts from "../components/sections/AllProducts";
import FlashDeals from "../components/sections/FlashDeals";
import RoadsideSection from "../components/sections/RoadsideSection";
// import Newsletter from "../components/sections/Newsletter";
import IconsBar from "../components/sections/IconsBar";

export default function Home() {
  return (
    <>
      <Header />
      <Hero/>
      
      {/* Banner Cards - Dark Section */}
      {/* <BannerCards /> */}
      <RoadsideSection />
      <AboutUs></AboutUs>
      <DealsSection />
      {/* White Features Section */}
      <BestSellers></BestSellers>
      <CallToAction></CallToAction>
      <Features />
      <AwardBanner />

      <AllProducts></AllProducts>
      
      
     
      
      <FlashDeals></FlashDeals>
   
      <IconsBar></IconsBar>

      <LatestNews></LatestNews>
    </>
  );
}