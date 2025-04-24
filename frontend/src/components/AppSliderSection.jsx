import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img from '../assets/1.jpg';

import { Navigation, Pagination } from 'swiper/modules';


export function AppSliderSection() {
  return (
    <>
        <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src={img} alt="Game 1" className="w-50" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img} alt="Game 2" className="w-50" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img} alt="Game 3" className="w-50" />
        </SwiperSlide>
      </Swiper>
      
    </>
  )
}
