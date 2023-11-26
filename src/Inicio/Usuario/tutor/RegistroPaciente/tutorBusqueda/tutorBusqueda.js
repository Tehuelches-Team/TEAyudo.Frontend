import { CargarAT } from "../../../../../Services/AcompTerapService.js";
import mappingAt from "./mapping/cartaTutor.js";

window.onload = async function ()  {
    let response = await CargarAT("","","","");
    await mapearAcompanantes(response);

};

const mapearAcompanantes = async (response) => {
    let contenedor = document.querySelector('.resultado');
    if (response.ok === true)
    {
        if (response.status === 200)
        {
            let result = await response.json();
            if (result.length !== 0)
            {
                let atMapeados = result.map((at) => {
                    if (at.especialidad.length == 2){
                        return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0],at.especialidad[1]);
                    }
                    if(at.especialidad.length == 1) {
                        
                        if(at.especialidad[0] === "domiciliario"){
                            return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,"",at.especialidad[0]);
                        }

                        if(at.especialidad[0] === "escolar"){
                            return mappingAt(at.fotoPerfil,at.nombre,at.apellido,at.domicilio,at.especialidad[0],"");
                        }
                    }
                }).join("");
                contenedor.innerHTML = atMapeados;    
            }
            else
            {
                //contenedor.innerHTML = await sinFunciones();
            }
        }
        else
        {
            console.log(`El servidor contesto con un ${response.status}`);
        }
    }
    else
    {
        console.log("Error de conexion");
    }
};