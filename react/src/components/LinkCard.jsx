import { useState } from "react"
function LinkCard({ link}){
    const [voto, setVoto]=useState(link.votes);
    return(
        <div>
            <p>{link.title}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url} </a>
            <p>Votos: {voto} </p>
            <button onClick={()=> setVoto(votoActual=>votoActual+1)}>Votar</button>
        </div>
    )

}

export default LinkCard