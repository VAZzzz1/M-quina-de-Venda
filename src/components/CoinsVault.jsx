import defaultCoins from "./defaultCoins";
import "../css/coin.css";

const CoinsVault = () => {
  const storedCoins = localStorage.getItem("coinsVault");

  const coinsVault = storedCoins ? JSON.parse(storedCoins) : defaultCoins;

  if (!storedCoins) {
    localStorage.setItem("coinsVault", JSON.stringify(defaultCoins));
  }

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
          {coinsVault.map((coin) => {
            if (coin.moeda >= 100) {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda / 100} €</td>
                  <td>{coin.quantidade}</td>
                  <td>{((coin.moeda / 100) * coin.quantidade).toFixed(2)} €</td>
                </tr>
              );
            } else {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda} Cent</td>
                  <td>{coin.quantidade}</td>
                  <td>{((coin.moeda / 100) * coin.quantidade).toFixed(2)} €</td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
};

export default CoinsVault;
