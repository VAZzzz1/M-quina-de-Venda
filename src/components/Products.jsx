import React, { useState } from "react";
import "../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from "./log";

function Products(props) {
  const getCurrentTime = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return `${date.toLocaleDateString('pt-PT', options)}`;
  }; 

  function handleScrollToBottom() {
    const bottomElement = document.querySelector("footer");
    bottomElement.scrollIntoView({ behavior: "smooth" }); 
  }

  const [insertedCoins, setInsertedCoins] = useState(0);

  function handleInsertCoins() {

    const coinValue = parseFloat(prompt("Insira o valor das suas moedas:"));

    if (
      !coinValue ||
      (coinValue !== 0.1 && coinValue !== 0.2 && coinValue !== 0.5)
    ) {
      alert("Por favor, insira com moedas de 0.10, 0.20 ou 0.50 cêntimos!");
      return;
    }

    setInsertedCoins((prev) => prev + coinValue);

    alert(`€ ${coinValue.toFixed(2)} inseridos!`, { autoClose: 1500 });
  }

  function handleSelectProduct(product) {
    if (product.quantity <= 0) {
      alert("Este produto está esgotado. Por favor, selecione outro produto.");
      return;
    }

    props.setSelectedProduct(product);
    setInsertedCoins((prev) => prev - product.price);
    logAndStore(`Selecionou a bebida ${product.name} - ${getCurrentTime()}`);
    notifyProductSelected(product);
  }

  function notifyProductSelected(product) {
    toast.success(`Produto ${product.name} selecionado!`, { autoClose: 1500 });
  }

  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.name}>
          <img src={product.img} alt={product.name} />
          {product.name} - € {product.price.toFixed(2)} ({product.quantity}{" "}
          disponíveis)
          {product.quantity > 0 && (
            <>
              {insertedCoins >= product.price ? (
                <button
                  onClick={() => {
                    handleSelectProduct(product);
                    handleScrollToBottom();
                  }}
                >
                  Selecionar
                </button>
              ) : (
                <span style={{ color: "red", marginLeft: "40px" }}>
                  Insira moedas suficientes
                </span>
              )}
              <button className="moedas" onClick={handleInsertCoins}>
                Inserir Moedas
              </button>
            </>
          )}
          {product.quantity === 0 && (
            <span style={{ color: "red", marginLeft: "40px" }}>
              Este produto está esgotado
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Products;