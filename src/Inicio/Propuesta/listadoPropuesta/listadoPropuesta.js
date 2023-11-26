import detallePropuesta from "./mapping/detallePropuesta.js";
import tarjetaPropuesta from "./mapping/tarjetaPropuesta.js";

window.onload = async function() {
    // const urlParams = new URLSearchParams(window.location.search);  
    // const dato = urlParams.get('usuarioId');
    // document.getElementById("oculto").value = dato;
    await mapear();
};

const mapear = async () => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    let contenedorDetalle = document.getElementById("columna-visualizados");
    contenedorLista.innerHTML += await tarjetaPropuesta();
    contenedorDetalle.innerHTML += await detallePropuesta();
}