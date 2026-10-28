const API_URL= "http://localhost:3000/api"

const apiGET= async(ruta)=>{
    const respuesta = await fetch(`${API_URL}/${ruta}`)
    if(!respuesta.ok){
        throw new Error('La API respondio con error '+respuesta.status)
    }
    const datos= await respuesta.json()
    return datos
}

async function apiRequest(ruta, metodo, datos){
    const respuesta = await fetch(`${API_URL}/${ruta}`, {
        method:metodo,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    })
    if(!respuesta.ok){
        throw new Error('La API respondio con error '+respuesta.status)
    }
    const contenido = await respuesta.json()
    return contenido
}



export async function getLinks(){
    const links = await apiGET('enlaces')
    return links

}


export async function voteLink(id, vote){

    const voto = await apiRequest(`enlaces/${id}/voto`, 'PATCH', {vote:vote})
    return voto

}

export async function getDetails(id) {
    const detalle = await apiGET(`enlaces/${id}/detalle`)
    return detalle
}

export async function addComment(id, datos) {
    const comentario = await apiRequest(`enlaces/${id}/comentarios`, 'POST', datos)
    return comentario
}