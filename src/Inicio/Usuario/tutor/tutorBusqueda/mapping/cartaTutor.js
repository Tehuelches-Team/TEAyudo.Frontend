export function mappingAt(fotoPerfil, nombre, apellido, domicilio, especialidad1, especialidad2, experiencia)
{
    return  `
            <div class="resultado">
                <img class="imagen" src="${fotoPerfil}" alt="Descripción de la imagen">
                <div class="nombre">
                    ${nombre} ${apellido}
                </div>
                <div class="descripcion">
                    <div class="perfil-AT-bloque-tags">
                    <br><span class="otro-elemento-en-linea">${domicilio}</span>
                    <br><span class="otro-elemento-en-linea">${especialidad1}</span>
                    <br><span class="otro-elemento-en-linea">${especialidad2}</span>
                    </div>
                    <p class="descripcion">${experiencia}</p>
                </div>
            </div>
            `
}

export function mappingResult(cant){
    return `<h3>${cant} acompañantes terapéuticos disponibles</h3>`
}

export default{
    mappingAt,
    mappingResult
}