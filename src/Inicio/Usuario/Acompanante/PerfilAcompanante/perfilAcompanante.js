import { mapearContenedor1, mapearContenedor2, mapearContenedor3, mapearContenedor4 } from "./mapping/mapear.js";
import { getAcompanante } from "../../../../Services/AcompTerapService.js";

var tutorId = "";

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const acompananteId = urlParams.get('acompananteId');
    tutorId = urlParams.get('tutorId');
    let result = await getAcompanante(acompananteId);
    await mapearpagina(result);
};


const mapearpagina = async (result) => {
    let contenedor1 = document.getElementById("contenedor1");
    let contenedor2 = document.getElementById("contenedor2");
    let contenedor3 = document.getElementById("contenedor3");
    let contenedor4 = document.getElementById("contenedor-derecho");
    contenedor1.innerHTML += await mapearContenedor1(result);
    contenedor2.innerHTML += await mapearContenedor2(result);
    contenedor3.innerHTML += await mapearContenedor3(result.obrasSociales);
    contenedor4.innerHTML += await mapearContenedor4(result);
    await pintarCeldas(result.disponibilidad); 
    let boton = document.getElementById("propuesta-boton");
    boton.addEventListener( "click", (e) => {
        e.preventDefault();
        window.location.href = `../../../Propuesta/propuesta.html?acompananteId=${result.acompananteId}&tutorId=${tutorId}`; 
});

};

const pintarCeldas = async (cadena) => {
    let arrayCeldas = document.querySelectorAll('.celda-clic'); 
    for (let i = 0; i < arrayCeldas.length; i++) {
        if (cadena[i] === "0")
        {
            if(arrayCeldas[i].classList.contains("celda-verde"))
            {
                arrayCeldas[i].classList.remove("celda-verde");
                arrayCeldas[i].classList.add("celda-clic");
            }    
        }
        else
        {
            if(arrayCeldas[i].classList.contains("celda-clic"))
            {
                arrayCeldas[i].classList.remove("celda-clic");
                arrayCeldas[i].classList.add("celda-verde");
            }
        }    
    }
}