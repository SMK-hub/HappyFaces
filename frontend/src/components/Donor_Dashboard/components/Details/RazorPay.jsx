import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import useRazorpay from "react-razorpay";

const RazorPay = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [Razorpay] = useRazorpay(); // Using useRazorpay hook at the top-level of the component

  const handleDonationInputChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonate = async () => {
    console.log(donationAmount);

    try {
      // Send donation amount to backend API
      const response = await axios.post("http://localhost:8079/donor/generateOrder", { amount: donationAmount });

      // Display response data
      alert(`Order ID: ${response.data.id}`);

      // Initialize Razorpay options
      const options = {
        key: "rzp_test_MO6ugcoVHpPBDT", // Enter the Key ID generated from the Dashboard
        amount: (donationAmount * 100).toString(), // Convert amount to currency subunits (paise)
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: response.data.id, // Pass the order ID obtained from the response of createOrder()
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // Close the donation pop-up
      onClose();

      // Reset donation amount
      setDonationAmount("");
    } catch (error) {
      // Handle errors
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <div className="razorpay-popup">
      <h3>Donate Money</h3>
      <div className="input-container">
        <label htmlFor="donationAmount">Amount you would like to Donate:</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleDonationInputChange}
          placeholder="Enter amount"
        />
      </div>
      <button onClick={handleDonate}>Donate</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RazorPay;
