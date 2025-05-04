import React, { useState, useEffect } from 'react';
import { profileStore, fetchCurrentUserProfile } from '../../store/profileStore';
import '../../style/ProfileCommon.css';
import '../../style/PaymentOptions.css';

export default function PaymentOptions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  // Add custom styles for wide screens
  const containerStyle = {
    maxWidth: '100%',
    width: '100%'
  };
  
  // Fetch user profile data when component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        await fetchCurrentUserProfile();
        // In a real application, we would fetch payment methods from the API
        // For now, we'll use dummy data
        setPaymentMethods([
          { id: 1, type: 'Visa', lastFour: '4242', isDefault: true },
          { id: 2, type: 'Mastercard', lastFour: '8888', isDefault: false }
        ]);
      } catch (err) {
        console.error('Error fetching payment methods:', err);
        setError('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddCard = (e) => {
    e.preventDefault();
    // In a real application, we would send this data to the API
    const newPaymentMethod = {
      id: Date.now(), // temporary ID
      type: detectCardType(newCard.cardNumber),
      lastFour: newCard.cardNumber.slice(-4),
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
    setIsAddingNew(false);
  };
  
  const detectCardType = (number) => {
    // Simple detection based on first digit
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    if (firstDigit === '6') return 'Discover';
    return 'Card';
  };
  
  const handleRemoveCard = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };
  
  if (loading) {
    return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  return (
    <div className="payment-options w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Payment Options</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew}
        >
          Add Payment Method
        </button>
      </div>
      
      <div className="card mb-4 w-100" style={containerStyle}>
        <div className="card-body">
          <h5 className="card-title">Saved Payment Methods</h5>
          {paymentMethods.length === 0 ? (
            <div className="alert alert-info">No payment methods saved yet.</div>
          ) : (
            <div className="list-group">
              {paymentMethods.map(method => (
                <div key={method.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-credit-card me-2"></i>
                    <span>{method.type} ending in {method.lastFour}</span>
                    {method.isDefault && <span className="badge bg-primary ms-2">Default</span>}
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveCard(method.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isAddingNew && (
        <div className="card w-100" style={containerStyle}>
          <div className="card-body">
            <h5 className="card-title">Add New Payment Method</h5>
            <form onSubmit={handleAddCard}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="cardNumber" 
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456" 
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="expiryDate" 
                    name="expiryDate"
                    value={newCard.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY" 
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="cvv" 
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                    placeholder="123" 
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="nameOnCard" className="form-label">Name on Card</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nameOnCard" 
                  name="nameOnCard"
                  value={newCard.nameOnCard}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save Card</button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
