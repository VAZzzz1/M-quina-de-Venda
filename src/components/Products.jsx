import React from "react";
import "../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logAndStore } from './log';

function Products(props) {

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return `${hours}:${minutes} ${date.toLocaleDateString('pt-BR', options)}`;
  }; 

  function handleScrollToBottom() {
    const bottomElement = document.querySelector("footer"); // substitua "myFooter" pelo ID do elemento onde deseja rolar a página
    bottomElement.scrollIntoView({ behavior: "smooth" }); // use "smooth" para rolar suavemente até o elemento
  }

  function handleSelectProduct(product) {
    props.setSelectedProduct(product);
    logAndStore(`Selecionou a bebida ${product.name} - ${getCurrentTime()}`);
    notifyProductSelected(product);
  }  

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
