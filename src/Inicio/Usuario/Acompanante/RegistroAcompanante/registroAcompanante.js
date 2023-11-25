import {postAcompanante,postEspecialidad} from "../../../../Services/AcompTerapService.js";

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);  
  const dato = urlParams.get('usuarioId'); //guardar id en un div invisible
  document.getElementById("oculto").value = dato;
};



document.getElementById("boton").addEventListener("click", async() =>
{
    let telefono = document.getElementById("telefono");
    let descripcion = document.getElementById("descripcion").value;
    let formulario = document.querySelector(".formulario");
    let obrasocial = document.querySelector(".obrasocial");
    let localizacion = document.querySelector(".localizacion");
    let usuarioId = document.getElementById("oculto").value;
    let experiencia = document.getElementById("experiencia");
    let escolar = document.getElementById("escolar");
    let domiciliario = document.getElementById("domiciliario");
    let documentacion = document.getElementById("documentacion");

    if(!escolar.checked && !domiciliario.checked)
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

    else if(documentacion){

    }
    else
    {
        let disponibilidad = cargarSeleccion();
        // let documentacion = "Viva messi";
        let response = postAcompanante(usuarioId, localizacion, telefono.value, disponibilidad, documentacion, experiencia.value);
        let acompananteId= response.id;
        //post especialidad
        if(escolar.value == "escolar"){
            postEspecialidad(acompananteId);
        }
        if(domiciliario.value === "domiciliario" ){
            postEspecialidad(acompananteId);
        }
        //post obra social

    }
});

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
  return obtenerIndicesDesdeCadena(crearArreglo(agenda));
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