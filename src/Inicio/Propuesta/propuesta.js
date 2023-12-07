import { postPropuesta } from "../../Services/PropuestaService.js";
import { getIdTutor } from "../../Services/TutorService.js";

var tutorId = 0;
var acompananteId = 0;
let usuarioId = 0;

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    acompananteId = urlParams.get('acompananteId');
    usuarioId = urlParams.get('tutorId');
    tutorId = await getIdTutor(usuarioId);
}

document.getElementById("botonPropuesta").addEventListener("click", async (e) => 
{
    e.preventDefault();
    let formularioObjeto = document.getElementById("formulario-crear-propuesta");
    let domiciliarioCheckbox = document.getElementById("domiciliario");
    let escolarCheckbox = document.getElementById("escolar");
    let descripcion = document.getElementById("textarea");
    const servicio = document.getElementsByName("tipo-servicio");
    let tipoAT;
    servicio.forEach(radio => {
        if (radio.checked) {
            tipoAT = radio.id;
        }
    });


    domiciliarioCheckbox.setCustomValidity('');
    descripcion.setCustomValidity('');
    
    if(!domiciliarioCheckbox.checked && !escolarCheckbox.checked)
    {
        domiciliarioCheckbox.setCustomValidity("Debe seleccionar al menos una especialidad");
        formularioObjeto.reportValidity(); 
    }

    else if(descripcion.value === "")
    {
        descripcion.setCustomValidity("Por favor ingrese una descripcion leve de la propuesta");
        formularioObjeto.reportValidity(); 
    }

    else
    {
        await postPropuesta(tutorId.id, acompananteId, tipoAT, descripcion.value);
        window.location.href = `../index.html?id=${usuarioId}&tipoUsuario=${2}`;
    };
});