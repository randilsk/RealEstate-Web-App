import Bluebar from "../_components/Bluebar.jsx";
import Header from "../_components/Header.jsx";
import TitleText from "../_components/HomeContent/TitleText.jsx";
import HomeSearchbar from "../_components/HomeContent/HomeSearchbar.jsx";
import HomeImage from "../_components/HomeContent/HomeImage.jsx";

export default function Home() {
  return (
    <>
      <div className="bg-main-bg min-h-screen">
        <Bluebar />
        <Header />
        <div className="container mx-auto py-10 flex ">
          <div className="flex flex-col gap-5 w-1/2">
            <TitleText />
            <HomeSearchbar />
          </div>
          <div className="w-1/2 flex justify-end">
            <HomeImage />
          </div>
        </div>
      </div>
      <div className="bg-main-blue">wregqethq</div>
    </>
  );
}
