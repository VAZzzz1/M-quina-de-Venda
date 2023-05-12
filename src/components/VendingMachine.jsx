import React, { useState } from "react";
import Products from "./Products";
import Coin from "./Coin";
import Log from "./Log.jsx";
import "../css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from './log';

function VendingMachine() {
  const [coins, setCoins] = useState(31); // valor total em cêntimos
  const [coinsQuantity20, setCoinsQuantity20] = useState(50); // quantidade de moedas de 20 cêntimos no moedeiro
  const [coinsQuantity10, setCoinsQuantity10] = useState(60); // quantidade de moedas de 10 cêntimos no moedeiro
  const [coinsQuantity50, setCoinsQuantity50] = useState(30); // quantidade de moedas de 50 cêntimos no moedeiro
  const productData = [
    { name: "Coca-Cola", price: 1.2, quantity: 10, img: "../img/coca-cola.png" },
    { name: "Soda-Sprite", price: 0.8, quantity: 5, img: "../img/sprite.png" },
    { name: "USMug Beer", price: 7.0, quantity: 8, img: "../img/mugbeer.png" },
    { name: "Canada Dryy", price: 1.6, quantity: 6, img: "../img/canadadry.png" },
    { name: "Soda-Crush", price: 6.0, quantity: 7, img: "../img/crush.png" },
    { name: "Dr. Pepper", price: 1.75, quantity: 10, img: "../img/drpepper.png" },
    { name: "Soda-Fanta", price: 0.75, quantity: 9, img: "../img/fanta.png" },
    { name: "Br. Guarana", price: 1.5, quantity: 9, img: "../img/guarana.png" },
    { name: "Mount Dew", price: 2.65, quantity: 5, img: "../img/mountaindew.png" },
    { name: "SodaPepsi", price: 0.8, quantity: 10, img: "../img/pepsi.png" },
    { name: "Seven Up", price: 0.8, quantity: 10, img: "../img/sevenup.png" },
    { name: "SodaSumol", price: 0.63, quantity: 9, img: "../img/sumol.png" },
  ];
  
  const [products, setProducts] = useState(productData);

  const [selectedProduct, setSelectedProduct] = useState(null); // produto selecionado pelo utilizador
  const [insertedCoins, setInsertedCoins] = useState(0); // moedas inseridas pelo utilizador
  const [changeCoins, setChangeCoins] = useState(0); // moedas de troco

  // função para exibir notificação de compra bem sucedida
  function notifyPurchaseSuccessful() {
    toast.success(`${selectedProduct.name} comprada com sucesso!`, { autoClose: 2500 });
  }

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return `${hours}:${minutes} ${date.toLocaleDateString('pt-BR', options)}`;
  }; 

  // função para concluir a compra
  function handlePurchase() {
    if (
      selectedProduct &&
      insertedCoins + changeCoins >= selectedProduct.price &&
      selectedProduct.quantity > 0
    ) {
      // Calcula o troco
      const change = insertedCoins + changeCoins - selectedProduct.price;
      // Calculates the number of coins of each denomination needed to give the change
      let num50Coins = Math.floor(change / 50);
      let num10Coins = Math.floor((change % 50) / 10);
      let num20Coins = Math.floor(((change % 50) % 10) / 0.2); // adiciona o cálculo das moedas de 20 centavos
      if (change > coins + coinsQuantity10 * 10 + coinsQuantity50 * 50) {
        alert("Desculpe, não há moedas suficientes para dar o troco.");
        return;
      }
      // Updates the state of the coins and their quantities
      setCoins(
        (prevCoins) => prevCoins + insertedCoins - selectedProduct.price
      );
      setCoinsQuantity50(
        (prevCoinsQuantity50) => prevCoinsQuantity50 - num50Coins
      );
      setCoinsQuantity10(
        (prevCoinsQuantity10) => prevCoinsQuantity10 - num10Coins
      );
      setCoinsQuantity20(
        (prevCoinsQuantity20) => prevCoinsQuantity20 - num20Coins
      );

      setCoins((prevCoins) => prevCoins + selectedProduct.price - change);

      if (change > 0) {
        logAndStore(`Recebeu ${change.toFixed(2).toString()} cêntimos de troco - ${getCurrentTime()}`);
        toast.success(`Recebeu troco de € ${change.toFixed(2)}`, {
          autoClose: 2000,
        });
      }
      setChangeCoins(0);
      setInsertedCoins(0);
      notifyPurchaseSuccessful(change);
      logAndStore(`${selectedProduct.name} comprada com sucesso! - ${getCurrentTime()}`);
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.name === selectedProduct.name) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
      });
      window.scrollTo(0, 0);
    } else {
      alert(`${selectedProduct.name} indisponível.`);
    }
  }

  return (
    <div className="vending-machine">
      <h2 className="total">Valor total: € {coins.toFixed(2)}</h2>
      <h2 className="quantidade">Quantidade de Moedas:</h2>
      <h2 className="quant">Moedas de 20 Cent: {coinsQuantity20}</h2>
      <h2 className="quant">Moedas de 10 Cent: {coinsQuantity10}</h2>
      <h2 className="quant">Moedas de 50 Cent: {coinsQuantity50}</h2>
      <h2>Produtos disponíveis:</h2>
      <br></br>
      <Products products={products} setSelectedProduct={setSelectedProduct} />
      {selectedProduct && (
        <div>
          <h2>
            Produto selecionado: {selectedProduct.name} - €{" "}
            {selectedProduct.price.toFixed(2)}
          </h2>
          <h2>Valor inserido: € {insertedCoins.toFixed(2)}</h2>
          <div className="product-image-container">
            {selectedProduct.name === "Coca-Cola" && (
              <img src="../img/coca-cola.png" alt="Coca-Cola" />
            )}
            {selectedProduct.name === "Soda-Sprite" && (
              <img src="../img/sprite.png" alt="Sprite" />
            )}
            {selectedProduct.name === "USMug Beer" && (
              <img src="../img/mugbeer.png" alt="Mug Beer" />
            )}
            {selectedProduct.name === "Canada Dryy" && (
              <img src="../img/canadadry.png" alt="Canada Dry" />
            )}
            {selectedProduct.name === "Soda-Crush" && (
              <img src="../img/crush.png" alt="Crush" />
            )}
            {selectedProduct.name === "Dr. Pepper" && (
              <img src="../img/drpepper.png" alt="Dr. Pepper" />
            )}
            {selectedProduct.name === "Soda-Fanta" && (
              <img src="../img/fanta.png" alt="Fanta" />
            )}
            {selectedProduct.name === "Br. Guarana" && (
              <img src="../img/guarana.png" alt="Guarana" />
            )}
            {selectedProduct.name === "Mount Dew" && (
              <img src="../img/mountaindew.png" alt="Mountain Dew" />
            )}
            {selectedProduct.name === "SodaPepsi" && (
              <img src="../img/pepsi.png" alt="Pepsi" />
            )}
            {selectedProduct.name === "Seven Up" && (
              <img src="../img/sevenup.png" alt="SevenUp" />
            )}
            {selectedProduct.name === "SodaSumol" && (
              <img src="../img/sumol.png" alt="Sumol" />
            )}
          </div>
          <Coin
            coinsQuantity50={coinsQuantity50}
            coinsQuantity20={coinsQuantity20}
            coinsQuantity10={coinsQuantity10}
            insertedCoins={insertedCoins}
            setCoinsQuantity50={setCoinsQuantity50}
            setCoinsQuantity20={setCoinsQuantity20}
            setCoinsQuantity10={setCoinsQuantity10}
            setInsertedCoins={setInsertedCoins}
          />
          <button className="purchase-button" onClick={handlePurchase}>
            Comprar
          </button>
          <button
            className="close-button"
            onClick={() => setSelectedProduct(null)}
          >
            Fechar
          </button>
          <Log />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default VendingMachine;