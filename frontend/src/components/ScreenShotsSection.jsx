import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

const screenshots = [
  { id: 1, src: img1, alt: 'Screenshot 1' },
  { id: 2, src: img2, alt: 'Screenshot 2' },
  { id: 3, src: img3, alt: 'Screenshot 3' },
];

export function ScreenShotsSection() {
  return (
    <Container className="mt-5">
      <div className="bg-white rounded-4 border shadow-sm p-4">
        <h3>ScreenShots</h3>
        <hr />
        <Carousel fade indicators interval={3000}>
          {screenshots.map((shot) => (
            <Carousel.Item key={shot.id}>
              <img
                className="d-block w-100 rounded"
                src={shot.src}
                alt={shot.alt}
                style={{ objectFit: 'cover', maxHeight: '400px' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
