import React, { useEffect } from "react";
import axios from "axios";
import defaultCoins from "./defaultCoins";
import "../css/coin.css";

const CoinsVault = ({coinsVault, setCoinsVault}) => {

  useEffect(() => {
    const fetchCoinsVault = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/coins/getCoinsVault"
        );
        if (response.data.length <= 0) {
            try {
              await axios.post("https://localhost:7062/coins/postCoinsVault", defaultCoins);
              const response = await axios.get(
                "https://localhost:7062/coins/getCoinsVault"
              );
              setCoinsVault(response.data);
            } catch (error) {
              console.error(error);
            }
        } else {
        setCoinsVault(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinsVault();
  }, []);

  return (
    <div className="coinvault">
      <div className="title">
        <h2>Conteúdo do Moedeiro</h2>
      </div>
      <div className="tabela">
        <table>
          <tr>
            <th>Moeda</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
          {coinsVault
            .sort((a, b) => b.moeda - a.moeda)
            .map((coin) => (
              <tr key={coin.moeda}>
                <td>
                  {coin.moeda >= 100
                    ? coin.moeda / 100 + " EUR"
                    : coin.moeda + " cent"}
                </td>
                <td>{coin.quantidade}</td>
                <td>{((coin.moeda / 100) * coin.quantidade).toFixed(2)} EUR</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default CoinsVault;
