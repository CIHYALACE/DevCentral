import React from 'react';

export default function Devices() {
  // Add custom styles for wide screens
  const containerStyle = {
    maxWidth: '100%',
    width: '100%'
  };
  
  return (
    <div className="devices w-100">
      <h2 className="mb-4">Connected Devices</h2>
      <div className="card mb-4 w-100" style={containerStyle}>
        <div className="card-body">
          <h5 className="card-title">Your Devices</h5>
          <p className="card-text text-muted">Devices that have been used to access your account</p>
          
          <div className="list-group">
            <div className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-laptop me-2"></i>
                  <strong>Windows PC</strong>
                  <span className="badge bg-success ms-2">Current Device</span>
                </div>
                <div>
                  <small className="text-muted">Last active: Now</small>
                </div>
              </div>
              <div className="mt-1 ms-4 text-muted small">
                <div>Chrome Browser • Windows 11</div>
                <div>IP: 192.168.1.1 • Location: Cairo, Egypt</div>
              </div>
            </div>
            
            <div className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-phone me-2"></i>
                  <strong>iPhone 13</strong>
                </div>
                <div>
                  <small className="text-muted">Last active: Yesterday</small>
                </div>
              </div>
              <div className="mt-1 ms-4 text-muted small">
                <div>Safari Browser • iOS 16.5</div>
                <div>IP: 192.168.1.2 • Location: Cairo, Egypt</div>
              </div>
              <div className="mt-2 ms-4">
                <button className="btn btn-sm btn-outline-danger">Remove Device</button>
              </div>
            </div>
            
            <div className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-tablet me-2"></i>
                  <strong>iPad Pro</strong>
                </div>
                <div>
                  <small className="text-muted">Last active: 3 days ago</small>
                </div>
              </div>
              <div className="mt-1 ms-4 text-muted small">
                <div>Safari Browser • iPadOS 16.4</div>
                <div>IP: 192.168.1.3 • Location: Alexandria, Egypt</div>
              </div>
              <div className="mt-2 ms-4">
                <button className="btn btn-sm btn-outline-danger">Remove Device</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card w-100" style={containerStyle}>
        <div className="card-body">
          <h5 className="card-title">Device Settings</h5>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="notifyNewDevices" checked />
            <label className="form-check-label" htmlFor="notifyNewDevices">
              Notify me when a new device logs into my account
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="requireVerification" checked />
            <label className="form-check-label" htmlFor="requireVerification">
              Require verification for new devices
            </label>
          </div>
          <button className="btn btn-danger">Sign Out From All Devices</button>
        </div>
      </div>
    </div>
  );
}
