import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Dummy data
const features = [
  "Develop And Manage Your Bastion",
  "Collect Powerful Champions",
  "Fight Epic Boss Battles",
  "Deep Tactical Play",
  "Hassle-free Autoplay",
  "Visceral 3D Artwork",
  "PVP Arena"
]

export function Feature() {
  return (
    <Container className='mt-5'>
      <Row>
        <Col lg={12} className="bg-white rounded-4 border shadow-sm p-4">
          <h3>Feature</h3>
          <hr />
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </Col>
      </Row>
    </Container>
  )
}
