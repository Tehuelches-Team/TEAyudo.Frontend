import { getPropuestaAT, getPropuestaTutor, putEstadoPropuesta } from "../../../Services/PropuestaService.js";
import detallePropuesta from "./mapping/detallePropuesta.js";
import tarjetaPropuesta from "./mapping/tarjetaPropuesta.js";

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);  
    // const id = urlParams.get('usuarioId');
    // const tipoUsuario = urlParams.get('tipoUser');
    const id = 1;
    const tipoUsuario = 2;
    if (tipoUsuario == 1){
        let propuestas = await getPropuestaAT(id);
        await mapearPropuestasDelAcompanante(propuestas);
    }
    else
    {
        let propuestas = await getPropuestaTutor(id);
        await mapearPropuestasDelTutor(propuestas);
    }
};

const mapearPropuestasDelAcompanante = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    let contenedorDetalle = document.getElementById("columna-visualizados");
    if (objeto.lenght != 0)
    {
        await objeto.forEach(async element => {
            contenedorLista.innerHTML += await tarjetaPropuesta(element.propuestaId, element.tutorResponse.nombre, element.tutorResponse.apellido, element.estadoPropuesta, element.tutorResponse.fotoPerfil, element.descripcion);
        });
        await agregarEvento();
    }
    else
    {
        contenedorLista.innerHTML = sinFunciones(); 
    }
}





const mapearPropuestasDelTutor = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    if (objeto.lenght != 0)
    {
        for (let index = 0; index < objeto.length; index++) {
            contenedorLista.innerHTML += await tarjetaPropuesta(objeto[index].propuestaId, objeto[index].acompananteResponse.nombre, objeto[index].acompananteResponse.apellido, objeto[index].estadoPropuesta, objeto[index].acompananteResponse.fotoPerfil, objeto[index].descripcion);
                    
        };
        await agregarEvento();
    }
    else
    {
        contenedorLista.innerHTML = sinFunciones(); 
    }
}

const agregarEvento = async () =>
{
    let result;
    let contenedorDetalle = document.getElementById("columna-visualizados");
    let divs = document.querySelectorAll('.elemento-lista-propuesta');
    divs.forEach(async element => {
        element.addEventListener("click", async() => 
        {
            contenedorDetalle.innerHTML = await detallePropuesta(element.id, element.getAttribute("data-info"));
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
