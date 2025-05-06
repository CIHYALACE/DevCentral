import React, { useState, useEffect } from 'react';
import { profileStore, fetchCurrentUserProfile, updateUserProfile } from '../../store/profileStore';
import { logout } from '../../store';
import { requestDeveloperRole } from '../../store/authStore';

export default function InfoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeveloperRequestModal, setShowDeveloperRequestModal] = useState(false);
  const [developerComment, setDeveloperComment] = useState('');
  const [requestingDeveloper, setRequestingDeveloper] = useState(false);
  const [developerRequestError, setDeveloperRequestError] = useState(null);
  const [developerRequestSuccess, setDeveloperRequestSuccess] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    location: '',
    bio: '',
    role: 'user'
  });
  
  // Fetch user profile data when component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        await fetchCurrentUserProfile();
        const profile = profileStore.state.currentProfile;
        
        if (profile) {
          setUserData({
            name: profile.user?.name || '',
            email: profile.user?.email || '',
            phone: profile.phone_number || '',
            country: profile.country || '',
            location: profile.location || '',
            bio: profile.bio || '',
            role: profile.user?.role || 'user'
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, []);
  
  // Add custom styles for wide screens
  const containerStyle = {
    maxWidth: '100%',
    width: '100%'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for API update
      const profileData = {
        phone_number: userData.phone,
        country: userData.country,
        location: userData.location,
        bio: userData.bio
      };
      
      // If name changed, include it in the update
      if (userData.name !== profileStore.state.currentProfile?.user?.name) {
        profileData.user = {
          name: userData.name
        };
      }
      
      await updateUserProfile(profileData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile data');
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  return (
    <div className="info-section w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Information</h2>
        {!isEditing && (
          <button 
            className="btn btn-primary" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="card w-100" style={containerStyle}>
        <div className="card-body">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="phone" 
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="country" 
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="location" className="form-label">location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="location" 
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea 
                  className="form-control" 
                  id="bio" 
                  name="bio"
                  rows="3"
                  value={userData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <p><strong>Full Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Location:</strong> {userData.location}, {userData.country}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Bio:</strong></p>
                <p>{userData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Developer Request Section */}
      {userData.role === 'user' && (
        <div className="mt-4 w-100">
          <h3>Developer Status</h3>
          <div className="card w-100" style={containerStyle}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">Request Developer Role</h5>
                  <p className="text-muted mb-0">Become a developer and publish your own applications</p>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setShowDeveloperRequestModal(true);
                    setDeveloperRequestError(null);
                    setDeveloperRequestSuccess(false);
                  }}
                >
                  Request Developer Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 w-100">
        <h3>Account Security</h3>
        <div className="card w-100" style={containerStyle}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-0">Password</h5>
                <p className="text-muted mb-0">Secure your account with a strong password</p>
              </div>
              <button className="btn btn-outline-primary">Change Password</button>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-0">Two-Factor Authentication</h5>
                <p className="text-muted mb-0">Enhance your account security</p>
              </div>
              <button className="btn btn-outline-primary">Enable</button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Log out</h5>
              </div>
              <button className="btn btn-outline-primary" onClick={logout}>Log out</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Developer Request Modal */}
      {showDeveloperRequestModal && (
        <div className="modal fade show" id="developerRequestModal" tabIndex="-1" aria-labelledby="developerRequestModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="developerRequestModalLabel">Request Developer Role</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeveloperRequestModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {developerRequestError && (
                  <div className="alert alert-danger">{developerRequestError}</div>
                )}
                
                {developerRequestSuccess && (
                  <div className="alert alert-success">
                    Your request has been submitted successfully! We'll review it shortly.
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="developerComment" className="form-label">Comment (Optional)</label>
                  <textarea 
                    className="form-control" 
                    id="developerComment"
                    rows="3"
                    placeholder="Tell us why you want to be a developer..."
                    value={developerComment} 
                    onChange={(e) => setDeveloperComment(e.target.value)}
                    disabled={developerRequestSuccess}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeveloperRequestModal(false)}
                  disabled={requestingDeveloper}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      setRequestingDeveloper(true);
                      setDeveloperRequestError(null);
                      await requestDeveloperRole(developerComment);
                      setDeveloperRequestSuccess(true);
                      
                      // Close modal after a short delay
                      setTimeout(() => {
                        setShowDeveloperRequestModal(false);
                        setDeveloperRequestSuccess(false);
                        setDeveloperComment('');
                      }, 2000);
                    } catch (err) {
                      console.error("Error submitting developer request:", err);
                      setDeveloperRequestError(
                        err.response?.data?.error || 
                        "Failed to submit request. Please try again."
                      );
                    } finally {
                      setRequestingDeveloper(false);
                    }
                  }}
                  disabled={requestingDeveloper || developerRequestSuccess}
                >
                  {requestingDeveloper ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Submitting...</span>
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
