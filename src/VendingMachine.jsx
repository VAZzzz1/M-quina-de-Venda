import React, { useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VendingMachine() {
  const [coins, setCoins] = useState(31); // valor total em cêntimos
  const [coinsQuantity20, setCoinsQuantity20] = useState(50); // quantidade de moedas de 20 cêntimos no moedeiro
  const [coinsQuantity10, setCoinsQuantity10] = useState(60); // quantidade de moedas de 10 cêntimos no moedeiro
  const [coinsQuantity50, setCoinsQuantity50] = useState(30); // quantidade de moedas de 50 cêntimos no moedeiro
  const [products, setProducts] = useState([
    {
      name: "Coca-Cola",
      price: 1.2,
      quantity: 10,
      img: "../img/coca-cola.png",
    },
    {
      name: "Soda-Sprite",
      price: 0.8,
      quantity: 5,
      img: "../img/sprite.png",
    },
    {
      name: "USMug Beer",
      price: 7.0,
      quantity: 8,
      img: "../img/mugbeer.png",
    },
    {
      name: "Canada Dryy",
      price: 1.6,
      quantity: 6,
      img: "../img/canadadry.png",
    },
    {
      name: "Soda-Crush",
      price: 6.0,
      quantity: 7,
      img: "../img/crush.png",
    },
    {
      name: "Dr. Pepper",
      price: 1.75,
      quantity: 10,
      img: "../img/drpepper.png",
    },
    {
      name: "Soda-Fanta",
      price: 0.75,
      quantity: 9,
      img: "../img/fanta.png",
    },
    {
      name: "Br. Guarana",
      price: 1.5,
      quantity: 9,
      img: "../img/guarana.png",
    },
    {
      name: "Mount Dew",
      price: 2.65,
      quantity: 5,
      img: "../img/mountaindew.png",
    },
    {
      name: "SodaPepsi",
      price: 0.8,
      quantity: 10,
      img: "../img/pepsi.png",
    },
    {
      name: "Seven Up",
      price: 0.8,
      quantity: 10,
      img: "../img/sevenup.png",
    },
    {
      name: "SodaSumol",
      price: 0.63,
      quantity: 9,
      img: "../img/sumol.png",
    },
  ]); // produtos disponíveis na máquina

  const [selectedProduct, setSelectedProduct] = useState(null); // produto selecionado pelo utilizador
  const [insertedCoins, setInsertedCoins] = useState(0); // moedas inseridas pelo utilizador
  const [changeCoins, setChangeCoins] = useState(0); // moedas de troco

   // função para exibir notificação de moedas inseridas
   function notifyCoinInserted(value) {
    toast.info(`Moeda de ${value.toFixed(2)} cêntimo inserida!`);
  }

  // função para exibir notificação de produto selecionado
  function notifyProductSelected(product) {
    toast.success(`Produto ${product.name} selecionado!`);
  }

  // função para exibir notificação de compra bem sucedida
  function notifyPurchaseSuccessful(change) {
    toast.success(`Compra realizada com sucesso! Troco: ${change.toFixed(2)} cêntimos`);
  }

  function handleScrollToBottom() {
    const bottomElement = document.querySelector("footer"); // substitua "myFooter" pelo ID do elemento onde deseja rolar a página
    bottomElement.scrollIntoView({ behavior: "smooth" }); // use "smooth" para rolar suavemente até o elemento
  }

  function handleInsertCoins(value) {
    switch (value) {
      case 0.5:
        setCoinsQuantity50((prevCoins) => prevCoins + 1);
        break;
      case 0.2:
        setCoinsQuantity20((prevCoins) => prevCoins + 1);
        break;
      case 0.1:
        setCoinsQuantity10((prevCoins) => prevCoins + 1);
        break;
      default:
        break;
    }
  }

  // função para atualizar o estado de moedas inseridas
  function handleInsertCoin() {
    setInsertedCoins((prevCoins) => prevCoins + 0.2);
    handleInsertCoins(0.2);
    console.log(`Moeda de 0.20 cêntimos inserida`);
    notifyCoinInserted(0.2);
  }

  // função para inserir moedas de 10 cêntimos
  function handleInsertCoin10() {
    setInsertedCoins((prevCoins) => prevCoins + 0.1);
    handleInsertCoins(0.1);
    console.log(`Moeda de 0.10 cêntimos inserida`);
    notifyCoinInserted(0.1);
  }

  // função para inserir moedas de 50 cêntimos
  function handleInsertCoin50() {
    setInsertedCoins((prevCoins) => prevCoins + 0.5);
    handleInsertCoins(0.5);
    console.log(`Moeda de 0.50 cêntimos inserida`);
    notifyCoinInserted(0.5);
  }

  // função para selecionar o produto desejado
  function handleSelectProduct(product) {
    setSelectedProduct(product);
    notifyProductSelected(product);
  }

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
        console.log(`Troco a receber: € ${change.toFixed(2)}`);
        alert(`Por favor, recolha o seu troco de € ${change.toFixed(2)}`);
      }
      setChangeCoins(0);
      setInsertedCoins(0);
      notifyPurchaseSuccessful(change);
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.name === selectedProduct.name) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
      });
      console.log(
        `A sua bebida: ${selectedProduct.name} foi comprada com sucesso.`
      );
      alert(`Por favor recolha a sua ${selectedProduct.name}.`);
      setSelectedProduct(null);
      window.scrollTo(0, 0);
    } else {
      console.log(`A sua bebida: ${selectedProduct.name} está indisponível.`);
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
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <img src={product.img} alt={product.name} />
            {product.name} - € {product.price.toFixed(2)} ({product.quantity}{" "}
            disponíveis)
            <button
              onClick={() => {
                handleSelectProduct(product);
                console.log(`Produto selecionado: ${product.name}`);
                handleScrollToBottom();
              }}
            >
              Selecionar
            </button>
          </li>
        ))}
      </ul>
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
          <button className="coin10-button" onClick={handleInsertCoin10}>
            Inserir moeda de 10 cêntimos
          </button>
          <button className="coin-button" onClick={handleInsertCoin}>
            Inserir moeda de 20 cêntimos
          </button>
          <button className="coin50-button" onClick={handleInsertCoin50}>
            Inserir moeda de 50 cêntimos
          </button>
          <button className="purchase-button" onClick={handlePurchase}>
            Comprar
          </button>
          <button
            className="close-button"
            onClick={() => setSelectedProduct(null)}
          >
            Fechar
          </button>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default VendingMachine;