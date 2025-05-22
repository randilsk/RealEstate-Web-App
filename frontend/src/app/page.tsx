import dynamic from 'next/dynamic';
import Bluebar from "../components/Bluebar.jsx";
import Header from "../components/Header.jsx";
import { Blend } from 'lucide-react';

// Dynamically import heavy components
const HeroSection = dynamic(() => import("../components/HomeContent/HeroSection.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const HomeRecommendation = dynamic(() => import("../components/HomeContent/HomeRecommendation.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const HomeBuySellRent = dynamic(() => import("../components/HomeContent/HomeBuySellRent.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const AboutSectionHome = dynamic(() => import("../components/HomeContent/AboutSectionHome.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

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
        <AboutSectionHome />
        <Bluebar />
      </div>
    </>
  );
}
