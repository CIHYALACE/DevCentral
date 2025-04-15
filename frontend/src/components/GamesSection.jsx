import GameCard from "./GameCard";
import GameCardWide from "./GameCardWide";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function GamesSection() {
    // Sample game data - in a real app, this would come from an API or props
    const games = Array(6).fill(null);
    
    return (
        <div className="container py-5">
            <h2 className="mb-4">Popular Games</h2>
            
            <Swiper
                modules={[Autoplay, Pagination]}
                // spaceBetween={20}
                // slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // breakpoints={{
                //     640: {
                //         slidesPerView: 2,
                //     },
                //     992: {
                //         slidesPerView: 1,
                //     }
                // }}
                className="games-swiper"
            >
                {games.map((_, index) => (
                    <SwiperSlide key={index}>
                        <GameCardWide />
                    </SwiperSlide>
                ))}
            </Swiper>
            <hr/>
            <h2 className="mb-4">Featured Games</h2>
            <GameCardWide/>
            <div className="row space-between">
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </div>
        </div>
    );
}
