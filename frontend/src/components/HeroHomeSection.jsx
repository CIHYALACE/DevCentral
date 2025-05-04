import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import heroImge from '../assets/Dev_logo.jpg'
import '../style/HeroHomeSection.css'
import { Link } from 'react-router-dom';


export function HeroHomeSection() {
  return (
    <div className='heroHomeSection'>
      <Container className=''>
        <Row className='align-items-center justify-content-center'>
          <Col md={8} >
            <div className="hero-content mt-5">
              <h1 className='mb-4'>
                Welcome to <br /> Our App <br />Store  DevCentral
              </h1>
              <h3 >Explore our wide range of apps, games and <br /> books  From productivity to entertainment, <br /> we have it all!</h3>
              <Link to="/register">
              <button className="mt-5" aria-label="Get started with DevCentral">Get Started</button>
              </Link>
            </div>
          </Col>
          <Col md={4} className="d-none d-md-block" >
            <img
              className="hero-image mt-5 rounded img-fluid w-100"
              src={heroImge}
              alt="Hero Animation"
            style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
        </Row>
        <Row className=" mt-5">
          <div className="col-6 d-flex justify-content-center">

            <Col xs={12} md={4} className="mb-4 mb-md-0">
              <h3 className="fw-bold">240K+</h3>
              <p className="text-muted">Apps</p>
            </Col>
            <Col xs={12} md={4} className="mb-4 mb-md-0">
              <h3 className="fw-bold">1.5M+</h3>
              <p className="text-muted">Downloads</p>
            </Col>
            <Col xs={12} md={4}>
              <h3 className="fw-bold">1.2M+</h3>
              <p className="text-muted">Users</p>
            </Col>
          </div>
        </Row>


      </Container>
    </div>
  )
}
