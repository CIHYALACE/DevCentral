import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

const slideData = [
  {
    img: img1,
    alt: 'Save 10% now with Nitrado',
    title: 'Nitrado: Save 10% now',
    description: 'Get discounts on game server hosting with Nitrado.',
  },
  {
    img: img2,
    alt: 'App store deals',
    title: 'Save up to 30% on apps',
    description: 'Explore top app deals and exclusive offers.',
  },
  {
    img: img3,
    alt: 'Microsoft 365 bundle',
    title: 'Microsoft 365',
    description: 'Unlock productivity with Microsoft 365 subscriptions.',
  },
  {
    img: img1,
    alt: 'Dolby Access',
    title: 'Dolby Access',
    description: 'Experience immersive audio with Dolby Atmos.',
  },
];

export const AppSliderSection = () => {
  return (
    <Container  className="py-4">
      <Carousel fade data-bs-theme="dark" interval={4000}>
        {slideData.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel-image"
              src={slide.img}
              alt={slide.alt}
            />
            <Carousel.Caption>
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};
