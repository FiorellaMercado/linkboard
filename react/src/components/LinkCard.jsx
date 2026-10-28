
function LinkCard({ link, onVote}){
    return(
        <div>
            <p>{link.title}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url} </a>
            <p>Votos: {link.votes} </p>
            <button onClick={()=>onVote(link.id)}>Votar</button>
        </div>
    )

}

export default LinkCard