export async function getAcompanante (acompananteId){
    const config = {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json'
        },
    };
    try 
    {
        const response = await fetch
        (
            `https://localhost:7235/api/Acompanantes/${acompananteId}`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
      console.log(error);
    }
}



export async function postAcompanante(usuarioId, zonaLaboral, contacto, disponibilidad, documentacion, experiencia)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "usuarioId": usuarioId,
            "zonaLaboral": zonaLaboral,
            "contacto": contacto,
            "disponibilidad": disponibilidad,
            "documentacion": documentacion,
            "experiencia": experiencia
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7235/api/Acompanantes/Acompanante`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
};



export async function postEspecialidad(acompananteId, especialidadId)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "acompananteId": acompananteId,
            "especialidadId": especialidadId
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7235/api/Acompanantes/Relacion/Acompanante/Especialidad`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
};

export async function postObraSocial(acompananteId, obraSocialId)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "acompananteId": acompananteId,
            "obraSocialId": obraSocialId
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7235/api/Acompanantes/Relacion/Acompanante/ObraSocial`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
};

export async function CargarAT(especialidad, disponibilidad, obrasocial, zonaLaboral){
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    ;
    try{
        const response = await fetch (`https://localhost:7235/api/Acompanantes/Filtros?Especialidad=${especialidad}&Disponibilidad=${disponibilidad}&ObraSocial=${obrasocial}&ZonaLaboral=${zonaLaboral}`, config);
        return response;
    }catch(error){
        console.log(error);
    }
};

export async function getIdAcompanante(id){
    const config = {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json'
        },
    };
    try 
    {
        const response = await fetch
        (
            `https://localhost:7235/api/Acompanantes/Id/${id}`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
      console.log(error);
    }
}

export default {
    getAcompanante,
    postAcompanante,
    postEspecialidad,
    postObraSocial,
    CargarAT,
    getIdAcompanante,
};