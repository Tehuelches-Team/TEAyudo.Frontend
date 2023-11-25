import postAcompanante from "../../../../Services/AcompTerapService";

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);  
  const dato = urlParams.get('id'); //guardar id en un div invisible
  document.getElementById("oculto").value = dato;
};



document.getElementById("boton").addEventListener("click", async() =>
{
    let telefono = document.getElementById("telefono").value;
    let tipoUsuarioInputs = document.querySelectorAll('input[name="tipoUsuario"]');
    let descripcion = document.getElementById("descripcion").value;
    let formulario = document.querySelector(".formulario");
    let obrasocial = document.querySelector(".obrasocial");
    let localizacion = document.querySelector(".localizacion").value;
    let usuarioId = document.getElementById("oculto").value;
    let noSeleccionado = true;
    let numUsuario;
    for (var i = 0; i < tipoUsuarioInputs.length; i++) {
        if (tipoUsuarioInputs[i].checked) {
            noSeleccionado = false;
            numUsuario = i;
        }
    };
    if(noSeleccionado)
    {
        document.getElementById("domiciliario").setCustomValidity('Debe seleccionar un tipo de acompanante');          
        formulario.reportValidity(); 
    }
    else if(telefono.length != 10)
    {
        telefono.setCustomValidity('El numero de telefono debe tener 10 dígitos'); 
        formulario.reportValidity(); 
    }  
    else
    {
        let disponibilidad = cargarSeleccion();
        let documentacion = "Viva messi";
        let experiencia = "5 años";
        let response = postAcompanante(usuarioId, localizacion, telefono, disponibilidad, documentacion, experiencia);
        let acompananteId= response.id;
        //post especialidad
        if(tipoUsuarioInputs[numUsuario].value === "escolar" ){
            postEspecialidad(acompananteId);
        }
        if(tipoUsuarioInputs[numUsuario].value === "domiciliario" ){
            postEspecialidad(acompananteId);
        }
        //post obra social
    }
});

document.getElementById("boton").addEventListener("click", function () {
    
  });

function cargarSeleccion() {
  let agenda = [];
  const seleccion = document.querySelectorAll(".celda-verde");
  seleccion.forEach((elemento) => {
    agenda.push(elemento.id);
  });
  console.log(crearArreglo(agenda));
  console.log(obtenerIndicesDesdeCadena(crearArreglo(agenda)));
  return obtenerIndicesDesdeCadena(crearArreglo(agenda));
}

function crearArreglo(indicesRecibidos) {
  const arreglo = new Array(12).fill(0);

  indicesRecibidos.forEach((indice) => {
    if (indice >= 1 && indice <= 6) {
      arreglo[indice - 1] = 1; // Mañana
    } else if (indice >= 7 && indice <= 12) {
      arreglo[indice - 7 + 6] = 1; // Tarde
    }
  });

  return arreglo.join("");
}

function obtenerIndicesDesdeCadena(cadena) {
  const arreglo = cadena.split("").map(Number);
  const indices = [];

  arreglo.forEach((valor, indice) => {
    if (valor === 1) {
      if (indice < 6) {
        indices.push(indice + 1); // Mañana
      } else {
        indices.push(indice + 1 - 6 + 7); // Tarde
      }
    }
  });

  return indices;
}