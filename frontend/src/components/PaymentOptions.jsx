import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import { FaCreditCard, FaPaypal, FaHistory, FaPlus } from "react-icons/fa";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { API_URL } from "../store";

export default function PaymentOptions() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit_card',
    card_number: '',
    expiry_date: '',
    cvv: '',
    name_on_card: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real application, you would fetch payment methods from the backend
        // For now, we'll simulate this with a timeout
        setTimeout(() => {
          // This is mock data - in a real app, you would get this from your API
          setPaymentMethods([
            {
              id: 1,
              type: 'credit_card',
              last_four: '4242',
              expiry_date: '12/25',
              is_default: true
            }
          ]);
          
          setTransactions([
            {
              id: 1,
              date: '2025-04-28',
              amount: 19.99,
              description: 'Monthly Subscription',
              status: 'completed'
            },
            {
              id: 2,
              date: '2025-03-28',
              amount: 19.99,
              description: 'Monthly Subscription',
              status: 'completed'
            }
          ]);
          
          setLoading(false);
        }, 1000);
        
        // In a real application, you would use axios like this:
        // const paymentMethodsResponse = await axios.get(`${API_URL}/users/payment-methods/`);
        // const transactionsResponse = await axios.get(`${API_URL}/users/transactions/`);
        // setPaymentMethods(paymentMethodsResponse.data);
        // setTransactions(transactionsResponse.data);
        
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to load payment information. Please try again.");
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPaymentMethod = async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      // Validate form
      if (!newPaymentMethod.card_number || !newPaymentMethod.expiry_date || !newPaymentMethod.cvv) {
        setSubmitError("Please fill in all required fields");
        setSubmitting(false);
        return;
      }
      
      // In a real application, you would submit to your backend
      // For now, we'll simulate this with a timeout
      setTimeout(() => {
        // Add the new payment method to the list
        const newMethod = {
          id: paymentMethods.length + 1,
          type: newPaymentMethod.type,
          last_four: newPaymentMethod.card_number.slice(-4),
          expiry_date: newPaymentMethod.expiry_date,
          is_default: paymentMethods.length === 0 // Make default if it's the first one
        };
        
        setPaymentMethods([...paymentMethods, newMethod]);
        setSubmitting(false);
        setShowAddModal(false);
        
        // Reset form
        setNewPaymentMethod({
          type: 'credit_card',
          card_number: '',
          expiry_date: '',
          cvv: '',
          name_on_card: ''
        });
      }, 1000);
      
      // In a real application, you would use axios like this:
      // await axios.post(`${API_URL}/users/payment-methods/`, newPaymentMethod);
      // Then fetch the updated list
      // const response = await axios.get(`${API_URL}/users/payment-methods/`);
      // setPaymentMethods(response.data);
      
    } catch (err) {
      console.error("Error adding payment method:", err);
      setSubmitError("Failed to add payment method. Please try again.");
      setSubmitting(false);
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      is_default: method.id === id
    })));
    
    // In a real application, you would update this on the backend
    // axios.patch(`${API_URL}/users/payment-methods/${id}/set-default/`);
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    // In a real application, you would delete this on the backend
    // axios.delete(`${API_URL}/users/payment-methods/${id}/`);
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
        <div className="mt-3">
          <Button onClick={() => window.location.reload()} variant="outline-danger">
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="payment-options-container">
      <ProfileHeader title="Payment Options" />
      
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <h5 className="mb-0">Payment Methods</h5>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="me-1" /> Add Method
          </Button>
        </Card.Header>
        <Card.Body>
          {paymentMethods.length === 0 ? (
            <div className="text-center p-4 bg-light rounded">
              <p className="mb-3">No payment methods available.</p>
              <Button 
                variant="outline-primary" 
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="me-2" /> Add Payment Method
              </Button>
            </div>
          ) : (
            <div className="payment-methods-list">
              {paymentMethods.map(method => (
                <Card key={method.id} className="mb-3 payment-method-card">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {method.type === 'credit_card' ? (
                        <FaCreditCard className="me-3 text-primary" size={24} />
                      ) : (
                        <FaPaypal className="me-3 text-primary" size={24} />
                      )}
                      <div>
                        <h6 className="mb-0">
                          {method.type === 'credit_card' ? 'Credit Card' : 'PayPal'}
                          {method.is_default && (
                            <span className="badge bg-success ms-2">Default</span>
                          )}
                        </h6>
                        <small className="text-muted">
                          {method.type === 'credit_card' 
                            ? `•••• •••• •••• ${method.last_four} | Expires: ${method.expiry_date}` 
                            : 'Connected Account'}
                        </small>
                      </div>
                    </div>
                    <div>
                      {!method.is_default && (
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeletePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header className="bg-light">
          <h5 className="mb-0 d-flex align-items-center">
            <FaHistory className="me-2" /> Billing History
          </h5>
        </Card.Header>
        <Card.Body>
          {transactions.length === 0 ? (
            <p className="text-center p-3">You have no transactions yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${transaction.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Payment Method Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && (
            <Alert variant="danger">{submitError}</Alert>
          )}
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Payment Type</Form.Label>
              <Form.Select 
                name="type" 
                value={newPaymentMethod.type}
                onChange={handleInputChange}
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </Form.Select>
            </Form.Group>
            
            {newPaymentMethod.type === 'credit_card' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="card_number" 
                    placeholder="1234 5678 9012 3456"
                    value={newPaymentMethod.card_number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="expiry_date" 
                        placeholder="MM/YY"
                        value={newPaymentMethod.expiry_date}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="cvv" 
                        placeholder="123"
                        value={newPaymentMethod.cvv}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name_on_card" 
                    placeholder="John Doe"
                    value={newPaymentMethod.name_on_card}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
            
            {newPaymentMethod.type === 'paypal' && (
              <div className="text-center p-4">
                <p>You will be redirected to PayPal to complete the connection.</p>
                <Button variant="primary" className="mt-2">
                  Connect with PayPal
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPaymentMethod} disabled={submitting}>
            {submitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Saving...</span>
              </>
            ) : (
              'Save Payment Method'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
