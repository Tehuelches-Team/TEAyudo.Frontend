export async function postUsuario(
                                  nombre, apellido, correo, fechaNacimiento,
                                  cuil, domicilio, fotoPerfil, contrasena,
                                  tipoUsuario
                                ) 
{
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cuil: cuil,
      nombre: nombre,
      apellido: apellido,
      correoElectronico: correo,
      contrasena: contrasena,
      fotoPerfil: fotoPerfil,
      domicilio: domicilio,
      fechaNacimiento: fechaNacimiento,
      tipoUsuario: tipoUsuario
    }),
  };
  try {
    const response = await fetch(`https://localhost:7174/api/Usuario`, config);
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function login(email, contrasena) {
  let config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://localhost:7174/api/Usuario/${email}/${contrasena}`, config
    );
    if (response.ok === false)
    {
      return 7;
    };
    let result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default { login, postUsuario };
