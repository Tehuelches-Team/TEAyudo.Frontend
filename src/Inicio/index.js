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
  console.log(crearNumeroBinario(agenda));
  //console.log(transformarArreglo(agenda));
}

function armarBinario(agenda) {
  let semana = ["1", "2", "3", "4", "5", "6"];
  let horario = ["8", "9", "10", "11", "12"];

  return binario;
}

function crearNumeroBinario(arreglo) {
  // Verificar que el arreglo tiene la longitud esperada
  // Función auxiliar para convertir un ID a un bit (1 o 0)
  function idToBit(id, rangoInicio, rangoFin) {
    return id >= rangoInicio && id <= rangoFin ? 1 : 0;
  }

  // Llenar con 0 los lugares que falten antes de dividir el primer arreglo
  var primeros6 = Array(6)
    .fill(0)
    .map((_, index) =>
      arreglo[index] ? idToBit(Number(arreglo[index]), 1, 6) : 0
    );

  // Dividir el primer arreglo en dos partes y revertirlos
  var diasMañana = primeros6.reverse();
  var diasTarde = arreglo.map((ocupado) => (ocupado === "1" ? 1 : 0)).reverse();

  // Asegurar que ambas partes tengan la longitud esperada y agregar ceros si es necesario
  diasMañana = diasMañana.concat(Array(6 - diasMañana.length).fill(0));
  diasTarde = diasTarde.concat(Array(6 - diasTarde.length).fill(0));

  // Crear el número binario final concatenando los días y las tardes
  var numeroBinario = diasMañana.concat(diasTarde).join("");

  return numeroBinario;
}

function transformarArreglo(arreglo) {
  // Colocar 0 en las posiciones que no hay número
  for (let i = 0; i < arreglo.length; i++) {
    if (arreglo[i] === undefined || arreglo[i] === null) {
      arreglo[i] = 0;
    }
  }

  // Convertir los números a 1
  for (let i = 0; i < arreglo.length; i++) {
    if (typeof arreglo[i] === "number" && arreglo[i] >= 1 && arreglo[i] <= 6) {
      arreglo[i] = 1;
    } else if (
      typeof arreglo[i] === "number" &&
      arreglo[i] >= 7 &&
      arreglo[i] <= 12
    ) {
      arreglo[i] = 1;
    }
  }

  // Convertir el arreglo a binario
  let binario = "";
  for (let i = 0; i < arreglo.length; i++) {
    binario += arreglo[i] + "";
  }

  return binario;
}

// const arreglo = ["2", "4", "5", "8", "10", "11"];
// const resultado = convertirArreglo(arreglo);

// console.log(resultado); // "010110010110"
