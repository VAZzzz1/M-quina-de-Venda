import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const Log = () => {
  const [showModal, setShowModal] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  const fetchLogMessages = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7062/LogMessages/getLogMessages"
      );
      setLogMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
   

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            setShowModal(true), fetchLogMessages();
          }}
        >
          Histórico
        </button>
        {showModal ? (
          <Modal>
            <div className="buttons">
              <button
                className="fecha-button"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <div className="historico">
              <h2>Histórico:</h2>
              {logMessages !== null && logMessages.length > 0 ? (
                  <div className="lista">
                    <ul>
                      {logMessages.reverse().map((message) => (
                        <li key={message.id}>{message.message}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h2>SEM RESULTADOS</h2>
                )}
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Log;
