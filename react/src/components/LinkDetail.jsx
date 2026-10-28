import { useEffect } from "react";
import { useState } from "react"
import { getDetails } from "../api";

function LinkDetail({link, onVote,votado}) {
    const [comentarios, setComentarios]=useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(false)

    async function votando(){
        setDisable(true)
        try{
            await onVote(link.id)
        }finally{
            setDisable(false)
        }
    }

    useEffect(()=>{
        async function cargarDetalle() {
            try{
                const datos= await getDetails(link.id)
                setComentarios([...datos.comments])
            }catch(e){
                setError(e.message)
            }finally{
                setCargando(false)
            }
        }
        cargarDetalle();
    },[link.id]);

    if (cargando){
        return <p>Cargando...</p>
    }
    if(error){
        return <p>Error: {error}</p>
    }
  return (

    <div className="card">
        <p className="titulo" >{link.title}</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
        <span>{link.votes} </span>
        <button onClick={votando} title="Votar" disabled={disable} className={votado.has(link.id) ? "liked" : "disliked"}>♡</button>
    </div>
  )
}

export default LinkDetail
