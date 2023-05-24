import "../css/style.css";
import GraphModal from "./Grafico";
import CoinsVault from "./CoinsVault";
import { useState } from "react";
import Coin from "./Coin.jsx";
import Payment from "./Payment";
import ProductsMachine from "./ProductsMachine";
import Log from "./Log.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [coinList, setCoinList] = useState([]);

  return (
    <div className="vending-machine">
      <div className="left">
        <ProductsMachine
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          totalCoins={totalCoins}
        />
      </div>
      <div className="right">
        <ToastContainer />
        <Coin setTotalCoins={setTotalCoins} setCoinList={setCoinList} />
        <Payment
          total={totalCoins}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setTotalCoins={setTotalCoins}
          coinList={coinList}
        />
        <CoinsVault />
        <Log />
        <GraphModal />
      </div>
    </div>
  );
};

export default VendingMachine;
