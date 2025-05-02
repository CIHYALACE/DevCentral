import React from 'react';

export default function OrderHistory() {
  // Add custom styles for wide screens
  const containerStyle = {
    maxWidth: '100%',
    width: '100%'
  };
  
  return (
    <div className="order-history w-100">
      <h2 className="mb-4">Order History</h2>
      <div className="card mb-4 w-100" style={containerStyle}>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-2025-1234</td>
                  <td>May 1, 2025</td>
                  <td>
                    <div>Premium Subscription (1 month)</div>
                  </td>
                  <td>$9.99</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-2025-1189</td>
                  <td>April 25, 2025</td>
                  <td>
                    <div>Productivity Suite Pro</div>
                    <div>Photo Editor Plus</div>
                  </td>
                  <td>$59.98</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-2025-1087</td>
                  <td>April 15, 2025</td>
                  <td>
                    <div>Game Pass (1 month)</div>
                  </td>
                  <td>$14.99</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-2025-0986</td>
                  <td>April 5, 2025</td>
                  <td>
                    <div>Adventure Quest Deluxe</div>
                  </td>
                  <td>$29.99</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-2025-0892</td>
                  <td>March 28, 2025</td>
                  <td>
                    <div>Premium Subscription (1 month)</div>
                  </td>
                  <td>$9.99</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Order history pagination">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
