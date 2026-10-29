import { useState } from "react"
import VoteButton from "./VoteButton"

function LinkCard({ link, onVote, votado,   onSelect}){
    const tags= link.tags
    const [disable, setDisable] = useState(false)

    async function votando(){
        setDisable(true)
        try{
            await onVote(link.id)
        }finally{
            setDisable(false)
        }
    }
    return(
        <div className="card"> 
            <p className="titulo">{link.title}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url} </a>        
            <div className="tagCard">
                {tags.map(tag=>{
                    return(
                        <span key={tag.id} className="tag">{tag.name}</span>
                    )
                })}
                
            </div>
            
            <div className="contenedorFlexVoto">
                <span>{link.votes} </span>
                <VoteButton votando={votando} disabled={disable} votado={votado}/>
                <button onClick={()=>onSelect(link.id)} aria-label="Ver detalle de este enlace" className="detalle">Ver Detalle</button>
            </div>
        </div>
    )

}

export default LinkCard