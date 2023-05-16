/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleHomeClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      });
    }, 2000);
  };  

  return (
    <nav>
      <div className="navbar-logo">
        <img className="logo" src="../img/vending-machine.png" alt="Logo" />
        <h1>Afonso Vaz - VendingMachine</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#" onClick={handleHomeClick}>
            Home
          </a>
        </li>
      </ul>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;