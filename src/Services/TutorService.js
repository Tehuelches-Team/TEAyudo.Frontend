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
            `https://localhost:7235/api/Acompanantes/Acompanante`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
}