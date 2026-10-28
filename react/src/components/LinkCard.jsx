import { useState } from "react"

function LinkCard({ link, onVote, votado}){
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
            <span>{link.votes} </span>
            <button onClick={votando} title="Votar" disabled={disable} className={votado ? "liked" : "disliked"}>♡</button>
        </div>
    )

}

export default LinkCard