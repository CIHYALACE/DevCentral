import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchProgramDetails, recordDownload } from '../store/programStore';
import { profileStore, fetchUserApps } from '../store/profileStore';
import { authStore } from '../store/authStore';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const appDetails = useStore(programStore, (state) => state.currentProgram);
  const { isAuthenticated } = useStore(authStore);
  const userApps = useStore(profileStore, (state) => state.userApps);
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProgramDetails(slug);
    }
    
    // Fetch user's app library if authenticated
    if (isAuthenticated) {
      fetchUserApps();
    }
  }, [slug, isAuthenticated]);
  
  // Check if the app is already in the user's library and redirect if it is
  useEffect(() => {
    if (userApps.length > 0 && appDetails && appDetails.id) {
      const isAppOwned = userApps.some(app => app.id === appDetails.id);
      if (isAppOwned) {
        // Redirect back to the app details page since the user already owns this app
        navigate(`/details/${appDetails.type}/${appDetails.slug}`);
      }
    }
  }, [userApps, appDetails, navigate]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    if (paymentMethod === 'credit_card') {
      if (!cardNumber || cardNumber.length < 16) {
        setError('Please enter a valid card number');
        return false;
      }
      if (!cardName) {
        setError('Please enter the cardholder name');
        return false;
      }
      if (!expiryDate || !expiryDate.includes('/')) {
        setError('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!cvv || cvv.length < 3) {
        setError('Please enter a valid CVV');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Record the download in the backend to add it to the user's library
      await recordDownload(appDetails.id);
      
      setIsProcessing(false);
      setSuccess(true);
      
      // Refresh user's app library
      if (isAuthenticated) {
        await fetchUserApps();
      }
      
      // Open the download link in a new tab
      if (appDetails.download_url) {
        window.open(appDetails.download_url, '_blank');
      }
      
      // Redirect to download page after successful payment
      setTimeout(() => {
        // Navigate back to the app details page with a query parameter to indicate payment was completed
        navigate(`/details/${appDetails.type}/${appDetails.slug}?payment=completed`);
      }, 2000);
    } catch (error) {
      console.error('Error processing payment or recording download:', error);
      setIsProcessing(false);
      setError('There was an error processing your payment. Please try again.');
    }
  };

  if (!appDetails || appDetails.slug !== slug) {
    return <div className="loading">Loading...</div>;
  }
  
  // Check if the app is free, if so redirect to the app details page
  const appPrice = parseFloat(appDetails.price || '0.00');
  if (appPrice <= 0) {
    navigate(`/details/${appDetails.type}/${appDetails.slug}`);
    return <div className="loading">Redirecting to free app...</div>;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Checkout</h4>
            </Card.Header>
            <Card.Body>
              {success ? (
                <Alert variant="success">
                  <h5>Payment Successful!</h5>
                  <p>Thank you for your purchase. You will be redirected to the download page shortly.</p>
                </Alert>
              ) : (
                <>
                  <div className="mb-4">
                    <h5>Order Summary</h5>
                    <div className="d-flex align-items-center mb-3">
                      <img 
                        src={appDetails.icon} 
                        alt={appDetails.title} 
                        className="me-3" 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                      <div>
                        <h6 className="mb-0">{appDetails.title}</h6>
                        <small className="text-muted">{appDetails.type}</small>
                      </div>
                      <div className="ms-auto">
                        <h6>${parseFloat(appDetails.price).toFixed(2)}</h6>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h6>Total:</h6>
                      <h6>${parseFloat(appDetails.price).toFixed(2)}</h6>
                    </div>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Payment Method</Form.Label>
                      <div>
                        <Form.Check
                          type="radio"
                          label="Credit Card"
                          name="paymentMethod"
                          id="credit_card"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={handlePaymentMethodChange}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          label="PayPal"
                          name="paymentMethod"
                          id="paypal"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={handlePaymentMethodChange}
                        />
                      </div>
                    </Form.Group>

                    {paymentMethod === 'credit_card' && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Cardholder Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expiry Date</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => {
                                  const input = e.target.value.replace(/\D/g, '').slice(0, 4);
                                  if (input.length > 2) {
                                    setExpiryDate(`${input.slice(0, 2)}/${input.slice(2)}`);
                                  } else {
                                    setExpiryDate(input);
                                  }
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>CVV</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="text-center mb-3">
                        <p>You will be redirected to PayPal to complete your payment.</p>
                      </div>
                    )}

                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          `Pay $${parseFloat(appDetails.price).toFixed(2)}`
                        )}
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => navigate(`/details/${appDetails.type}/${appDetails.slug}`)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
