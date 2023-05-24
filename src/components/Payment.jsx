import defaultProducts from "./defaultProducts";
import defaultCoins from "./defaultCoins";
import { toast } from "react-toastify";
import { logAndStore } from "./log";
import { StoreMesGrafico } from "./GraficoMes";
import { StoreAnoGrafico } from "./GraficoAno";
import { StoreDiaGrafico } from "./GraficoDia";

const Payment = ({
  total,
  selectedProduct,
  setSelectedProduct,
  setTotalCoins,
  coinList,
}) => {
  const storedProducts = localStorage.getItem("products");

  const products = storedProducts
    ? JSON.parse(storedProducts)
    : defaultProducts;

  const updateProductsInLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const QuantProduto = () => {
    products.forEach((product) => {
      if (selectedProduct && selectedProduct.name === product.name) {
        if (selectedProduct.quantity !== 0) {
          product.quantity = selectedProduct.quantity - 1;
          updateProductsInLocalStorage();
        }
      }
    });
  };

  const storedCoins = localStorage.getItem("coinsVault");

  const coinsVault = storedCoins ? JSON.parse(storedCoins) : defaultCoins;

  const updateCoinsVaultInLocalStorage = () => {
    localStorage.setItem("coinsVault", JSON.stringify(coinsVault ));
  };

  const change = () => {
    coinsVault.forEach((coin, index) => {
      if (
        (total / 100 - selectedProduct.price).toFixed(2) >=
        coinsVault[index].moeda / 100
      ) {
        if (coin.moeda === coinsVault[index].moeda) {
          coinsVault[index].quantidade = coin.quantidade - 1;
          coinsVault[index].valorTotal = (coin.moeda * coin.quantidade) / 100;
          total = total - coinsVault[index].moeda;
          updateCoinsVaultInLocalStorage();
        }
      }
    });
  };

  const storedDadosDiaMessages = localStorage.getItem("dadosDiaMessages");

  const dadosDiaMessages = storedDadosDiaMessages
    ? JSON.parse(storedDadosDiaMessages)
    : null;

  const updateDadosDiaInLocalStorage = () => {
    localStorage.setItem("dadosDiaMessages", JSON.stringify(dadosDiaMessages));
  };

  const storedDadosMesMessages = localStorage.getItem("dadosMesMessages");

  const dadosMesMessages = storedDadosMesMessages
    ? JSON.parse(storedDadosMesMessages)
    : null;

  const updateDadosMesInLocalStorage = () => {
    localStorage.setItem("dadosMesMessages", JSON.stringify(dadosMesMessages));
  };

  const storedDadosAnoMessages = localStorage.getItem("dadosAnoMessages");

  const dadosAnoMessages = storedDadosAnoMessages
    ? JSON.parse(storedDadosAnoMessages)
    : null;

  const updateDadosAnoInLocalStorage = () => {
    localStorage.setItem("dadosAnoMessages", JSON.stringify(dadosAnoMessages));
  };

  const grafico = (price) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    let bool = false;

    if (dadosDiaMessages !== null) {
      bool = false;
      dadosDiaMessages.forEach((dadoDia) => {
        if (
          dadoDia.hour === hour &&
          dadoDia.day === now.getDate() &&
          dadoDia.month === now.getMonth() + 1 &&
          dadoDia.year === now.getFullYear()
        ) {
          dadoDia.price = Number(dadoDia.price);
          dadoDia.price += selectedProduct.price;
          dadoDia.price = dadoDia.price.toFixed(2);
          updateDadosDiaInLocalStorage();
          bool = true;
        }
        if (bool === false) {
          StoreDiaGrafico([
            {
              hour: hour,
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
        }
      });
    } else {
      StoreDiaGrafico([
        {
          hour: hour,
          day: day,
          price: price,
          month: month,
          year: year,
        },
      ]);
    }

    if (dadosMesMessages !== null) {
      bool = false;
      dadosMesMessages.forEach((dadoMes) => {
        if (
          dadoMes.day === now.getDate() &&
          dadoMes.month === now.getMonth() + 1 &&
          dadoMes.year === now.getFullYear()
        ) {
          dadoMes.price = Number(dadoMes.price);
          dadoMes.price += selectedProduct.price;
          dadoMes.price = dadoMes.price.toFixed(2);
          updateDadosMesInLocalStorage();
          bool = true;
        }
        if (bool === false) {
          StoreMesGrafico([
            {
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
        }
      });
    } else {
      StoreMesGrafico([
        {
          day: day,
          price: price,
          month: month,
          year: year,
        },
      ]);
    }

    if (dadosAnoMessages !== null) {
      bool = false;
      dadosAnoMessages.forEach((dadoAno) => {
        if (
          dadoAno.month === now.getMonth() + 1 &&
          dadoAno.year === now.getFullYear()
        ) {
          dadoAno.price = Number(dadoAno.price);
          dadoAno.price += selectedProduct.price;
          dadoAno.price = dadoAno.price.toFixed(2);
          updateDadosAnoInLocalStorage();
          bool = true;
        }
        if (bool === false) {
          StoreAnoGrafico([
            {
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
        }
      });
    } else {
      StoreAnoGrafico([
        {
          price: price,
          month: month,
          year: year,
        },
      ]);
    }
  };

  const addMoney = () => {
    coinList.forEach((coin1, index1) => {
      coinsVault.forEach((coin2, index2) => {
        if (coinList[index1] === coinsVault[index2].moeda) {
          coinsVault[index2].quantidade = coin2.quantidade + 1;
          coinsVault[index2].valorTotal = (coin2.moeda * coin2.quantidade) / 100;
          updateCoinsVaultInLocalStorage();
        }
      });
    });
    for (let i = 0; i < coinList.length; i++) {
      coinList[i] = 0;
    }
  };

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

  const handlePurchase = () => {
    if (selectedProduct === null) {
      toast.error(`Selecione uma bebida!`, { autoClose: 3000 });
      console.log(`Selecione uma bebida!`);
    } else if (selectedProduct.quantity === 0) {
      logAndStore(
        `Já não há mais ${selectedProduct.name} - ${getCurrentTime()}`
      );
      toast.error(`A bebida: ${selectedProduct.name} está esgotada!`, {
        autoClose: 3500,
      });
    } else if (total / 100 === selectedProduct.price) {
      logAndStore(
        `${selectedProduct.name} comprada com sucesso (${
          selectedProduct.price
        } €) - ${getCurrentTime()}`
      );
      toast.success(`${selectedProduct.name} comprada com sucesso!`, {
        autoClose: 3000,
      });
      grafico(selectedProduct.price);
      QuantProduto();
      setSelectedProduct(null);
      setTotalCoins(0);
      addMoney();
    } else if (total / 100 > selectedProduct.price) {
      logAndStore(
        `Comprou a bebida: ${selectedProduct.name} (${
          selectedProduct.price
        } €) com ${total / 100} € e recebeu troco de ${(
          total / 100 -
          selectedProduct.price
        ).toFixed(2)} €! - ${getCurrentTime()}`
      );
      toast.success(
        `${selectedProduct.name} comprada com sucesso! Retire o seu Troco de ${(
          total / 100 -
          selectedProduct.price
        ).toFixed(2)} €!`,
        { autoClose: 4000 }
      );
      grafico(selectedProduct.price);
      change();
      QuantProduto();
      setSelectedProduct(null);
      setTotalCoins(0);
      addMoney();
    }
  };

  const handleReturn = () => {
    if (total / 100 !== 0) {
      logAndStore(
        `O seu dinheiro foi devolvido com um total de: ${(total / 100).toFixed(
          2
        )} € - ${getCurrentTime()}`
      );
      toast.info(
        `O seu dinheiro foi devolvido com um total de: ${(total / 100).toFixed(
          2
        )} €!`,
        {
          autoClose: 3000,
        }
      );
      setTotalCoins(0);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="payment">
      <div className="title">
        <h2>Pagamento</h2>
      </div>
      <div className="tabbtn">
        <div className="valor">
          <div className="tabela">
            <table>
              <tbody>
                <tr>
                  <th>Valor a pagar:</th>
                  <td>
                    {selectedProduct
                      ? `${selectedProduct.price.toFixed(2)}`
                      : "0"}{" "}
                    €
                  </td>
                </tr>
                <tr>
                  <th>Valor inserido:</th>
                  <td>
                    {total / 100 > 0 ? `${(total / 100).toFixed(2)}` : "0"} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttons">
          <div className="pagar">
            <button onClick={handlePurchase}>Pagar</button>
          </div>
          <div className="devolver">
            <button onClick={handleReturn}>Devolver o Dinheiro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;