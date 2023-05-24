export function StoreDiaGrafico(message) {
  let storedDadosDiaMessages =
    JSON.parse(localStorage.getItem("dadosDiaMessages")) || [];

  storedDadosDiaMessages.push(...message);

  localStorage.setItem(
    "dadosDiaMessages",
    JSON.stringify(storedDadosDiaMessages)
  );
}
