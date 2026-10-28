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
        <div>
            <p>{link.title}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url} </a>
            <p>Votos: {link.votes} </p>
            <div>
                {tags.map(tag=>{
                    return(
                        <span key={tag.id}>{tag.name}</span>
                    )
                })}
                
            </div>
            <button onClick={votando} disabled={disable} className={votado ? "liked" : "disliked"}>♡</button>
        </div>
    )

}

export default LinkCard