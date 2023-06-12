import { toast } from "react-toastify";
import { logAndStore } from "./log";
import { useEffect } from "react";
import axios from "axios";

const Coin = ({ setTotalCoins, setCoinList, coinsVault, setCoinsVault }) => {

  useEffect(() => {
    const fetchCoinsVault = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/coins/getCoinsVault"
        );
        setCoinsVault(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinsVault();
  }, []);

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

  const handleInsertCoins = (value) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + value);
    setCoinList((prevCoinList) => [...prevCoinList, value]);

    if (value < 100) {
      toast.info(`Introduziu uma moeda de ${value} cêntimos!`, {
        autoClose: 1500,
      });
      logAndStore(
        `Introduziu uma moeda de ${value} cêntimos - ${getCurrentTime()}`
      );
    } else {
      toast.info(`Introduziu uma moeda de ${value / 100} €!`, {
        autoClose: 1500,
      });
      logAndStore(
        `Introduziu uma moeda de ${value / 100} € - ${getCurrentTime()}`
      );
    }
  };

  return (
    <div className="coinvault">
      <div className="title">
        <h2>Introduza Moedas</h2>
      </div>
      <div className="moedas">
        {coinsVault
          .sort((a, b) => a.moeda - b.moeda)
          .map((coin) => {
            if (coin.moeda >= 100) {
              return (
                <button
                  key={coin.id}
                  onClick={() => handleInsertCoins(coin.moeda)}
                >
                  {coin.moeda / 100} EUR
                </button>
              );
            } else {
              return (
                <button
                  key={coin.id}
                  onClick={() => handleInsertCoins(coin.moeda)}
                >
                  {coin.moeda} Cent
                </button>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Coin;
