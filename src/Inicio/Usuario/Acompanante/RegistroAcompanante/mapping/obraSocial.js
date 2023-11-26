export default async function mappingObraSocial (nombre, value)
{
    return  `
            <div class="obraSocial" id="${nombre}" data-info="${value}" >
                <span>${nombre}</span>
            </div>
            `
};