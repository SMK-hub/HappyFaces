// BasicTable.jsx
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date) {
  return { name, trackingId, date };
}

const rows = [
  createData("Tarun", 18908424, "2 January 2024"),
  createData("Sangeeta ", 18908424, "12 January 2024"),
  createData("Ankit", 18908424, "16 January 2024"),
  createData("Anjali", 18908421, "18 January 2024"),
];

export default function BasicTable() {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDetailsClick = (index) => {
    setSelectedRow(index);
    // Implement logic to show details for the selected row
    // You can use a modal or any other component to display details
  };

  return (
    <div className="Table">
      <h3>Donation Details</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Orphanage Name</TableCell>
              <TableCell align="left">Transaction ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left" className="Details">
                  <button
                    onClick={() => handleDetailsClick(index)}
                    className={`DetailsButton ${
                      selectedRow === index ? "Active" : ""
                    }`}
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
