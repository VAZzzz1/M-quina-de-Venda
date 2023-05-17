export function StoreGanhos(message) {
    let storedGanhos = JSON.parse(localStorage.getItem('Ganhos')) || [];
  
    storedGanhos.push(message);
  
    localStorage.setItem('Ganhos', JSON.stringify(storedGanhos));
  }