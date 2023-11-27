import { getPropuestaAT, getPropuestaTutor } from "../../../Services/PropuestaService.js";
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
        });
    });
}





// https://localhost:7231/api/Propuesta/1/Acompanante

// [
//     {
//       "propuestaId": 1,
//       "tutorId": 1,
//       "acompananteId": 1,
//       "infoAdicional": "posbiles apunalamientos",
//       "monto": 2220,
//       "estadoPropuesta": 0,
//       "descripcion": "posibles muertes",
//       "tutorResponse": {
//         "usuarioId": 1,
//         "nombre": "roco",
//         "apellido": "duarte",
//         "correoElectronico": "ro@",
//         "contrasena": "asdasd",
//         "fotoPerfil": "https://pics.filmaffinity.com/8_crazy_nights-470524560-large.jpg",
//         "domicilio": "calle 104",
//         "fechaNacimiento": "12/12/2023",
//         "estadoUsuarioId": 0
//       }
//     }
//   ]










                                        // TUTOR    propuesta hechas por el tutor tutor 

// https://localhost:7231/api/Propuesta/1/Tutor

// [
//     {
//       "propuestaId": 1,
//       "tutorId": 1,
//       "acompananteId": 1,
//       "infoAdicional": "posbiles apunalamientos",
//       "monto": 2220,
//       "estadoPropuesta": 0,
//       "descripcion": "posibles muertes",
//       "acompananteResponse": {
//         "acompananteId": 1,
//         "usuarioId": 2,
//         "nombre": "franco",
//         "apellido": "paiz",
//         "correoElectronico": "fran@",
//         "contrasena": "asdasd",
//         "fotoPerfil": "https://pics.filmaffinity.com/napoleon-775472086-large.jpg",
//         "domicilio": "belgrano",
//         "fechaNacimiento": "12/12/2023",
//         "estadoUsuarioId": 0,
//         "zonaLaboral": "varela",
//         "contacto": "asdasdada",
//         "documentacion": "ninguna",
//         "experiencia": "fumo mucho porro",
//         "obrasSociales": [],
//         "disponibilidad": "000000111111",
//         "especialidad": []
//       }
//     }
//   ]





                                        // Acompanante    propuesta recibidas por el acompanante 

// https://localhost:7231/api/Propuesta/1/Acompanante

// [
//     {
//       "propuestaId": 1,
//       "tutorId": 1,
//       "acompananteId": 1,
//       "infoAdicional": "posbiles apunalamientos",
//       "monto": 2220,
//       "estadoPropuesta": 0,
//       "descripcion": "posibles muertes",
//       "tutorResponse": {
//         "usuarioId": 1,
//         "nombre": "roco",
//         "apellido": "duarte",
//         "correoElectronico": "ro@",
//         "contrasena": "asdasd",
//         "fotoPerfil": "https://pics.filmaffinity.com/8_crazy_nights-470524560-large.jpg",
//         "domicilio": "calle 104",
//         "fechaNacimiento": "12/12/2023",
//         "estadoUsuarioId": 0
//       }
//     }
//   ]