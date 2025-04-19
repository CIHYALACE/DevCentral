import GamesSection from "../components/gamesSection"
import HeroSlider from "../components/HeroSlider"
import HealthFitness from "../components/HealthANDFitness"
import RecommendedAppsSection from "../components/RecommendedApps"
import SpecialOffer from "../components/SpecialOffer"
export default function HomePage() {
    return (
        <>
            <GamesSection/>

            <HeroSlider/>
            <RecommendedAppsSection/>
            <HealthFitness/>
            <SpecialOffer/>

        </>
    )
}