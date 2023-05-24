export function StoreMesGrafico(message) {
  let storedDadosMesMessages =
    JSON.parse(localStorage.getItem("dadosMesMessages")) || [];

  storedDadosMesMessages.push(...message);

  localStorage.setItem(
    "dadosMesMessages",
    JSON.stringify(storedDadosMesMessages)
  );
}
