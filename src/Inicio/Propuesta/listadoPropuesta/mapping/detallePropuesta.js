export default async function detallePropuesta(objeto)
{
    return  `
            <div class="visualizar-propuesta">
                <h2>Detalles de la propuesta:  {id}</h2>
                <hr>
                <p>Descripcion: Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
                <h2>Tutor</h2>
                <hr>
                <ul class="ul-lista-datos-usuario">
                    <li>Nombre: </li>
                    <li>CUIL: </li>
                    <li>Domicilio: </li>
                    <li>Email: </li>
                </ul>
                <h2>Paciente</h2>
                <hr>
                <ul class="ul-lista-datos-usuario">
                    <li>Nombre: </li>
                    <li>Nacimiento: </li>
                    <li>Sexo: </li>
                    <li>CUD: </li>
                </ul>
                <h2>Acompañante terapeutico</h2>
                <hr>
                <ul class="ul-lista-datos-usuario">
                    <li>Nombre: </li>
                    <li>Obras Sociales: </li>
                    <li>Localizacion Lab.: </li>
                    <li>Telefono: </li>
                    <li>Email: </li>
                    <li>Modalidad: </li>
                </ul>
                <div class="bloque-responder-propuesta">
                    <a href="#" class="boton-basico boton-aceptar">Aceptar</a>
                    <a href="#" class="boton-basico boton-rechazar">Rechazar</a>
                </div>
            </div>
            `
}
