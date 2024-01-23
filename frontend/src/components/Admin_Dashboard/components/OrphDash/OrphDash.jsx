import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./OrphDash.css";
const OrphDash = () => {
  return (
    <div className="OrphDash">
      <h1>Dashboard</h1> 
      <Cards />
      <Table />  
    </div>
  );
};

export default OrphDash;
