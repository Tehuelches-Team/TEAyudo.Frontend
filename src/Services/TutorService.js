export async function postTutor(usuarioId)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "usuarioId": usuarioId,
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7044/api/Tutor`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
}


export async function postPaciente(tutorId, nombre, apellido, fechaNacimiento, diagnosticoTEA, sexo, certUniDisc)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tutorId": tutorId,
            "nombre": nombre,
            "apellido": apellido,
            "fechaNacimiento": fechaNacimiento,
            "diagnosticoTEA": diagnosticoTEA,
            "sexo": sexo,
            "certUniDisc": certUniDisc 
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7044/api/pacientes`, config
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
    postTutor,
    postPaciente
};