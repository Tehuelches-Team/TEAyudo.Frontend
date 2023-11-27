export default async function tarjetaPropuesta(id, nombre, apellido, estadoPropuesta, fotoPerfil, descripcion)
{
    let estado;
    if (estadoPropuesta === 0) 
    {
        estado = "Pendiente"
    }
    else if (estadoPropuesta === 1)
    {
        estado = "aceptado";
    }
    else
    {
        estado = "Rechazado";
    }
    return  `
            <div class="elemento-lista-propuesta" id="${id}" data-info="${descripcion}">
                <div class="columa-izquierda-elemento-lista-propuesta">
                    <span class="elemento-lista-propuesta-id">ID: ${id}</span>
                    <br>
                    <span class="elemento-lista-propuesta-nombre">${nombre} ${apellido}</span>
                    <span class="elemento-lista-propuesta-estado">${estado}</span>
                </div>
                <div class="columa-derecha-elemento-lista-propuesta">
                    <img class="imagen" src="${fotoPerfil}" alt="Descripción de la imagen">
                </div>
            </div>
            `;
}

