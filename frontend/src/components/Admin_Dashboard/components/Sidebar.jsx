import React, { useState } from "react";
import "./Sidebar.css";
// import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ... (imports and other code)

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0"
    },
    false: {
      left: "-60%"
    }
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <span>
            Ha<span>ppy</span> Fa<span>ces</span>
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => (
            <Link
              to={item.path}
              className={
                selected === index ? "menuItem active" : "menuItem"
              }
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          ))}
          {/* signoutIcon */}
          <Link to="/logout" className="menuItem">
            <UilSignOutAlt />
            <h3>Logout</h3>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

