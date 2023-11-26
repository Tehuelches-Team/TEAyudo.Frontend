import {postAcompanante,postEspecialidad} from "../../../../Services/AcompTerapService.js";

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);  
  const dato = urlParams.get('usuarioId'); //guardar id en un div invisible
  document.getElementById("oculto").value = dato;
};

// function cambiarColor(elemento) {
//   elemento.classList.toggle('celda-verde');
// }

document.getElementById("boton").addEventListener("click", async() =>
{
    let telefono = document.getElementById("telefono");
    let descripcion = document.getElementById("descripcion").value;
    let formulario = document.querySelector(".formulario");
    let obrasocial = document.querySelector(".obrasocial");
    let localizacion = document.getElementById("localizacion");
    let usuarioId = document.getElementById("oculto").value;
    let experiencia = document.getElementById("experiencia");
    let escolar = document.getElementById("escolar");
    let domiciliario = document.getElementById("domiciliario");
    let documentacion = document.getElementById("documentacion");
    
    if(localizacion.value === "")
    {
      domiciliario.setCustomValidity('La seleccion de un campo es obligatorio'); 
      formulario.reportValidity(); 
    }
    else if(!escolar.checked && !domiciliario.checked)
    {
      domiciliario.setCustomValidity('La seleccion de un campo es obligatorio'); 
      formulario.reportValidity(); 
    }
    else if(telefono.value.length != 10)
    {
        telefono.setCustomValidity('El numero de telefono debe tener 10 dígitos'); 
        formulario.reportValidity(); 
    }  
    else if(experiencia.value === ""){
        experiencia.setCustomValidity('El campo de experiencia debe de ser obligatorio');
        formulario.reportValidity();
    }

    else if(documentacion.value === ""){
        documentacion.setCustomValidity('El campo de experiencia debe de ser obligatorio');
        formulario.reportValidity();
    }
    else
    {
        let disponibilidad = cargarSeleccion();
        let response = await postAcompanante(usuarioId, localizacion.value, telefono.value, disponibilidad, documentacion.value, experiencia.value);
        let acompananteId= response.acompananteId;
        //post especialidad
        if(escolar.checked){
          await postEspecialidad(acompananteId, 1);
        }
        if(domiciliario.checked){
          await postEspecialidad(acompananteId, 2);
        }
        //post obra social

    }
});

opciones.addEventListener('change', function() {
  const opcionSeleccionada = opciones.options[opciones.selectedIndex].text;
  
  // Crear un nuevo elemento para agregar al contenedor
  const nuevoElemento = document.createElement('div');
  nuevoElemento.textContent = opcionSeleccionada;

  // Agregar el elemento al contenedor
  contenedor.appendChild(nuevoElemento);
});

const opciones = document.getElementById('opciones');
const contenedor = document.getElementById('contenedor');
document.getElementById("boton").addEventListener("click", function () {
    
});

function cargarSeleccion() {
  let agenda = [];
  const seleccion = document.querySelectorAll(".celda-verde");
  seleccion.forEach((elemento) => {
    agenda.push(elemento.id);
  });
  console.log(crearArreglo(agenda));
  console.log(obtenerIndicesDesdeCadena(crearArreglo(agenda)));
  return crearArreglo(agenda);
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