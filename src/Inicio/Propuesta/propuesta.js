document.getElementById("botonPropuesta").addEventListener("click", async (e) => 
{
    e.preventDefault();
    let formularioObjeto = document.getElementById("formulario-crear-propuesta");
    let obrasSocialesObjeto = document.getElementById("selectObrasSociales");
    let domiciliarioCheckbox = document.getElementById("domiciliario");
    let escolarCheckbox = document.getElementById("escolar");
    let textareaObjeto = document.getElementById("textarea");
    obrasSocialesObjeto.setCustomValidity(''); 
    domiciliarioCheckbox.setCustomValidity('');
    textareaObjeto.setCustomValidity('');
    if (obrasSocialesObjeto.value === "")
    {
        obrasSocialesObjeto.setCustomValidity("Debe seleccionar una obra social"); 
        formularioObjeto.reportValidity(); 
    }
    else if(!domiciliarioCheckbox.checked && !escolarCheckbox.checked)
    {
        domiciliarioCheckbox.setCustomValidity("Debe seleccionar al menos una especialidad");
        formularioObjeto.reportValidity(); 
    }
    else if(textareaObjeto.value === "")
    {
        textareaObjeto.setCustomValidity("Por favor ingrese una descripcion leve de la propuesta");
        formularioObjeto.reportValidity(); 
    }
    else
    {
        //faltan los id y el post
        window.location.href = `../Usuario/tutor/tutorBusqueda/tutorBusqueda.html`;
    };
});