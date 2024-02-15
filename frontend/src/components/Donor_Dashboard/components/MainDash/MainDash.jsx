import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./MainDash.css";
import Women from "../../imgs/Women.png"; // Adjust the path based on the directory structure
 
const MainDash = () => {
  // Define initial data for each card with different messages
  const initialData = [
    { title: "Total Contributions", value: 100, message: "Thank you for your generous contributions!" },
    { title: "Events Attended", value: 20, message: "Great job attending our events! Keep it up!" },
    { title: "Total Payment Donated", value: 5000, message: "Your donations are making a big impact. Thank you!" }
    // Add more cards as needed
  ];
 
  const [blink, setBlink] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
 
  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink(false);
    }, 1000); // Adjust the duration of the blink animation
 
    return () => {
      clearTimeout(blinkTimeout);
    };
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
      <div className={`MainDashcard-container ${blink ? "blink" : ""}`}>
        {initialData.map((data, index) => (
          <div key={index} className={`MainDashcard`} onClick={() => handleCardClick(index)}>
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
      {selectedCard != null && <Confetti />}
      <img src={Women} alt="Cartoon Woman" className="cartoon-woman" />
    </div>
  );
};
 
export default MainDash;