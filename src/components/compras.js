export function StoreCompras(message) {
  let storedDadosMessages =
    JSON.parse(localStorage.getItem("dadosMessages")) || [];

  storedDadosMessages.push(...message);

  localStorage.setItem("dadosMessages", JSON.stringify(storedDadosMessages));
}
