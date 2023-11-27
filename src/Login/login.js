import { traerUsers } from "../Services/LoginService.js";

document
  .getElementById("buscarUsers")
  .addEventListener("click", async function () {
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("password").value;
    traerUsers();
  });
