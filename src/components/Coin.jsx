import React from "react";
import "../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from './log';

function Coin(props) {

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

  // função para exibir notificação de moedas inseridas
  function notifyCoinInserted(value) {
    toast.info(`Moeda de ${value.toFixed(2)} cêntimos inserida!`, {
      autoClose: 1500,
    });
  }

  function handleInsertCoins(value) {
    switch (value) {
      case 0.5:
        props.setCoinsQuantity50((prevCoins) => prevCoins + 1);
        break;
      case 0.2:
        props.setCoinsQuantity20((prevCoins) => prevCoins + 1);
        break;
      case 0.1:
        props.setCoinsQuantity10((prevCoins) => prevCoins + 1);
        break;
      default:
        break;
    }
  }

  // função para atualizar o estado de moedas inseridas
  function handleInsertCoin() {
    props.setInsertedCoins((prevCoins) => prevCoins + 0.2);
    handleInsertCoins(0.2);
    logAndStore(`Introduziu uma moeda de 0.20 cêntimos - ${getCurrentTime()}`);
    notifyCoinInserted(0.2);
  }

  // função para inserir moedas de 10 cêntimos
  function handleInsertCoin10() {
    props.setInsertedCoins((prevCoins) => prevCoins + 0.1);
    handleInsertCoins(0.1);
    logAndStore(`Introduziu uma moeda de 0.10 cêntimos - ${getCurrentTime()}`);
    notifyCoinInserted(0.1);
  }

  // função para inserir moedas de 50 cêntimos
  function handleInsertCoin50() {
    props.setInsertedCoins((prevCoins) => prevCoins + 0.5);
    handleInsertCoins(0.5);
    logAndStore(`Introduziu uma moeda de 0.50 cêntimos - ${getCurrentTime()}`);
    notifyCoinInserted(0.5);
  }

  return (
    <ul>
      <button className="coin10-button" onClick={handleInsertCoin10}>
        Inserir moeda de 10 cêntimos
      </button>
      <button className="coin-button" onClick={handleInsertCoin}>
        Inserir moeda de 20 cêntimos
      </button>
      <button className="coin50-button" onClick={handleInsertCoin50}>
        Inserir moeda de 50 cêntimos
      </button>
    </ul>
  );
}

export default Coin;