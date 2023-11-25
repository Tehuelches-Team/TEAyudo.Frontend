export default async function postUsuario(nombre, apellido, correo, fechaNacimiento, cuil, telefono, tipoUsuario)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": nombre,
            "apellido": apellido,
            "correo": correo,
            "fechaNacimiento": fechaNacimiento,
            "cuil": cuil,
            "telefono": telefono,
            "tipoUsuario": tipoUsuario
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7174/api/Usuario`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
}