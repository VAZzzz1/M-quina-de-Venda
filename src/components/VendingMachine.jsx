import CoinsVault from "./CoinsVault";
import { useState } from "react";
import GraphModal from "./Grafico.jsx";
import Coin from "./Coin";
import Payment from "./Payment";
import ProductsMachine from "./ProductsMachine";
import Log from "./Log.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [coinList, setCoinList] = useState([]);
  const [products, setProducts] = useState([]);
  const [coinsVault, setCoinsVault] = useState([]);

  return (
    <div className="vending-machine">
      <div className="left">
        <ProductsMachine
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          totalCoins={totalCoins}
          products={products}
          setProducts={setProducts}
        />
      </div>
      <div className="right">
        <ToastContainer />
        <Coin
          setTotalCoins={setTotalCoins}
          setCoinList={setCoinList}
          coinsVault={coinsVault}
          setCoinsVault={setCoinsVault}
        />
        <Payment
          total={totalCoins}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setTotalCoins={setTotalCoins}
          coinList={coinList}
          setCoinList={setCoinList}
          products={products}
          setProducts={setProducts}
          coinsVault={coinsVault}
          setCoinsVault={setCoinsVault}
        />
        <CoinsVault coinsVault={coinsVault} setCoinsVault={setCoinsVault} />
        <Log />
        <GraphModal />
      </div>
    </div>
  );
};

export default VendingMachine;
