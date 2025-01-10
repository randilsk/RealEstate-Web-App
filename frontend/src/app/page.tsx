import Bluebar from "../components/Bluebar.jsx";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HomeContent/HeroSection.jsx";
import HomeRecommendation from "../components/HomeContent/HomeRecommendation.jsx";
import HomeBuySellRent from "../components/HomeContent/HomeBuySellRent.jsx";

export default function Home() {
  return (
    <>
      <div className="bg-main-bg min-h-screen">
        <Bluebar />
        <Header />
        <HeroSection />
        <HomeRecommendation />
        <HomeBuySellRent />
        <Bluebar />
      </div>
    </>
  );
}
