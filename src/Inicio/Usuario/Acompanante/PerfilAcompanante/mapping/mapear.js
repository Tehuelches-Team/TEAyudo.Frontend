export async function mapearContenedor1(objeto)
{
    return  `
            <h2 class="h2">Sobre ${objeto.nombre} ${objeto.apellido}</h2>
            <div class="renglon-especialidad">
                <span class="especialidad">Escolar</span>
                <span class="especialidad">Domiciliario</span>
            </div>
            <p>${objeto.experiencia}.</p>
            `
}


export async function mapearContenedor2(objeto)
{
    return  `
            <h3>Disponibilidad Horaria</h3>
            <div class="contenedor-horarios">
                <div class="tablaHorarios" id="tablaHorarios">
                    <div class="celda"></div>
                    <div class="celda">Lunes</div>
                    <div class="celda">Martes</div>
                    <div class="celda">Miércoles</div>
                    <div class="celda">Jueves</div>
                    <div class="celda">Viernes</div>
                    <div class="celda">Sábado</div>
                    <div class="celda" onclick="cambiarColor(this)">Mañana</div>
                    <div class="celda celda-clic celda-izquierda-sup" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)" ></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic celda-derecha-sup" onclick="cambiarColor(this)"></div>
                    <div class="celda" onclick="cambiarColor(this)">Tarde</div>
                    <div class="celda celda-clic celda-izquierda-inf" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic" onclick="cambiarColor(this)"></div>
                    <div class="celda celda-clic celda-derecha-inf" onclick="cambiarColor(this)"></div>
                </div>
            </div>
            `
}

export async function mapearContenedor3(objeto)
{
    return  `
            <div class="contenedor-izquierdo-obrasSociales">
                <h3>Obras sociales aceptadas</h3>
                <ul class="lista-obras-sociales">
                    <li>OSECAC</li>
                    <li>PAMI</li>
                    <li>OSUPLAD</li>
                </ul>
            </div>
            `
}

export async function mapearContenedor4(objeto)
{
    return  `
            <div class="contenedor-derecho-tarjeta">
                <img class="imagen" src="${objeto.fotoPerfil}" alt="Descripción de la imagen">
                <h3>${objeto.nombre} ${objeto.apellido}</h3>
                <h4>Acompañante Terapeutica</h4>
                <button type="button" class="btn btn-primary">Generar propuesta</button>
            </div>
            <img class="imagen-mapa" src="../../../img/mapa.png" />
            `
}

export default {
    mapearContenedor1,
    mapearContenedor2,
    mapearContenedor3,
    mapearContenedor4,
};