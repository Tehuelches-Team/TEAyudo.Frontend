export default async function detallePropuesta(id, descripcion)
{
    return  `
            <div class="visualizar-propuesta">
                <h2>Detalles de la propuesta:  ${id}</h2>
                <hr>
                <p>Descripcion: ${descripcion} </p>
            </div>
            `
}
