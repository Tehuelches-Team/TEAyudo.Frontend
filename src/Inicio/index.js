import { login } from "../Services/usuarioService.js";

var id;
var tipoUsuario;


window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get('id');
  if (id != null)
  {
    tipoUsuario = urlParams.get('tipoUsuario');
    mapearBotonPropuestas();
    if(tipoUsuario == 2)
    {
      mapearBotonBusqueda();
    }
    await addListen();
    await desaparecerBotones();
  }
};

export const loginPrincipal = document.querySelector("#LoginPrincipal");

// document.getElementById("buscarProfesional")
//   .addEventListener("click", function () {
//     cargarSeleccion();
//   });

function cargarSeleccion() {
  let agenda = [];
  const seleccion = document.querySelectorAll(".celda-verde");
  seleccion.forEach((elemento) => {
    agenda.push(elemento.id);
  });
  // console.log(crearArreglo(agenda));
  // console.log(obtenerIndicesDesdeCadena(crearArreglo(agenda)));
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

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const loginModal = document.getElementById("loginModal");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const loginForm = document.getElementById("loginForm");

  // Mostrar el modal al hacer clic en el botón de abrir
  openModalBtn.addEventListener("click", function () {
    loginModal.style.display = "block";
  });

  // Ocultar el modal al hacer clic en el botón de cerrar
  closeModalBtn.addEventListener("click", function () {
    loginModal.style.display = "none";
  });

  // Configuración de la autenticación de Google
  // googleLoginBtn.addEventListener("click", function () {
  //   // Lógica de autenticación con Google (usando la API de Google)
  //   // Aquí debes implementar la lógica de autenticación con Google
  //   // Puedes usar el botón de inicio de sesión de Google proporcionado por la API.
  // });

  // Agregar evento de submit al formulario (puedes agregar lógica para el login local)
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Lógica de login local...
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let usuarioLogeado = await login(email, password);
    if (usuarioLogeado == 7)
    {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      const formulario = document.getElementById("loginForm");
      document.getElementById("email").setCustomValidity('no se encontraron coincidencias');
      formulario.reportValidity(); 
    }
    else
    {
      loginModal.style.display = "none"; // Cerrar el modal después del login
      let tipoUser = usuarioLogeado.tipoUsuario;
      let usuarioId = usuarioLogeado.usuarioId;
      window.location.href = `${window.location.pathname}?id=${usuarioId}&tipoUsuario=${tipoUsuario}`;
      //window.location.href = `../${tipoUser}/index.html?usuarioId=${usuarioId}`;
    };
  });
});

document.getElementById("botonRegistrar").addEventListener("click", () => {
  window.location.href = `./Usuario/RegistroUsuario/registroUsuario.html`;
});

const mapearBotonBusqueda = async () => 
{
  const contenedor = document.querySelector(".header__li");
  contenedor.innerHTML += `<button class="btn_iniciar" id="botonBusqueda">Busqueda AT</button>`;
}

const mapearBotonPropuestas = async () => 
{
  const contenedor = document.querySelector(".header__li");
  contenedor.innerHTML += `<button class="btn_iniciar" id="botonPropuestas">Ver propuestas</button>`;
  contenedor.innerHTML += `<button class="btn_iniciar" id="botonDeslogear">Cerrar sesión</button>`
  // document.getElementById("botonDeslogear").addEventListener( "click", () =>{
  //   window.location.href = `${window.location.pathname}?id=${null}&tipoUsuario=${null}`;
  // }); 
}

const addListen = async () => 
{
  let botonBusqueda = document.getElementById("botonBusqueda");
  if (botonBusqueda != null)
  {
    botonBusqueda.addEventListener("click", () => 
    {
      window.location.href = `./Usuario/tutor/tutorBusqueda/tutorBusqueda.html?tutorId=${id}`;
    });
  }
  let botonPropuesta = document.getElementById("botonPropuestas");
  botonPropuesta.addEventListener("click", () => 
  {
    window.location.href = `./Propuesta/listadoPropuesta/listadoPropuesta.html?id=${id}&tipoUsuario=${tipoUsuario}`;
  });  
}


const desaparecerBotones = async () => 
{
  document.getElementById("openModalBtn").style.display = "none";
  document.getElementById("botonRegistrar").style.display = "none"; 
}