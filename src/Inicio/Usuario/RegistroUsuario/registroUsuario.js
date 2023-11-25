import postUsuario from "../../../Services/usuarioService";

document.getElementById("boton").addEventListener("click", async() =>
{
    // let nombre = document.getElementById("nombre").value;
    // let apellido = document.getElementById("apellido");
    // let correo = document.getElementById("correo");
    let fechaNacimiento = document.getElementById("fechaNacimiento");
    let cuil = document.getElementById("cuil");
    let telefono = document.getElementById("telefono");
    let formulario = document.querySelector(".formulario");
    // let tipoUsuario = document.getElementById("tipoUsuario");
    let tipoUsuarioInputs = document.querySelectorAll('input[name="tipoUsuario"]');
    let noSeleccionado = true;
    let numUsuario;
    for (var i = 0; i < tipoUsuarioInputs.length; i++) {
        if (tipoUsuarioInputs[i].checked) {
            noSeleccionado = false;
            numUsuario = i;
        }
    };
    if (fechaNacimiento === "" || cuil.value === "" || telefono.value.length != 10 || noSeleccionado)
    {
        if (fechaNacimiento === "")
        {
            fechaNacimiento.setCustomValidity('Ingrese la fecha de nacimiento'); 
        }
        
        else if (cuil == "")
        {
            cuil.setCustomValidity('El cuil es obligatorio');
        } 
        
        else if(telefono.value.length < 10)
        {
            telefono.setCustomValidity('El número de telefono debe tener menos de 10 dígitos'); 
        }  
        
        else if(telefono.value.length > 10)
        {
            telefono.setCustomValidity('El numero de telefono debe tener 10 dígitos'); 
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
        let response = await postUsuario(numOculto, usuario, cantidad); //Consultar status
        let responseJson = JSON.stringify(response);
        window.location.href = `./ticket.html?response=${encodeURIComponent(responseJson)}`;

    }; //De acuerdo al tipo de usuario se le debe de enviar la id de usuario.
});
