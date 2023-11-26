window.onload = function () {
  //cargarInicio();
};

document
  .getElementById("buscarProfesional")
  .addEventListener("click", function () {
    cargarSeleccion();
  });

  function cargarSeleccion() {
  let agenda = [];
  const seleccion = document.querySelectorAll(".celda-verde");
  seleccion.forEach((elemento) => {
    agenda.push(elemento.id);
  });
  console.log(crearArreglo(agenda));
  console.log(obtenerIndicesDesdeCadena(crearArreglo(agenda)));
}

function crearArreglo(indicesRecibidos) {
  const arreglo = new Array(12).fill(0);

  indicesRecibidos.forEach((indice) => {
    if (indice >= 1 && indice <= 6) {
      arreglo[indice - 1] = 1; // Mañana
    } else if (indice >= 7 && indice <= 12) {
      arreglo[indice - 7 + 6] = 1; // Tarde
    }
  });
  return arreglo.join("");
}



function obtenerIndicesDesdeCadena(cadena) {
  const arreglo = cadena.split("").map(Number);
  const indices = [];

  arreglo.forEach((valor, indice) => {
    if (valor === 1) {
      if (indice < 6) {
        indices.push(indice + 1); // Mañana
      } else {
        indices.push(indice + 1 - 6 + 7); // Tarde
      }
    }
  });

  return indices;
}
