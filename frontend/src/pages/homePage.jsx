import GamesSection from "../components/GamesSection"
import HeroSlider from "../components/HeroSlider"
import HealthFitness from "../components/HealthANDFitness"
import RecommendedAppsSection from "../components/RecommendedApps"
import SpecialOffer from "../components/SpecialOffer"
import BannerSection from "../components/BannerSection"
import EducationalAppsSection from "../components/EducationalAppsSection"
// import PaymentOptions from '../components/PaymentOptions';
// import Subscriptions from '../components/Subscriptions';
// import Devices from "../components/Devices"
// import OrderHistory from "../components/OrderHistory"

export default function HomePage()  {
    return (
        <>
           

            <GamesSection/>
            <BannerSection/>
            <HeroSlider/>
            <RecommendedAppsSection/>
            <HealthFitness/>
            <EducationalAppsSection/>
            <SpecialOffer/>
            
             {/* <PaymentOptions/>
{/*           
                <Subscriptions/> */}
                {/* <Devices/> */}
                {/* <OrderHistory/>  */}

            
            </>
        )
    }