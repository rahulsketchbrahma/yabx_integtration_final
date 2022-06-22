import React from "react";
import Logo from "../../assets/image3.png";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className="Navbar__wrapper">
        <div className="Navbar">
          <div className="Navbar__container">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
