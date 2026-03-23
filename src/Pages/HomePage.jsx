import AboutVidSection from "../Componets/AboutVidSection";
import ExcellenceBanner from "../Componets/ExcellenceBanner";
import HeroSection from "../Componets/HeroSection";
import IndustrialSectors from "../Componets/IndustrialSectors";
import LatestUpdates from "../Componets/LatestUpdates";


const HomePage = () => {
    return (
        <div className="bg-[#0f0f0f] min-h-screen">
            <HeroSection />
            <AboutVidSection/>
            <IndustrialSectors />
            <ExcellenceBanner />
            <LatestUpdates />
        </div>
    );
};

export default HomePage;