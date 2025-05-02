import React, { useState, useEffect } from 'react';
import { profileStore, fetchCurrentUserProfile } from '../../store/profileStore';

export default function Subscriptions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  
  // Add custom styles for wide screens
  const containerStyle = {
    maxWidth: '100%',
    width: '100%'
  };
  
  // Fetch user profile and subscription data when component mounts
  useEffect(() => {
    const loadSubscriptionData = async () => {
      try {
        setLoading(true);
        await fetchCurrentUserProfile();
        
        // In a real application, we would fetch subscription data from the API
        // For now, we'll use dummy data
        setActiveSubscriptions([
          { 
            id: 1, 
            name: 'DevCentral Pro', 
            status: 'Active', 
            renewDate: 'May 15, 2025', 
            price: '$9.99/month' 
          },
          { 
            id: 2, 
            name: 'Game Pass', 
            status: 'Active', 
            renewDate: 'June 3, 2025', 
            price: '$14.99/month' 
          }
        ]);
        
        setAvailablePlans([
          {
            id: 1,
            name: 'Basic',
            price: '$4.99/month',
            description: 'Access to basic features and limited downloads.',
            popular: false
          },
          {
            id: 2,
            name: 'Premium',
            price: '$9.99/month',
            description: 'Unlimited downloads and premium content access.',
            popular: true
          },
          {
            id: 3,
            name: 'Developer',
            price: '$19.99/month',
            description: 'All premium features plus developer tools and resources.',
            popular: false
          }
        ]);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscriptionData();
  }, []);
  
  const handleCancelSubscription = (subscriptionId) => {
    // In a real application, we would send a request to the API to cancel the subscription
    setActiveSubscriptions(activeSubscriptions.filter(sub => sub.id !== subscriptionId));
  };
  
  const handleSubscribe = (planId) => {
    // In a real application, we would send a request to the API to subscribe to the plan
    alert(`Subscribed to plan ${planId}. In a real application, this would redirect to payment.`);
  };
  
  if (loading) {
    return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  return (
    <div className="subscriptions w-100">
      <h2 className="mb-4">Your Subscriptions</h2>
      <div className="card mb-4 w-100" style={containerStyle}>
        <div className="card-body">
          <h5 className="card-title">Active Subscriptions</h5>
          {activeSubscriptions.length === 0 ? (
            <div className="alert alert-info">You don't have any active subscriptions.</div>
          ) : (
            <div className="list-group">
              {activeSubscriptions.map(subscription => (
                <div key={subscription.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{subscription.name}</h6>
                    <span className="badge bg-success">{subscription.status}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    <span>Renews on {subscription.renewDate}</span>
                    <span>{subscription.price}</span>
                  </div>
                  <div className="mt-2">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleCancelSubscription(subscription.id)}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="card w-100" style={containerStyle}>
        <div className="card-body">
          <h5 className="card-title">Available Subscription Plans</h5>
          <div className="row">
            {availablePlans.map(plan => (
              <div key={plan.id} className="col-md-4 mb-3">
                <div className={`card h-100 ${plan.popular ? 'border-primary' : ''}`}>
                  {plan.popular && <div className="card-header bg-primary text-white">Most Popular</div>}
                  <div className="card-body">
                    <h5 className="card-title">{plan.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{plan.price}</h6>
                    <p className="card-text">{plan.description}</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
