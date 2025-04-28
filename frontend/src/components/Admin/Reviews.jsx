import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      program: 'Spotify',
      user: 'John Doe',
      rating: 4,
      comment: 'Great app, love the features!',
      status: 'approved'
    },
    { 
      id: 2, 
      program: 'Netflix',
      user: 'Jane Smith',
      rating: 5,
      comment: 'Amazing streaming quality',
      status: 'pending'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(review => 
      review.id === id ? {...review, status: newStatus} : review
    ));
  };

  return (
    <div>
      <h2 className="mb-4">Reviews Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Program</th>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.program}</td>
              <td>{review.user}</td>
              <td>{review.rating}/5</td>
              <td>{review.comment}</td>
              <td>
                <Badge bg={review.status === 'approved' ? 'success' : 'warning'}>
                  {review.status}
                </Badge>
              </td>
              <td>
                {review.status === 'pending' && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleStatusChange(review.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleStatusChange(review.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}