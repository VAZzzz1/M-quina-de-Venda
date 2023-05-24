import { toast } from "react-toastify";
import { logAndStore } from "./log";

const Coin = ({ setTotalCoins, setCoinList }) => {
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
        <button onClick={() => handleInsertCoins(20)}>{20} Cent</button>
        <button onClick={() => handleInsertCoins(50)}>{50} Cent</button>
        <button onClick={() => handleInsertCoins(100)}>{1} €</button>
        <button onClick={() => handleInsertCoins(200)}>{2} €</button>
      </div>
    </div>
  );
};

export default Coin;
