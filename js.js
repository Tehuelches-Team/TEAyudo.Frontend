//cambia el color de las celdas al hacer click
function cambiarColor(elemento) {
    elemento.classList.toggle('celda-verde');
  }
// establece limite de caracteres al mostrar el parrafo de un resultado de busqueda
  document.addEventListener('DOMContentLoaded', function () {
    var resultados = document.querySelectorAll('.resultado p');
    var limiteCaracteres = 90;

    resultados.forEach(function (resultado) {
        if (resultado.textContent.length > limiteCaracteres) {
            resultado.textContent = resultado.textContent.substring(0, limiteCaracteres) + '...';
        }
    });
});
// formulario cargado por google, permite asignar un valor a un campo y despues lo bloquea para que no se pueda modificar
  // Obtén el elemento input
  var nombre = document.getElementById("nombre");
  var apellido = document.getElementById("apellido");
  var correo = document.getElementById("correo");

  // Establece el valor del input
  nombre.value = "Juan";
  apellido.value = "Perez";
  correo.value = "JuanPerez@gmail.com";

  // Desactiva (bloquea) el input
  nombre.disabled = true;
  apellido.disabled = true;
  correo.disabled = true;

