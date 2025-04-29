import React, { useEffect } from "react";
import GamesSection from "../components/GamesSection";
import HeroSlider from "../components/HeroSlider";
import HealthFitness from "../components/HealthANDFitness";
import RecommendedAppsSection from "../components/RecommendedApps";
import SpecialOffer from "../components/SpecialOffer";
import BannerSection from "../components/BannerSection";
import EducationalAppsSection from "../components/EducationalAppsSection";

const HomePage = () => {
    
    return (
        <>
            <GamesSection />
            <BannerSection />
            <HeroSlider />
            <RecommendedAppsSection />
            <HealthFitness/>
            <EducationalAppsSection />
            <SpecialOffer />
        </>
    );
};
 

export default HomePage;
