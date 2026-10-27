import { getLinks, voteLink } from "./api.js"
import {  renderLinks } from "./render.js"

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

let links= []
const lista = document.getElementById('lista')

let votados = new Set();
try{
    const respuesta= JSON.parse(localStorage.getItem('votados'))
    console.log(respuesta)
    if(respuesta){
        votados=new Set(respuesta)
    }
}catch(error){
    console.error(error)
}

function render(){
    renderLinks(lista, links,votados,manejarVoto)
}

async function manejarVoto(link, boton){
    try{
        const voto = votados.has(link.id) ? -1:1;
        console.log(voto)
        boton.disabled= true
        const linkActualizado = await voteLink(link.id,voto)
        const indice= links.findIndex(item => item.id === link.id)
        if(indice === -1){
            console.error('El enlace no esta en la lista')
        }else{
            links[indice]=linkActualizado
        }
        if(voto ===1){
            votados.add(link.id)
        }else if(voto === -1){
            votados.delete(link.id)
        }
        guardarVotados()
        render()

    }catch(error){
        console.error(error)
    }finally{
        boton.disabled= false
    }
    

}

function guardarVotados(){
    try{
        localStorage.setItem('votados', JSON.stringify([...votados]))
    }catch(error){
        console.error('No se pudo guardar los votos: ', error)
    }
}
async function main(){
    try{
        links = await getLinks()
        render()
        console.log(links)

    }catch(error){
        console.error(error)
    }
}

main()