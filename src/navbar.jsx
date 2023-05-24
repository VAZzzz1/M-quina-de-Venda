/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../src/css/nf.css";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleHomeClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500); // Ajuste o tempo de acordo com a duração da animação do loader
    }, 2000);
  };

  return (
    <nav>
      <div className="navbar-logo">
        <img className="logo" src="../img/vending-machine.png" alt="Logo" />
      </div>
      <h1>Afonso Vaz - VendingMachine</h1>
      <ul className="navbar-links">
        <li>
          <a href="#" onClick={handleHomeClick}>
            Home
          </a>
        </li>
      </ul>
      {isLoading && (
        <div id="fullscreen-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
          </svg>
          <div className="text" data-text="Searching"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
