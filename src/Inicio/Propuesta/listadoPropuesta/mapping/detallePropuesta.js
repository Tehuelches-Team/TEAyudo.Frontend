export default async function detallePropuesta(id, descripcion, estado)
{
    let botones;
    if(estado == 0){
        botones = `<button type="button" class="btn btn-danger" id="botonRechazar">rechazar</button>
                   <button type="button" class="btn btn-primary" id="botonAbrirChat">Abrir chat</button>
                   <button type="button" class="btn btn-success" id="botonAceptar">Aceptar</button>`; 
    }
    else
    {
        botones = ``;
    }

    return  `
            <div class="visualizar-propuesta" id="${id}">
                <h2>Detalles de la propuesta:  ${id}</h2>
                <hr>
                <p>Descripcion: ${descripcion} </p>
                ${botones}
            </div>
            `
}


