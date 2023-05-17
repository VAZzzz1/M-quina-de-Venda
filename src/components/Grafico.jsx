import React, { useState } from "react";
import Modal from "./Modal";
import LineChart from "./Chart";
import "../css/style.css";

const GraphModal = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dadosMessages, setDadosMessages] = useState([]);
  const [chartDadosMessages, setChartDadosMessages] = useState({
    labels: [],
    datasets: [
      {
        label: "Dinheiro Ganho",
        data: [],
        backgroundColor: [
          "#ffffff",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  const getLogMessages = () => {
    const storedDadosMessages =
      JSON.parse(localStorage.getItem("dadosMessages")) || [];
    setDadosMessages(storedDadosMessages);

    const chartData = {
      labels: storedDadosMessages.map((data) => data.day),
      datasets: [
        {
          label: "Dinheiro Ganho",
          data: storedDadosMessages.map((data) => data.price),
          backgroundColor: [
            "#ffffff",
          ],
          pointBackgroundColor: "black",
          pointBorderColor: "white",
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
    setChartDadosMessages(chartData);
  };

  return (
    <>
      <button className="graph-button"
        onClick={() => {
          setShowModal(true), getLogMessages();
        }}
      >
        Ver Gráfico das Compras
      </button>
      {showModal && (
        <div>
          <Modal>
            <div className="grafico">
              <h2>Gráfico:</h2>
              <div className="buttons">
                <button
                  className="fecha-button"
                  onClick={() => setShowModal(false)}
                >
                  X
                </button>
              </div>
              <div className="historico">
                <LineChart chartDadosMessages={chartDadosMessages} />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default GraphModal;
