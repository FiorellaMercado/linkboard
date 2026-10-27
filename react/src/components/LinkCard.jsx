function LinkCard({ link}){
    return(
        <div>
            <p>{link.title}</p>
            <p>{link.url}</p>
            <p>Votos: {link.votes} </p>
            <p> - </p>
        </div>
    )

}

export default LinkCard