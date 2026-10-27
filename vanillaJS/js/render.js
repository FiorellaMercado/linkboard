function crearElemento(etiqueta, contenido){
    const elemento = document.createElement(etiqueta);
    elemento.textContent = contenido
    return elemento
}
function dibujarElemento(id, contenido){
    const elemento= document.getElementById(id);
    elemento.textContent = contenido
    return elemento
}
function crearEtiquetas(etiquetaContenedor, etiquetaHija, lista){
    const contenedor = document.createElement(etiquetaContenedor)
    for (const item of lista){
        const hijo = document.createElement(etiquetaHija)
        hijo.textContent = item.name

        contenedor.appendChild(hijo)
    }
    return contenedor
}

function limpiarLista(contenedor) {
    contenedor.replaceChildren();
}

export function renderLinks(contenedor, links, votados, onVote){

    limpiarLista(contenedor)

    for(const link of links){

        const tarjeta = document.createElement('div')
        const titulo = crearElemento('p', link.title)
        const url = crearElemento('a',link.url)
        url.href=link.url
        url.target='_blank'
        url.rel="noopener noreferrer"
        const etiquetas = crearEtiquetas('div','span', link.tags)
        const votos = crearElemento('span', link.votes)
        const votar = crearElemento('button','♡')
        votar.type = 'button'
        votar.classList.add('button')
        
        votar.setAttribute('aria-label', "Votar por este enlace")
        votar.setAttribute('aria-pressed','false')
        votar.addEventListener('click', () => onVote(link, votar))
        if(votados.has(link.id)){
            votar.classList.add('liked')
            votar.setAttribute('aria-pressed', 'true')
        }
        

        tarjeta.appendChild(titulo)
        tarjeta.appendChild(url)
        tarjeta.appendChild(etiquetas)
        tarjeta.appendChild(votos)
        tarjeta.appendChild(votar)
        
        contenedor.appendChild(tarjeta)
    }
    

    
}