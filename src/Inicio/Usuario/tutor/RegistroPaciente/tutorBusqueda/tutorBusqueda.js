import { CargarAT } from "../../../../../Services/AcompTerapService.js";
import {mappingAt, mappingResult } from "./mapping/cartaTutor.js";

window.onload = async function ()  {
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
                let atMapeados = result.map((at) => {
                    if (at.especialidad.length == 2){
                        return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0].descripcion,at.especialidad[1].descripcion,at.experiencia);
                    };
                    if(at.especialidad.length == 1) {
                        
                        if(at.especialidad[0].descripcion === "Acompañamiento Escolar"){
                            return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0].descripcion,"",at.experiencia);
                        };

                        if(at.especialidad[0].descripcion === "Cuidado domiciliario"){
                            return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0].descripcion,"",at.experiencia);
                        };
                    }
                }).join("");
                contenedor.innerHTML = atMapeados;    
            }
        }
    }
};