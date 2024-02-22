import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { API_BASE_URL } from "../../../../config";
import axios from "axios";
import { useUser } from "../../../../UserContext";




export default function BasicTable() {
  const [transactions ,setTransactions]=useState();
  
  const {userDetails} = useUser();
  useEffect(()=>{
    const getDonationData = async()=>{
    try{
      const donationResponse =await axios.get(`${API_BASE_URL}/orphanage/donation/${userDetails.orpId}`);
      const donationData = await Promise.all(
        donationResponse.data.map(async (donation)=>{
            const donorData = await axios.get(`${API_BASE_URL}/orphanage/donor/${donation.donorId}`);
            console.log(donorData.data);
            return{
              ...donation,
              donorData:donorData.data,
            }
        }));
      console.log(donationData);
      console.log(donationData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).slice(0, 5));
      setTransactions(donationData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).slice(0, 5));
    }catch(error){
      console.log(error);
    }
    }
    getDonationData();
  },[])

  return (
    <div className="Table">
      <div className="LastTransactionsTable">
        <h3>Donation Details</h3>
        <TableContainer component={Paper}>
          <Table aria-label="last 4 transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Donor Name</TableCell>
                <TableCell align="left">Transaction ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.donorData.name}</TableCell>
                  <TableCell align="left">{transaction.transactionId}</TableCell>
                  <TableCell align="left">{transaction.dateTime}</TableCell>
                  <TableCell align="left">Rs.{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
