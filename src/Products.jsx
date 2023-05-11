import React from "react";
import { useEffect } from "react";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products(props) {
  function handleScrollToBottom() {
    const bottomElement = document.querySelector("footer"); // substitua "myFooter" pelo ID do elemento onde deseja rolar a página
    bottomElement.scrollIntoView({ behavior: "smooth" }); // use "smooth" para rolar suavemente até o elemento
  }

  function handleSelectProduct(product) {
    props.setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product.name));
    notifyProductSelected(product);
  }  

  useEffect(() => {
    const storedProductName = JSON.parse(localStorage.getItem("selectedProduct"));
    if (storedProductName) {
      const selectedProduct = props.products.find(product => product.name === storedProductName);
      props.setSelectedProduct(selectedProduct);
    }
  }, []);  

  function notifyProductSelected(product) {
    toast.success(`Produto ${product.name} selecionado!`, { autoClose: 1500 });
  }
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.name}>
          <img src={product.img} alt={product.name} />
          {product.name} - € {product.price.toFixed(2)} ({product.quantity}{" "}
          disponíveis)
          <button
            onClick={() => {
              handleSelectProduct(product);
              console.log(`Produto selecionado: ${product.name}`);
              handleScrollToBottom();
            }}
          >
            Selecionar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Products;
