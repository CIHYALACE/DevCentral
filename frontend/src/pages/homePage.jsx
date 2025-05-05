import GamesSection from "../components/GamesSection";
import HeroSlider from "../components/HeroSlider";
import HealthFitness from "../components/HealthANDFitness";
import RecommendedAppsSection from "../components/RecommendedApps";
import SpecialOffer from "../components/SpecialOffer";
import BannerSection from "../components/BannerSection";
import EducationalAppsSection from "../components/EducationalAppsSection";
import { HeroHomeSection } from "../components/HeroHomeSection";
import { Newsletter } from "../components/Newsletter";


export default function HomePage() {
  return (
    <>
      < HeroHomeSection  />
      <GamesSection />
      <BannerSection />
      {/* <HeroSlider /> */}
      <RecommendedAppsSection />
      <SpecialOffer />
      <HealthFitness />
      <Newsletter />
      {/* <EducationalAppsSection /> */}
    </>
  );
}
