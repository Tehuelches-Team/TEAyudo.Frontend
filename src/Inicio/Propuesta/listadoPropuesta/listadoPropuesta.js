import { getPropuestaAT, getPropuestaTutor, putEstadoPropuesta } from "../../../Services/PropuestaService.js";
import sinPropuestas from "./mapping/sinPropuestas.js";
import detallePropuesta from "./mapping/detallePropuesta.js";
import tarjetaPropuesta from "./mapping/tarjetaPropuesta.js";
import { getIdAcompanante } from "../../../Services/AcompTerapService.js";
import { getIdTutor } from "../../../Services/TutorService.js";

var tipoUsuario;

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);  
    const id = urlParams.get('id');
    tipoUsuario = urlParams.get('tipoUsuario');
    if (tipoUsuario == 1){
        let acompananteId = await getIdAcompanante(id);
        let propuestas = await getPropuestaAT(acompananteId.id);
        await mapearPropuestasDelAcompanante(propuestas);
    }
    else
    {
        let tutorId = await getIdTutor(id);
        let propuestas = await getPropuestaTutor(tutorId.id);
        await mapearPropuestasDelTutor(propuestas);
    }
};

const mapearPropuestasDelAcompanante = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    if (objeto.length != 0)
    {
        for (let index = 0; index < objeto.length; index++) {
            contenedorLista.innerHTML += await tarjetaPropuesta(objeto[index].propuestaId, 
                objeto[index].tutorResponse.nombre, objeto[index].tutorResponse.apellido, 
                objeto[index].estadoPropuesta, objeto[index].tutorResponse.fotoPerfil, objeto[index].descripcion);
                    
        };
        await agregarEvento();
    }
    else
    {
        contenedorLista.innerHTML = await sinPropuestas(); 
    }
}





const mapearPropuestasDelTutor = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    if (objeto.length != 0)
    {
        for (let index = 0; index < objeto.length; index++) {
            contenedorLista.innerHTML += await tarjetaPropuesta(objeto[index].propuestaId, objeto[index].acompananteResponse.nombre, objeto[index].acompananteResponse.apellido, objeto[index].estadoPropuesta, objeto[index].acompananteResponse.fotoPerfil, objeto[index].descripcion);
                    
        };
        await agregarEvento();
    }
    else
    {
        let conteiner = document.getElementById("contenedor-pagina-propuesta");
        conteiner.innerHTML = await sinPropuestas(); 
    }
}

const agregarEvento = async () =>
{
    let contenedorDetalle = document.getElementById("columna-visualizados");
    let divs = document.querySelectorAll('.elemento-lista-propuesta');
    divs.forEach(async element => {
        element.addEventListener("click", async() => 
        {
            contenedorDetalle.innerHTML = await detallePropuesta(element.id, element.getAttribute("data-info"), element.getAttribute("data-estado"), tipoUsuario);
            await botonRojo();
            await botonVerde();
            await AbrirChat();
        });
    });
}


const botonRojo = async () => 
{   
    document.getElementById("botonRechazar").addEventListener("click", async() =>  
    {
        let propuestaId = document.querySelector(".visualizar-propuesta").id;
        await putEstadoPropuesta(propuestaId, 2);
    });
}  


const botonVerde = async () => 
{
    document.getElementById("botonAceptar").addEventListener("click", async() => 
    {
        let propuestaId = document.querySelector(".visualizar-propuesta").id;
        await putEstadoPropuesta(propuestaId, 1);
    })};

const AbrirChat = async () => 
{
    document.getElementById("botonAbrirChat").addEventListener("click", async() =>  
    {
        let propuestaId = document.querySelector(".visualizar-propuesta").id;
        window.open(`../../../Chat/chat.html?propuestaId=${propuestaId}`);
    });
}
