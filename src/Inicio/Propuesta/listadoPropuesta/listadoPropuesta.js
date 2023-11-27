import { getPropuestaAT, getPropuestaTutor } from "../../../Services/PropuestaService.js";
import detallePropuesta from "./mapping/detallePropuesta.js";
import tarjetaPropuesta from "./mapping/tarjetaPropuesta.js";

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);  
    // const id = urlParams.get('id');
    // const tipoUsuario = urlParams.get('tipoUsuario');
    const id = 1;
    const tipoUsuario = 1;
    if (tipoUsuario == 1){
        let propuestas = await getPropuestaAT(id);
        mapearPropuestasDelAcompanante(propuestas);
    }
    else
    {
        let propuestas = await getPropuestaTutor(id);
        mapearPropuestasDelTutor(propuestas);
    }
};

const mapearPropuestasDelAcompanante = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    let contenedorDetalle = document.getElementById("columna-visualizados");
    objeto.forEach(async element => {
        contenedorLista.innerHTML += await tarjetaPropuesta(element.propuestaId, element.tutorResponse.nombre, element.tutorResponse.apellido, element.estadoPropuesta, element.tutorResponse.fotoPerfil);
    });
    // contenedorDetalle.innerHTML += await detallePropuesta();
}





const mapearPropuestasDelTutor = async (objeto) => 
{
    let contenedorLista = document.getElementById("columna-lista-propuestas");
    let contenedorDetalle = document.getElementById("columna-visualizados");
    
    objeto.forEach(async element => {
        contenedorLista.innerHTML += await tarjetaPropuesta(element.propuestaId, element.acompananteResponse.nombre, element.acompananteResponse.apellido, element.estadoPropuesta, element.acompananteResponse.fotoPerfil);
    });
    // contenedorDetalle.innerHTML += await detallePropuesta();
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