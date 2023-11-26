export async function postPropuesta(tutorId, acompananteId, tipoAT, descripcion){
    let config = {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tutorId": tutorId,
            "acompananteId": acompananteId,
            "infoAdicional": tipoAT,
            "monto": 0,
            "estadoPropuesta": 0,
            "descripcion": descripcion
        }),
    }
    try 
    { 
        const response = await fetch
        (
            `https://localhost:7231/api/Propuesta`, config
        );
        let result = await response.json();
        return result;
    }
    catch (error) 
    {
        console.log(error);
    }
};

export default{
    postPropuesta,
}