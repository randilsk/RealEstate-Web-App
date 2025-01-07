import Bluebar from "../_components/Bluebar.jsx";
import Header from "../_components/Header.jsx";
import HeroSection from "../_components/HomeContent/HeroSection.jsx";
import HomeRecommendation from "../_components/HomeContent/HomeRecommendation.jsx";
import HeaderTypeTwo from "../_components/HomeContent/HeaderTypeTwo.jsx";

export default function Home() {
  return (
    <>
      <div className="bg-main-bg min-h-screen">
        <Bluebar />
        <Header />
        <HeroSection />
        <HomeRecommendation />
      </div>
    </>
  );
}
