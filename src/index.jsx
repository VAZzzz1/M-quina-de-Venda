import React from "react";
import { createRoot } from "react-dom/client";
import VendingMachine from "./components/VendingMachine";
import Footer from "./footer";
import Navbar from "./navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <h2 className="moedeiro">Conteúdo do Moedeiro</h2>
      <VendingMachine />
      <Footer />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
