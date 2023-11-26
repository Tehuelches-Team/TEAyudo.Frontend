import { postPropuesta } from "../../Services/PropuestaService.js";

var tutorId = 0;
var acompananteId = 0;

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    acompananteId = urlParams.get('acompananteId');
    tutorId = urlParams.get('tutorId');
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
        //faltan los id y el post
        await postPropuesta(tutorId, acompananteId, tipoAT, descripcion.value);

        window.location.href = `../Usuario/tutor/tutorBusqueda/tutorBusqueda.html?tutorId=${tutorId}`;
    };
});