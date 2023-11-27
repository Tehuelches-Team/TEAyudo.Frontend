export default async function detallePropuesta(id, descripcion)
{
    return  `
            <div class="visualizar-propuesta" id="${id}">
                <h2>Detalles de la propuesta:  ${id}</h2>
                <hr>
                <p>Descripcion: ${descripcion} </p>
                <button type="button" class="btn btn-danger" id="botonRechazar">Danger</button>
                <button type="button" class="btn btn-primary" id="botonAbrirChat">Abrir chat</button>
                <button type="button" class="btn btn-success" id="botonAceptar">Aceptar</button>
            </div>
            `
}


