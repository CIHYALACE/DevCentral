import React from 'react'
import { Carousel } from 'react-bootstrap'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import logoImg from '../assets/logo.jpeg'
import '../style/HeroGameDetails.css'


export function HeroGameDetails() {
    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item >
                    <div className="imgContainer">
                        <img
                            className="d-block w-100"
                            src={img1}
                            alt="First slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="overlay"></div>

                    </div>
                    <div className='hero-text'>
                        <div className=' d-flex  align-items-center'>
                            <img src={logoImg} alt="imgLogo" className='rounded' width={'80px'} />
                            <h2 className='hero-caption mx-3'>Battle Arena: Heroes <br /> Adventure</h2>
                        </div>
                        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi officiis maiores nisi sunt animi. Deleniti alias est ullam reprehenderit id!</p>
                        <div className='d-flex  align-items-center mt-4 text-info'>
                            <p className='me-4'>4.6  <i className="fa-solid fa-star "></i> </p>
                            <p>280 ratings</p>
                            <p className='ms-4'>100M+ <i className="fa-solid fa-download"></i></p>
                        </div>
                        <button className='hero-btn btn btn-info w-50 mt-4'>Download Now</button>
                        <p className='mt-3 '>Offers in-app purchases</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="imgContainer">
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt="second slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="overlay"></div>

                    </div>
                    <div className='hero-text'>
                        <div className=' d-flex  align-items-center'>
                            <img src={logoImg} alt="imgLogo" className='rounded' width={'80px'} />
                            <h2 className='hero-caption mx-3'>Battle Arena: Heroes <br /> Adventure</h2>
                        </div>
                        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi officiis maiores nisi sunt animi. Deleniti alias est ullam reprehenderit id!</p>
                        <div className='d-flex  align-items-center mt-4 text-info'>
                            <p className='me-4'>4.6  <i className="fa-solid fa-star"></i> </p>
                            <p>280 ratings</p>
                            <p className='ms-5'>100M+ <i className="fa-solid fa-download"></i></p>
                        </div>
                        <button className='hero-btn btn btn-info w-50 mt-4'>Download Now</button>
                        <p className='mt-3'>Offers in-app purchases</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="imgContainer">
                        <img
                            className="d-block w-100"
                            src={img3}
                            alt="third slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="overlay"></div>

                    </div>
                    <div className='hero-text'>
                        <div className=' d-flex  align-items-center'>
                            <img src={logoImg} alt="imgLogo" className='rounded' width={'80px'} />
                            <h2 className='hero-caption mx-3'>Battle Arena: Heroes <br /> Adventure</h2>
                        </div>
                        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi officiis maiores nisi sunt animi. Deleniti alias est ullam reprehenderit id!</p>
                        <div className='d-flex  align-items-center mt-4 text-info'>
                            <p className='me-4'>4.6  <i className="fa-solid fa-star"></i> </p>
                            <p>280 ratings</p>
                            <p className='ms-5'>100M+ <i className="fa-solid fa-download"></i></p>
                        </div>
                        <button className='hero-btn btn btn-info w-50 mt-4'>Download Now</button>
                        <p className='mt-3'>Offers in-app purchases</p>
                    </div>

                </Carousel.Item>
            </Carousel>

        </>
    )
}
