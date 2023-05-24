import defaultProducts from "./defaultProducts";
import Product from "./Products";
import { logAndStore } from "./log";
import { useEffect } from "react";

const ProductsMachine = ({
  setSelectedProduct,
  selectedProduct,
  totalCoins,
}) => {
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

  const storedProducts = localStorage.getItem("products");

  const products = storedProducts
    ? JSON.parse(storedProducts)
    : defaultProducts;

  if (!storedProducts) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }

  useEffect(() => {
    if (selectedProduct === null) {
      products.forEach((p) => {
        if (totalCoins / 100 < p.price) {
          document.getElementById(p.name).style.backgroundColor = "transparent";
        } else {
          document.getElementById(p.name).style.backgroundColor = "#89e46d";
        }
        document.getElementById(p.name).removeAttribute("data-selected");
      });
    }
  }, [selectedProduct]);

  let timeoutId;

  const handleSelectProducts = (product) => {
    clearTimeout(timeoutId);
    setSelectedProduct(product);
    logAndStore(`Selecionou a bebida ${product.name} - ${getCurrentTime()}`);

    timeoutId = setTimeout(() => {
      products.forEach((p) => {
        if (totalCoins / 100 < p.price) {
          document.getElementById(p.name).style.backgroundColor = "transparent";
        } else {
          document.getElementById(p.name).style.backgroundColor = "transparent";
        }
      });
      setSelectedProduct(null);
    }, 15000);
  };

  return (
    <div className="produtos">
      {products.map((product) => (
        <Product
          key={product.name}
          product={product}
          onClick={handleSelectProducts}
          selectedProduct={selectedProduct}
          totalCoins={totalCoins}
        />
      ))}
    </div>
  );
};

export default ProductsMachine;
