import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const Product = ({ product, onClick, totalCoins }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7062/Products/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    products.forEach((p) => {
      const productElement = document.getElementById(p.name);
      if (totalCoins / 100 >= p.price) {
        productElement.style.backgroundColor = "#a8c5f74d";
        productElement.style.borderRadius = "10px";
        productElement.style.cursor = "pointer";
      } else {
        productElement.style.backgroundColor = "transparent";
        productElement.style.cursor = "pointer";
      }
    });
  }, [totalCoins]);

  const handleSelectProduct = (product) => {
    if (
      document.getElementById(product.name).getAttribute("data-selected") ===
      "true"
    ) {
      return;
    }

    if (totalCoins / 100 < product.price) {
      toast.error(
        `Insira dinheiro suficiente para comprar a bebida: ${product.name} !`,
        { autoClose: 2000 }
      );
      document.getElementById(product.name).removeAttribute("data-selected");
      return;
    }

    onClick(product);

    toast.info(`Selecionou a bebida ${product.name}!`, { autoClose: 2000 });

    if (totalCoins / 100 < product.price) {
      document.getElementById(product.name).style.backgroundColor = "#51c94d";
    } else {
      document.getElementById(product.name).style.backgroundColor = "#51c94d";
    }

    products.forEach((p) => {
      if (p.name !== product.name) {
        if (totalCoins / 100 < p.price) {
          document.getElementById(p.name).style.backgroundColor = "transparent";
        } else {
          document.getElementById(p.name).style.backgroundColor = "#afe498";
        }
        document.getElementById(p.name).removeAttribute("data-selected");
      }
    });
    document.getElementById(product.name).setAttribute("data-selected", "true");
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="prodcontainer"
      id={product.name}
      onClick={() => handleSelectProduct(product)}
    >
      <div className="name">
        <h2>{product.name}</h2>
      </div>
      <div className="image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="price">
        <h3>{product.price.toFixed(2)} €</h3>
      </div>
      <div className="quantity">
        {product.quantity === 0 ? (
          <p style={{ color: "red" }}>Esgotado</p>
        ) : (
          <p>Quantidade: {product.quantity}</p>
        )}
      </div>
    </div>
  );
};

export default Product;
