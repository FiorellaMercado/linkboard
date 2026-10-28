
function LinkCard({ link, onVote}){
    const tags= link.tags
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
            <button onClick={()=>onVote(link.id)}>Votar</button>
        </div>
    )

}

export default LinkCard