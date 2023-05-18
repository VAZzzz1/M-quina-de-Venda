import React from "react";
import "../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from "./log";

function Coin(props) {
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

  function notifyCoinInserted(value) {
    toast.info(`Moeda de ${value.toFixed(2)} cêntimos inserida!`, {
      autoClose: 1500,
    });
  }

  function handleInsertCoins(value) {
    const coinsData = JSON.parse(localStorage.getItem("coins"));

    switch (value) {
      case 1:
        coinsData.coinsQuantity100++;
        break;
      case 0.5:
        coinsData.coinsQuantity50++;
        break;
      case 0.2:
        coinsData.coinsQuantity20++;
        break;
      case 0.1:
        coinsData.coinsQuantity10++;
        break;
      default:
        break;
    }

    coinsData.coins += value;
    localStorage.setItem("coins", JSON.stringify(coinsData));

    props.setInsertedCoins((prevCoins) => prevCoins + value);
  }

  function handleInsertCoin(value) {
    handleInsertCoins(value);
    logAndStore(
      `Introduziu uma moeda de ${value.toFixed(
        2
      )} cêntimos - ${getCurrentTime()}`
    );
    notifyCoinInserted(value);
    alert(`Moeda de ${value.toFixed(2)} cêntimos inserida!`);
  }

  return (
    <ul>
      <button className="coin10" onClick={() => handleInsertCoin(0.1)}>
        <span className="coin10_lg">
          <span className="coin10_sl"></span>
          <span className="coin10_text">Inserir moeda de 10 cêntimos</span>
        </span>
      </button>
      <button className="coin20" onClick={() => handleInsertCoin(0.2)}>
        <span className="coin20_lg">
          <span className="coin20_sl"></span>
          <span className="coin20_text">Inserir moeda de 20 cêntimos</span>
        </span>
      </button>
      <button className="coin50" onClick={() => handleInsertCoin(0.5)}>
        <span className="coin50_lg">
          <span className="coin50_sl"></span>
          <span className="coin50_text">Inserir moeda de 50 cêntimos</span>
        </span>
      </button>
      <button className="coin100" onClick={() => handleInsertCoin(1)}>
        <span className="coin100_lg">
          <span className="coin100_sl"></span>
          <span className="coin100_text">Inserir moeda de 1 euro</span>
        </span>
      </button>
    </ul>
  );
}

export default Coin;
