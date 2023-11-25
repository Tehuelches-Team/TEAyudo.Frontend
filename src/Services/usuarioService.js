export default async function postUsuario(nombre, apellido, correo, fechaNacimiento, cuil, domicilio, fotoPerfil, contrasena)
{
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "cuil": cuil,
            "nombre": nombre,
            "apellido": apellido,
            "correoElectronico": correo,
            "contrasena": contrasena,
            "fotoPerfil": fotoPerfil,
            "domicilio": domicilio,
            "fechaNacimiento": fechaNacimiento,
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