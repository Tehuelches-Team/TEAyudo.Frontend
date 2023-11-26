import {postAcompanante,postEspecialidad, postObraSocial} from "../../../../Services/AcompTerapService.js";
import mappingObraSocial from "./mapping/obraSocial.js";

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
    let obrasocial = document.querySelectorAll(".obraSocial");
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
        obrasocial.forEach( async ob => {
          console.log(ob.getAttribute("data-info"));
          await postObraSocial(acompananteId, ob.getAttribute("data-info"));
        });
    }
});


document.getElementById("select").addEventListener("change", async(e) =>
{
  let contenedor = document.getElementById("obraSociales-seleccionadas");
  let opcionSeleccionada = e.target.options[e.target.selectedIndex];
  let unaObraSocial = opcionSeleccionada.value;
  let id = opcionSeleccionada.getAttribute("data-info");
  let existe = document.getElementById(unaObraSocial);
  if (existe === null && unaObraSocial !== "" )
  {
    contenedor.innerHTML += await mappingObraSocial(unaObraSocial, id);  
    let divs = document.querySelectorAll(".obraSocial");
    divs.forEach(element => {
      element.addEventListener("click", (e) => 
        {
          contenedor.removeChild(e.target);
        }
      );
    });
  }
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