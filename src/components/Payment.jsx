import defaultProducts from "./defaultProducts";
import { toast } from "react-toastify";
import { logAndStore } from "./log";
import axios from "axios";
import { useState, useEffect } from "react";

const Payment = ({
  total,
  selectedProduct,
  setSelectedProduct,
  setTotalCoins,
  coinList,
  setCoinList,
  products,
  setProducts,
  coinsVault,
  setCoinsVault,
}) => {
  
  const QuantProduto = async () => {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (selectedProduct && selectedProduct.name === product.name) {
          if (selectedProduct.quantity !== 0) {
            if (product.id === selectedProduct.id) {
              let id = selectedProduct.id;
              try {
                await axios.post(
                  `https://localhost:7062/Products/postProducts/${id}`,
                  { ...selectedProduct, quantity: selectedProduct.quantity - 1 }
                );
                return { ...product, quantity: selectedProduct.quantity - 1 };
              } catch (error) {
                console.error(error);
                return product;
              }
            }
          }
        }
        return product;
      })
    );

    setProducts(updatedProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/Products/getProducts"
        );
        if (response.data.length <= 0) {
          defaultProducts.forEach(async (product) => {
            try {
              await axios.post(
                "https://localhost:7062/Products/postProducts",
                product
              );
            } catch (error) {
              console.error(error);
            }
          });
        }
        setProducts(response.data || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const responseAno = await axios.get(
          "https://localhost:7062/dadosAnoMessages/getdadosAnoMessages"
        );
        setDadosAnoMessages(responseAno.data);

        const responseMes = await axios.get(
          "https://localhost:7062/dadosMesMessages/getdadosMesMessages"
        );
        setDadosMesMessages(responseMes.data);

        const responseDia = await axios.get(
          "https://localhost:7062/dadosDiaMessages/getdadosDiaMessages"
        );
        setDadosDiaMessages(responseDia.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

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

  const change = async () => {
    const updatedCoinsVault = await Promise.all(
      coinsVault.map(async (coin) => {
        if (
          (total / 100 - selectedProduct.price).toFixed(2) >=
          coin.moeda / 100
        ) {
          const updatedQuantidade = coin.quantidade - 1;
          const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;
          const id = coin.id;
          total = total - coin.moeda;

          await axios.post(
            `https://localhost:7062/coins/postCoinsVault/${id}`,
            {
              ...coin,
              quantidade: updatedQuantidade,
              valorTotal: updatedValorTotal,
            }
          );

          return {
            ...coin,
            quantidade: updatedQuantidade,
            valorTotal: updatedValorTotal,
          };
        }
        return coin;
      })
    );

    try {
      setCoinsVault(updatedCoinsVault);
    } catch (error) {
      console.error(error);
    }

    try {
      const updatedCoinsVaultList = await Promise.all(
        updatedCoinsVault.map(async (coin) => {
          const foundCoin = coinList.find((c) => c === coin.moeda);

          const updatedQuantidade = foundCoin
            ? coin.quantidade + 1
            : coin.quantidade;
          const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;
          const id = coin.id;

          await axios.post(
            `https://localhost:7062/coins/postCoinsVault/${id}`,
            {
              ...coin,
              quantidade: updatedQuantidade,
              valorTotal: updatedValorTotal,
            }
          );

          return {
            ...coin,
            quantidade: updatedQuantidade,
            valorTotal: updatedValorTotal,
          };
        })
      );
      setCoinsVault(updatedCoinsVaultList);
      setCoinList(new Array(coinList.length).fill(0));
    } catch (error) {
      console.error(error);
    }
  };

  const [dadosAnoMessages, setDadosAnoMessages] = useState([]);
  const [dadosMesMessages, setDadosMesMessages] = useState([]);
  const [dadosDiaMessages, setDadosDiaMessages] = useState([]);

  const GraficoDia = async (price) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    let bool = false;

    if (dadosDiaMessages.length > 0) {
      bool = false;
      dadosDiaMessages.forEach(async (dadoDia) => {
        if (
          dadoDia.hour === hour &&
          dadoDia.day === now.getDate() &&
          dadoDia.month === now.getMonth() + 1 &&
          dadoDia.year === now.getFullYear()
        ) {
          dadoDia.price = Number(dadoDia.price);
          dadoDia.price += selectedProduct.price;
          dadoDia.price = dadoDia.price.toFixed(2);

          await axios.post(
            `https://localhost:7062/dadosDiaMessages/postdadosDiaMessages/${dadoDia.id}`,
            {
              hour: dadoDia.hour,
              day: dadoDia.day,
              price: dadoDia.price,
              month: dadoDia.month,
              year: dadoDia.year,
            }
          );

          const responseDia = await axios.get(
            "https://localhost:7062/dadosDiaMessages/getdadosDiaMessages"
          );
          setDadosDiaMessages(responseDia.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7062/dadosDiaMessages/postdadosDiaMessages",
            [{ hour: hour, day: day, price: price, month: month, year: year }]
          );

          const responseDia = await axios.get(
            "https://localhost:7062/dadosDiaMessages/getdadosDiaMessages"
          );
          setDadosDiaMessages(responseDia.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7062/dadosDiaMessages/postdadosDiaMessages",
        [{ hour: hour, day: day, price: price, month: month, year: year }]
      );

      const responseDia = await axios.get(
        "https://localhost:7062/dadosDiaMessages/getdadosDiaMessages"
      );
      setDadosDiaMessages(responseDia.data);
    }
  };

  const GraficoMes = async (price) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let bool = false;
    if (dadosMesMessages.length > 0) {
      bool = false;
      dadosMesMessages.forEach(async (dadoMes) => {
        if (
          dadoMes.day === now.getDate() &&
          dadoMes.month === now.getMonth() + 1 &&
          dadoMes.year === now.getFullYear()
        ) {
          dadoMes.price = Number(dadoMes.price);
          dadoMes.price += selectedProduct.price;
          dadoMes.price = dadoMes.price.toFixed(2);

          await axios.post(
            `https://localhost:7062/dadosMesMessages/postdadosMesMessages/${dadoMes.id}`,
            {
              day: dadoMes.day,
              price: dadoMes.price,
              month: dadoMes.month,
              year: dadoMes.year,
            }
          );

          const responseMes = await axios.get(
            "https://localhost:7062/dadosMesMessages/getdadosMesMessages"
          );
          setDadosMesMessages(responseMes.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7062/dadosMesMessages/postdadosMesMessages",
            [{ day: day, price: price, month: month, year: year }]
          );

          const responseMes = await axios.get(
            "https://localhost:7062/dadosMesMessages/getdadosMesMessages"
          );
          setDadosMesMessages(responseMes.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7062/dadosMesMessages/postdadosMesMessages",
        [{ day: day, price: price, month: month, year: year }]
      );

      const responseMes = await axios.get(
        "https://localhost:7062/dadosMesMessages/getdadosMesMessages"
      );
      setDadosMesMessages(responseMes.data);
    }
  };

  const GraficoAno = async (price) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let bool = false;
    if (dadosAnoMessages.length > 0) {
      bool = false;
      dadosAnoMessages.forEach(async (dadoAno) => {
        if (
          dadoAno.month === now.getMonth() + 1 &&
          dadoAno.year === now.getFullYear()
        ) {
          dadoAno.price = Number(dadoAno.price);
          dadoAno.price += selectedProduct.price;
          dadoAno.price = dadoAno.price.toFixed(2);

          await axios.post(
            `https://localhost:7062/dadosAnoMessages/postdadosAnoMessages/${dadoAno.id}`,
            { price: dadoAno.price, month: dadoAno.month, year: dadoAno.year }
          );

          const responseAno = await axios.get(
            "https://localhost:7062/dadosAnoMessages/getdadosAnoMessages"
          );
          setDadosAnoMessages(responseAno.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7062/dadosAnoMessages/postdadosAnoMessages",
            [{ price: price, month: month, year: year }]
          );

          const responseAno = await axios.get(
            "https://localhost:7062/dadosAnoMessages/getdadosAnoMessages"
          );
          setDadosAnoMessages(responseAno.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7062/dadosAnoMessages/postdadosAnoMessages",
        [{ price: price, month: month, year: year }]
      );

      const responseAno = await axios.get(
        "https://localhost:7062/dadosAnoMessages/getdadosAnoMessages"
      );
      setDadosAnoMessages(responseAno.data);
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
    } else if (selectedProduct.quantity === 0) {
      logAndStore(
        `A bebida: ${selectedProduct.name} está esgotada - ${getCurrentTime()}`
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
      GraficoDia(selectedProduct.price);
      GraficoMes(selectedProduct.price);
      GraficoAno(selectedProduct.price);
      QuantProduto();
      setSelectedProduct(null);
      setTotalCoins(0);
      change();
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
      GraficoDia(selectedProduct.price);
      GraficoMes(selectedProduct.price);
      GraficoAno(selectedProduct.price);
      change();
      QuantProduto();
      setSelectedProduct(null);
      setTotalCoins(0);
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
