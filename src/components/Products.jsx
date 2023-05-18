import React, { useState } from "react";
import "../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from "./log";

function Products(props) {
  const getCurrentTime = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${date.toLocaleDateString("pt-PT", options)}`;
  };

  function handleScrollToBottom() {
    const bottomElement = document.querySelector("footer");
    bottomElement.scrollIntoView({ behavior: "smooth" });
  }

  // eslint-disable-next-line no-unused-vars
  const [insertedCoins, setInsertedCoins] = useState(0);

  function handleSelectProduct(product) {
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
              {props.insertedCoins >= product.price ? (
                <button
                  className="Selecionar"
                  onClick={() => {
                    handleSelectProduct(product);
                    handleScrollToBottom();
                  }}
                >
                  <span className="Selecionar_lg">
                    <span className="Selecionar_sl"></span>
                    <span className="Selecionar_text">Selecionar</span>
                  </span>
                </button>
              ) : (
                <span style={{ color: "red", marginLeft: "40px" }}>
                  Insira moedas suficientes
                </span>
              )}
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
