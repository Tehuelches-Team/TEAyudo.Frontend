export default async function tarjetaPropuesta(id, nombre, apellido, estadoPropuesta, fotoPerfil)
{
    return  `
            <div class="elemento-lista-propuesta" id="">
                <div class="columa-izquierda-elemento-lista-propuesta">
                    <span class="elemento-lista-propuesta-id">ID: ${id}}</span>
                    <br>
                    <span class="elemento-lista-propuesta-nombre">${nombre} ${apellido}</span>
                    <span class="elemento-lista-propuesta-estado">Pendiente</span>
                </div>
                <div class="columa-derecha-elemento-lista-propuesta">
                    <img class="imagen" src="${fotoPerfil}" alt="Descripción de la imagen">
                </div>
            </div>
            `;
}

