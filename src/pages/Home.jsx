import Header from "../components/layout/Header";
import AboutUs from "./AboutUs";
import BannerCards from "./BannerCards";
import BestSellers from "./BestSellers";
import CallToAction from "./Calltoaction";
import Features from "./Features";
import Hero from "./Hero";
import LatestNews from "./Latestnews";
import AllProducts from "./AllProducts";
import FlashDeals from "./FlashDeals";
import Newsletter from "./Newsletter";
import IconsBar from "./IconsBar";

export default function Home() {
  return (
    <>
      <Header />
      <Hero/>
      
      {/* Banner Cards - Dark Section */}
      <BannerCards />
 <AboutUs></AboutUs>
      {/* White Features Section */}
      <BestSellers></BestSellers>
      <CallToAction></CallToAction>
      <Features />
      
      
      <AllProducts></AllProducts>
      
      
     
      
      <FlashDeals></FlashDeals>
   
      <IconsBar></IconsBar>

      <LatestNews></LatestNews>
    </>
  );
}