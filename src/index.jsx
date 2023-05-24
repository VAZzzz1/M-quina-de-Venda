import React from "react";
import { createRoot } from "react-dom/client";
import VendingMachine from "./components/VendingMachine";
import Footer from "./footer";
import Navbar from "./navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <VendingMachine />
      <Footer />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
