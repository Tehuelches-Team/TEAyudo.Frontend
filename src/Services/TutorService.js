window.onload = async function ()  {
    const urlParams = new URLSearchParams(window.location.search);
    const dato = urlParams.get('tutorId');
    document.getElementById('ocultoPaciente').value = dato;
};




export default async function postTutor(usuarioId)
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