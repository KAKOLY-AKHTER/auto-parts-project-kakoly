import Header from "../components/layout/Header";
import AboutUs from "./AboutUs";
import BannerCards from "./BannerCards";
import BestSellers from "./BestSellers";
import CallToAction from "./Calltoaction";
import Features from "./Features";
import Hero from "./Hero";
import LatestNews from "./LatestNews";
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

      {/* White Features Section */}
      <Features />
      <BestSellers></BestSellers>
      <LatestNews></LatestNews>
      <AllProducts></AllProducts>
      
      
      <AboutUs></AboutUs>
      <CallToAction></CallToAction>
      <FlashDeals></FlashDeals>
      <Newsletter></Newsletter>
      <IconsBar></IconsBar>
    </>
  );
}