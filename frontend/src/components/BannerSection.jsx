import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function BannerSection() {
    return (
        <Container className="mt-5 ">
            <Row className="gx-0 d-flex flex-column flex-md-row ">
                {/* Text Part */}
                <Col xs={12} md={6} className="text-white p-4 p-md-5 rounded-start-4" style={{ backgroundColor: "#181818" }}>
                    <h1>Discover the magical world of the Magicabin</h1>

                    <Row className="align-items-center mt-5">
                        {/* Left Part */}
                        <Col xs={12} md={8} className="d-flex align-items-center mb-4 mb-md-0">
                            <img
                                className="rounded"
                                src="https://play-lh.googleusercontent.com/gwvNBaFxEJDB5Vy16tC0Q-9ZCODTy6_nWkoXDNxvd5XKSCuR-Q7-o37cmN7W-YyDXg=s64-rw"
                                alt="logoGame"
                                width={64}
                                height={64}
                            />
                            <div className="ms-3">
                                <h6 className="mb-1">Magicabin: Witch's Adventure</h6>
                                <h6 className="mb-0">IVYGAMES</h6>
                            </div>
                        </Col>

                        {/* Right Part */}
                        <Col xs={12} md={4} className="text-md-center">
                            <button className="btn btn-secondary text-white px-4 mb-2">Install</button>
                            <p className="mb-0">In-app purchases</p>
                        </Col>
                    </Row>
                </Col>

                {/* Image Part */}
                <Col xs={12} md={6}>
                    <img
                        className="img-fluid w-100 h-100 object-fit-cover rounded-end-4"
                        src="https://play-lh.googleusercontent.com/QJmjy1rPi-yelNUv1sud2UE8NYLOsLoV6mKvzu_KTooZFPXePGvidM7NVmZO7hz6yWWC8RCj7jrj=w648-h364-rw"
                        alt="bannerImg"
                    />
                </Col>
            </Row>
        </Container>
    );
}