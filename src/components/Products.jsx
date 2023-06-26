import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import "../css/products.css";

const Product = ({ product, onClick, totalCoins }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/Products/getProducts"
        );
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

    if (product.quantity === 0) {
      toast.error(
        `Já não há mais ${product.name}. Espere até a máquina ser reabastecida!`,
        { autoClose: 2000 }
      );
      document.getElementById(product.name).style.backgroundColor = "#a8c5f74d";
      document.getElementById(product.name).style.opacity = "30%";
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

  const [Editar, setEditar] = useState(false);

  const handleEditClick = () => {
    setEditar(true);
  };

  const handleCancelClick = () => {
    setEditar(false);
  };

  const handleSaveClick = async () => {
    if (document.getElementById("price").value !== "") {
      if (document.getElementById("quantity").value !== "") {
        setEditar(false);
        try {
          const price = parseFloat(document.getElementById("price").value);
          const quantity = parseInt(document.getElementById("quantity").value);
          const id = product.id;

          await axios.post(
            `https://localhost:7062/Products/postProducts/${id}`,
            {
              ...product,
              price: price,
              quantity: quantity,
            }
          );

          const fetchProducts = async () => {
            try {
              const response = await axios.get(
                "https://localhost:7062/Products/getProducts"
              );
              setProducts(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          setTimeout(() => {
            window.location.reload();
          });
          fetchProducts();
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error(`Por favor, forneça um valor válido para a quantidade!`, {
          autoClose: 3500,
        });
      }
    } else {
      toast.error(`Por favor, forneça um valor válido para o preço!`, {
        autoClose: 3500,
      });
    }
  };

  return (
    <div>
      <div
        className={`product ${Editar ? "edição" : ""}`}
        id={product.name}
        onClick={() => {
          if (!Editar) {
            handleSelectProduct(product);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSelectProduct(product);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="name">
          <h2>{product.name}</h2>
        </div>
        <div className="image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="price">
          <h3>
            {Editar ? (
              <input
                className="ep"
                id="price"
                type="number"
                defaultValue={product.price.toFixed(2)}
                required
              />
            ) : (
              `${product.price.toFixed(2)}`
            )}
            €
          </h3>
        </div>
        <div>
          {product.quantity === 0 ? (
            <p style={{ color: "red" }}>
              Quantidade:{" "}
              {Editar ? (
                <input
                  className="ep"
                  id="quantity"
                  type="text"
                  defaultValue={product.quantity}
                  required
                />
              ) : (
                `Esgotado`
              )}
            </p>
          ) : (
            <p>
              Quantidade:{" "}
              {Editar ? (
                <input
                  className="ep"
                  id="quantity"
                  type="number"
                  defaultValue={product.quantity}
                  required
                />
              ) : (
                `${product.quantity}`
              )}
            </p>
          )}
        </div>
      </div>
      <div className="edit">
        {Editar ? (
          <div>
            <button className="confirmar" onClick={handleSaveClick}>
              Confirmar
            </button>
            <button className="cancelar" onClick={handleCancelClick}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="editar" onClick={handleEditClick}>
            Editar
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
