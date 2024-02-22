import React, { useEffect, useState } from "react";
import "./MainDash.css";
 
const MainDash = () => {
  // Define initial data for each card with different messages
  const initialData = [
    { title: "Total Contributions", value: 100, message: "Thank you for your generous contributions!" },
    { title: "Events Attended", value: 20, message: "Great job attending our events! Keep it up!" },
    { title: "Total Payment Donated", value: 5000, message: "Your donations are making a big impact. Thank you!" }
    // Add more cards as needed
  ];
 
  // Static transaction data
  const transactions = [
    { orphanageName: "Orphanage A", transactionId: 12345, date: "2024-02-15", amount: 100 },
    { orphanageName: "Orphanage B", transactionId: 12346, date: "2024-02-10", amount: 150 },
    { orphanageName: "Orphanage C", transactionId: 12347, date: "2024-02-05", amount: 200 },
    { orphanageName: "Orphanage D", transactionId: 12348, date: "2024-02-01", amount: 250 }
  ];
 
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
 
  useEffect(() => {
    // Add any necessary side effects here
  }, []);
 
  const handleCardClick = (index) => {
    const { message } = initialData[index];
    setModalMessage(message);
    setShowModal(true);
    setSelectedCard(index);
  };
 
  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };
 
  return (
    <div className="MainDash">
      <h1 className="dashboard-heading">Donor's Dashboard</h1>
      <div className="MainDashcard-container">
        {initialData.map((data, index) => (
          <div key={index} className="MainDashcard" onClick={() => handleCardClick(index)}>
            <h2>{data.title}</h2>
            <p>{data.value}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={`modal ${selectedCard != null ? "modal-active" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Orphanage Name</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.orphanageName}</td>
              <td>{transaction.transactionId}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default MainDash;
 