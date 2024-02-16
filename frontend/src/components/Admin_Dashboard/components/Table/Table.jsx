import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";
import {API_BASE_URL} from '../../../../config'

const makeStyle=(status)=>{
  if(status === 'NOT_VERIFIED')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'red',
    }
  }
}

export default function BasicTable() {

  const [orphanagesData, setOrphanagesData] = useState([]);
  
  useEffect(() => {
    fetchOrphanages();
    // updateOrphanageStatus();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/orphanageDetailsList`);
      const data = response.data
        .filter(orphanage => orphanage.verificationStatus !== 'VERIFIED')
        .map(orphanage => ({
          ...orphanage,
          name: orphanage.orphanageName,
          location: orphanage.address.city,
          contact: orphanage.contact,
          status: orphanage.verificationStatus,
          // director: orphanage.directorName,
          // web: orphanage.website,
          // email: orphanage.orphanageEmail,
          // desc: orphanage.description,
          // establishedDate: orphanage.establishedDate,
          // images: orphanage.images,
        }));
      console.log(data);
      setOrphanagesData(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching orphanages", error);
    }
  };

  return (
      <div className="Table">
      <h3>Recent Orphanages</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Contact</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {orphanagesData.map((orphanage,index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {orphanage.name}
                  </TableCell>
                  <TableCell align="left">{orphanage.location}</TableCell>
                  <TableCell align="left">{orphanage.contact}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(orphanage.status)}>{orphanage.status}</span>
                  </TableCell>
                  {/* <TableCell align="left" className="Details">Details</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}