export default function mappingAt(fotoPerfil, nombre, apellido, domicilio ,escolar, domiciliario)
{
    return  `
            <div class="resultado">
                <img class="imagen" src="${fotoPerfil}" alt="Descripción de la imagen">
                <div class="nombre">
                    ${nombre} ${apellido}
                </div>
                <div class="descripcion">
                    <div class="perfil-AT-bloque-tags">
                        <span class="otro-elemento-en-linea">${domicilio}</span>
                        <span class="otro-elemento-en-linea">${escolar}</span>
                        <span class="otro-elemento-en-linea">${domiciliario}</span>
                    </div>
                </div>
            </div>
            `
}      