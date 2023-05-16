export function StoreCompras(message) {
    let storedCompras = JSON.parse(localStorage.getItem('Compras')) || [];
  
    storedCompras.push(message);
  
    localStorage.setItem('Compras', JSON.stringify(storedCompras));
  }