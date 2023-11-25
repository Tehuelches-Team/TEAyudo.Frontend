import postTutor from "../../../Services/TutorService.js";
import postUsuario from "../../../Services/usuarioService.js";

document.getElementById("boton").addEventListener("click", async() =>
{
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let correo = document.getElementById("correo");
    let fechaNacimiento = document.getElementById("fechaNacimiento");
    let cuil = document.getElementById("cuil");
    let domicilio = document.getElementById("domicilio");
    let formulario = document.querySelector(".formulario");
    // let tipoUsuario = document.getElementById("tipoUsuario");
    let tipoUsuarioInputs = document.querySelectorAll('input[name="tipoUsuario"]');
    let fotoPerfil = document.querySelector(".imagen");
    let contrasena = "asfsafsac";
    let noSeleccionado = true;
    let numUsuario;
    for (var i = 0; i < tipoUsuarioInputs.length; i++) {
        if (tipoUsuarioInputs[i].checked) {
            noSeleccionado = false;
            numUsuario = i;
        }
    };
    if (fechaNacimiento === "" || cuil.value === "" || domicilio === "" || noSeleccionado)
    {
        if (fechaNacimiento === "")
        {
            fechaNacimiento.setCustomValidity('Ingrese la fecha de nacimiento'); 
        }
        
        else if (cuil == "")
        {
            cuil.setCustomValidity('El cuil es obligatorio');
        }   

        else if(domicilio === ""){
            domicilio.setCustomValidity('El domicilio es obligatorio');
        }

        else if(noSeleccionado)
        {
            document.getElementById("tutor").setCustomValidity('Debe seleccionar un tipo de usuario');          
        }
        
        formulario.reportValidity(); 
    }
    else
    {
        alert(tipoUsuarioInputs[numUsuario].value); 
        	
// { Esto devuelve el postUsuario
//   "usuarioId": 6,
//   "cuil": 1,
//   "nombre": "string",
//   "apellido": "string",
//   "correoElectronico": "string",
//   "contrasena": "string",
//   "fotoPerfil": "string",
//   "domicilio": "string",
//   "fechaNacimiento": "12/08/1990",
//   "estadoUsuarioId": 0
// }
    let response = await postUsuario(nombre.value, apellido.value, correo.value, fechaNacimiento.value, cuil.value, domicilio.value, "rfasfasfasfas", contrasena); //Consultar status
    let id = response.id;
    if(tipoUsuarioInputs[numUsuario].value == "acompanante"){
        window.location.href = `../Acompanante/RegistroAcompanante/registroAcompanante.html=${id}`; //Post acompanante
    }
    if(tipoUsuarioInputs[numUsuario].value == "tutor"){
        postTutor(id);
        window.location.href = `../Tutor/RegistroPaciente/registroPaciente.html=${id}`; //Post tutor
    }
    
    };
});
