// PaymentDashboard.jsx
import React from 'react';
import './Payment.css'; // Import the corresponding CSS file


// Function to create data rows
function createData(name, amount, transactionId, time, status) {
  return { name, amount, transactionId, time, status };
}

const rows = [
  createData('John Doe', 100, 'TX123', '2024-01-20 08:30', 'Successful'),
  createData('Jane Smith', 50, 'TX124', '2024-01-21 12:45', 'Processing'),
  // Add more rows as needed
];

const getTotalAmount = () => {
  // Calculate the total amount from the rows
  return rows.reduce((total, row) => total + row.amount, 0);
};

const PaymentDashboard = () => {
  return (
    <div className="payment-dashboards">
      <div className="dashboard-container">
       
        <div className="main-content">
          <h1>Payment Dashboard</h1>
          <table className="payment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>${row.amount}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.time}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-amount">
            <p>Total Amount Collected:</p>
            <span>${getTotalAmount()}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentDashboard;
