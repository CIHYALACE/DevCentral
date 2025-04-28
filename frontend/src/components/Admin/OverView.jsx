import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function DashboardOverview() {
  const stats = [
    { title: 'Total Programs', count: 156, icon: 'fa-solid fa-desktop' },
    { title: 'Active Users', count: 2489, icon: 'fa-solid fa-users' },
    { title: 'Total Reviews', count: 1205, icon: 'fa-solid fa-star' },
    { title: 'Categories', count: 12, icon: 'fa-solid fa-folder' }
  ];

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <i className={`${stat.icon} fa-2x me-3 text-primary`}></i>
                <div>
                  <h3 className="mb-0">{stat.count}</h3>
                  <p className="text-muted mb-0">{stat.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}