import defaultProducts from "./defaultProducts";
import Product from "./Products";
import { logAndStore } from "./log";
import { useEffect } from "react";
import axios from "axios";

const ProductsMachine = ({
  setSelectedProduct,
  selectedProduct,
  totalCoins,
  products,
  setProducts
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7062/Products/getProducts');
        if (response.data.length <= 0) {
          await axios.post("https://localhost:7062/Products/postProducts", defaultProducts);
          const response = await axios.get(
            "https://localhost:7062/Products/getProducts"
          );
          setProducts(response.data);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProducts();
  }, []);

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

  const handleSelectProduct = (product) => {
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
          onClick={handleSelectProduct}
          selectedProduct={selectedProduct}
          totalCoins={totalCoins}
        />
      ))}
    </div>
  );
};

export default ProductsMachine;
