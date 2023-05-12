import { useState } from "react";
import Modal from "./Modal";
import "../css/style.css";

const Log = () => {
  const [showModal, setShowModal] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  const getLogMessages = () => {
    const storedLogMessages =
      JSON.parse(localStorage.getItem("logMessages")) || [];
    setLogMessages(storedLogMessages);
  };

  return (
    <div className="history">
      <div className="log">
        <button
        className="log-button"
          onClick={() => {
            setShowModal(true), getLogMessages();
          }}
        >
          Ver Histórico da máquina de vendas
        </button>
        {showModal ? (
          <Modal>
            <div className="buttons">
              <button className="fecha-button" onClick={() => setShowModal(false)}>X</button>
            </div>
            <div className="historico">
              <h2>Histórico:</h2>
              <div className="lista">
                <ul>
                  {logMessages.reverse().map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Log;