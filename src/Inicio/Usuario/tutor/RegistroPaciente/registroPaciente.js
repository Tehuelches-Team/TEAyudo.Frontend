import { postPaciente } from "../../../../Services/TutorService.js";

var tutorId = 0;

window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    tutorId = urlParams.get('tutorId');
    document.getElementById('ocultoTutorId').value = tutorId;
};

document.getElementById("RegistraPaciente").addEventListener("click", async() =>
{
    let formulario = document.getElementById('formularioRegistroPaciente');

    let tutorIdValue = document.getElementById('ocultoTutorId').value;
    let nombreObjet = document.getElementById('nombre');
    let apellidoObjet = document.getElementById('apellido');
    let arraySexo = document.querySelectorAll('input[name="sexo"]');
    let fechaNacimientoObjet = document.getElementById('fechaNacimiento');
    let diagnosticoObjet = document.getElementById('diagnostico');
    let cudObjet = document.getElementById('CUD');

    let numSexo;
    let noSeleccionado = true;
    for (var i = 0; i < arraySexo.length; i++) {
        if (arraySexo[i].checked) {
            noSeleccionado = false;
            numSexo = i;
        }
    };  
    document.getElementById('masculino').setCustomValidity('');     
    if(nombreObjet.value === "")
    {
        nombreObjet.setCustomValidity('Debe completar este campo');          
        formulario.reportValidity();
        nombreObjet.setCustomValidity(''); 
    }
    else if (apellidoObjet.value === "")
    {
        apellidoObjet.setCustomValidity('Debe completar este campo');          
        formulario.reportValidity(); 
        apellidoObjet.setCustomValidity('');
    }
    else if(noSeleccionado)
    {
        document.getElementById('masculino').setCustomValidity('debe seleccionar una opcion'); 
        formulario.reportValidity(); 
        
    }
    else if(fechaNacimientoObjet.value === "")
    {
        fechaNacimientoObjet.setCustomValidity('Debe completar este campo');          
        formulario.reportValidity(); 
        fechaNacimientoObjet.setCustomValidity('');
    }
    else if(diagnosticoObjet.value === "")
    {
        diagnosticoObjet.setCustomValidity('Debe completar este campo');          
        formulario.reportValidity(); 
        diagnosticoObjet.setCustomValidity('');
    } 
    else if(cudObjet.value === "")
    {
        cudObjet.setCustomValidity('Debe completar este campo');          
        formulario.reportValidity(); 
        cudObjet.setCustomValidity(''); 
    }  
    else
    {
        await postPaciente(tutorIdValue, nombreObjet.value, apellidoObjet.value, fechaNacimientoObjet.value, diagnosticoObjet.value, arraySexo[numSexo].value, cudObjet.value);
        window.location.href = `../tutorBusqueda/tutorBusqueda.html?tutorId=${tutorId}`;
    }
});
