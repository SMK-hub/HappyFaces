// BasicTable.jsx
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useUser } from "../../../../UserContext";
import { message } from "antd";




export default function BasicTable() {
  
  const {userDetails} =useUser();
  const [sortedData, setSortedData] = React.useState([]);
  const [data,setData] = React.useState([]);

  React.useEffect(()=>{
    const donationData = async()=>{
      try{
        const response = await axios.get(`${API_BASE_URL}/orphanage/DonationList/${userDetails.orpId}`);
        const status = response.status;
        if(status === 200){
          const datas=response.data;
          const donationWithDonorData = await Promise.all(
            datas.map(async(data)=>{
              const donorData = await getDonorData(data.id);
              return {
                ...data,
                donorData:donorData,
              }
            })
          )
          setData(donationWithDonorData);
          const sorted = [...donationWithDonorData].sort((a, b) => new Date(a.date) - new Date(b.date));
          const firstFour = sorted.slice(0, 4);
          setSortedData(firstFour);
        }
      }catch(error){
        message.error(error);
      }
    } 
    donationData();
  },[data])
  const getDonorData = async(donorId)=>{
    try{
      const response = await axios.get(`${API_BASE_URL}/orphanage/donor/${donorId}`)
      return response.data; 
    }catch(error){
      message.error(error);
    }
  }
  
  
  return (
   
        <div className="Table">
          <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: '1em' , justifyContent: 'left' , padding : '1em'}}>Donation Details</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Donor Name</TableCell>
                  <TableCell align="left">Transaction ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {sortedData?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.donorData.donorId}
                    </TableCell>
                    <TableCell align="left">{row.transactionId}</TableCell>
                    <TableCell align="left">{row.dateTime}</TableCell>
                    <TableCell align="left">
                      <span className="status">
                        {row.amount}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    //   </div>
    //   <RightSide />
    // </div>
  );
}
