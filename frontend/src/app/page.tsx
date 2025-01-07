import Bluebar from "../_components/Bluebar.jsx";
import Header from "../_components/Header.jsx";
import HeroSection from "../_components/HomeContent/HeroSection.jsx";
import HomeRecommendation from "../_components/HomeContent/HomeRecommendation.jsx";
import HomeBuySellRent from "../_components/HomeContent/HomeBuySellRent.jsx";

export default function Home() {
  return (
    <>
      <div className="bg-main-bg min-h-screen">
        <Bluebar />
        <Header />
        <HeroSection />
        <HomeRecommendation />
        <HomeBuySellRent />
      </div>
    </>
  );
}
