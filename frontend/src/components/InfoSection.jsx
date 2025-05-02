import React, { useState, useEffect } from "react";
import { profileStore, fetchCurrentUserProfile, updateUserProfile } from "../store";
import { authStore } from "../store/authStore";
import ProfileHeader from "./ProfileHeader";
import { Form, Button, Spinner, Alert, Modal } from "react-bootstrap";

export default function InfoSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchCurrentUserProfile();
        setProfile(profileStore.state.currentProfile);
        setUser(authStore.state.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    // Subscribe to store changes
    const unsubscribeProfile = profileStore.subscribe(
      (state) => state.currentProfile,
      (currentProfile) => setProfile(currentProfile)
    );

    const unsubscribeAuth = authStore.subscribe(
      (state) => state.user,
      (user) => setUser(user)
    );

    return () => {
      unsubscribeProfile();
      unsubscribeAuth();
    };
  }, []);

  const handleEdit = (field, currentValue) => {
    setEditField(field);
    setEditValue(currentValue || '');
    setShowEditModal(true);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setUpdateError(null);
      
      let updateData = {};
      
      // Handle different fields
      if (editField === 'name') {
        updateData = { user: { name: editValue } };
      } else if (editField === 'phone_number') {
        updateData = { phone_number: editValue };
      } else if (editField === 'date_of_birth') {
        updateData = { date_of_birth: editValue };
      } else if (editField === 'country') {
        updateData = { country: editValue };
      } else if (editField === 'bio') {
        updateData = { bio: editValue };
      } else if (editField === 'location') {
        updateData = { location: editValue };
      }
      
      console.log('Sending update data:', updateData);
      await updateUserProfile(updateData);
      setUpdateSuccess(true);
      
      // Close modal after a short delay
      setTimeout(() => {
        setShowEditModal(false);
        setUpdateSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
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

  const profilePicture = profile?.picture || user?.picture || 'https://via.placeholder.com/150';

  return (
    <section className="info-section">
      <ProfileHeader title="Your info" />
      
      {updateSuccess && (
        <Alert variant="success" className="mb-3">
          Profile updated successfully!
        </Alert>
      )}
      
      <div className="photo-card d-flex align-items-center p-3 border rounded mb-4">
        <img 
          src={profilePicture} 
          alt="profile" 
          className="rounded-circle me-3" 
          style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
        />
        <div className="photo-info">
          <p className="mb-2">Personalize your account with a photo</p>
          <Button variant="outline-primary" size="sm">
            Change photo
          </Button>
        </div>
      </div>

      <div className="field border-bottom pb-3 mb-3">
        <strong className="d-block mb-1">Full name</strong>
        <p className="mb-1">{user?.name || '—'}</p>
        <Button 
          variant="link" 
          className="p-0" 
          onClick={() => handleEdit('name', user?.name)}
        >
          Edit name
        </Button>
      </div>

      <div className="info-block border-bottom pb-3 mb-3">
        <div className="info-rows">
          <div className="info-row d-flex justify-content-between py-2">
            <strong>Phone Number</strong>
            <span>{profile?.phone_number || user?.phone_number || '—'}</span>
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => handleEdit('phone_number', profile?.phone_number || user?.phone_number)}
            >
              Edit
            </Button>
          </div>
          <div className="info-row d-flex justify-content-between py-2">
            <strong>Date of birth</strong>
            <span>{formatDate(profile?.date_of_birth)}</span>
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => handleEdit('date_of_birth', profile?.date_of_birth)}
            >
              Edit
            </Button>
          </div>
          <div className="info-row d-flex justify-content-between py-2">
            <strong>Country or region</strong>
            <span>{profile?.country || '—'}</span>
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => handleEdit('country', profile?.country)}
            >
              Edit
            </Button>
          </div>
          <div className="info-row d-flex justify-content-between py-2">
            <strong>Location</strong>
            <span>{profile?.location || '—'}</span>
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => handleEdit('location', profile?.location)}
            >
              Edit
            </Button>
          </div>
          <div className="info-row d-flex justify-content-between py-2">
            <strong>Bio</strong>
            <span>{profile?.bio ? (profile.bio.length > 30 ? profile.bio.substring(0, 30) + '...' : profile.bio) : '—'}</span>
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => handleEdit('bio', profile?.bio)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="field">
        <strong className="d-block mb-1">Email address</strong>
        <p className="mb-1">{user?.email || '—'}</p>
        <small className="text-muted d-block mb-2">Email cannot be changed directly. Contact support for assistance.</small>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField.replace('_', ' ')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateError && (
            <Alert variant="danger" className="mb-3">
              {updateError}
            </Alert>
          )}
          
          <Form>
            {editField === 'date_of_birth' ? (
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control 
                  type="date" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </Form.Group>
            ) : editField === 'phone_number' ? (
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="tel" 
                  pattern="^01\d{9}$"
                  placeholder="01XXXXXXXXX"
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Phone number must be 11 digits and start with '01'.
                </Form.Text>
              </Form.Group>
            ) : editField === 'bio' ? (
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>{editField.replace('_', ' ')}</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={updating}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={updating}>
            {updating ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Saving...</span>
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
