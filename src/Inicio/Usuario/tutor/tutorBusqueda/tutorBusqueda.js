import { CargarAT } from "../../../../Services/AcompTerapService.js";
import {mappingAt, mappingResult } from "./mapping/cartaTutor.js";

var tutorId = 0;

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    tutorId = urlParams.get('tutorId');
    let response = await CargarAT("","","","");
    await mapearAcompanantes(response);

};

const mapearAcompanantes = async (response) => {
    let contenedor = document.querySelector('.contenedor-resultados');
    if (response.ok === true)
    {
        if (response.status === 200)
        {
            let result = await response.json();
            let cantidad = document.getElementById("cantidad-resultados");
            cantidad.innerHTML = mappingResult(result.length);
            if (result.length !== 0)
            {
                let atMapeados = await result.map((at) => {
                    if (at.especialidad.length == 2){
                        return mappingAt(at.acompananteId,at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0].descripcion,at.especialidad[1].descripcion,at.experiencia);
                    };
                    if(at.especialidad.length == 1) {
                        if(at.especialidad.length == 1){
                            return mappingAt(at.acompananteId,at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0].descripcion,"",at.experiencia);
                        };
                    }
                }).join("");
                contenedor.innerHTML = atMapeados; 
            }
        }
    }
    let ats = document.querySelectorAll('.resultado');
    ats.forEach((at) => {
        at.addEventListener("click", () => {
            window.location.href = `../../Acompanante/PerfilAcompanante/perfilAcompanante.html?acompananteId=${at.id}&tutorId=${tutorId}`; //Mandar a la página de roco.
        });
    });
};

let boton = document.querySelector(".boton-basico");
boton.addEventListener("click", async (e) => {
    e.preventDefault();
    let desplegableEspecialidad = document.getElementById("select-especialidad");
    let Incide = desplegableEspecialidad.selectedIndex;
    let especialidad = desplegableEspecialidad.options[Incide].getAttribute("data-info"); //Se puede eliminar (CREO)

    if(especialidad == null){
        especialidad = "";
    }

    let desplegableObraSocial = document.getElementById("select-obraSocial");
    Incide = desplegableObraSocial.selectedIndex;
    let obrasocial = desplegableObraSocial.options[Incide].getAttribute("data-info");
    
    if(obrasocial == null){
        obrasocial = "";
    }

    let zonaLaboral = document.getElementById("zonaLaboral").value;
    let disponibilidad = cargarSeleccion();
    let response = await CargarAT(especialidad,disponibilidad,obrasocial,zonaLaboral);
    if (response.ok === true)
    {
        if (response.status === 200)
        {
            await mapearAcompanantes(response);
        }
    }
    else if (response.status === 404){
        let cantidad = document.getElementById("cantidad-resultados");
        cantidad.innerHTML = mappingResult(0);
        let contenedor = document.querySelector('.contenedor-resultados');
        contenedor.innerHTML = "";
    }
});



function cargarSeleccion() {
    let agenda = [];
    const seleccion = document.querySelectorAll(".celda-verde");
    seleccion.forEach((elemento) => {
      agenda.push(elemento.id);
    });
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