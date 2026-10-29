import { useEffect } from "react";
import { useState } from "react"
import { addComment, getDetails } from "../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { formatearFecha } from "../utils";

function LinkDetail({link, onVote,votado,onBack}) {
    const [comentarios, setComentarios]=useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [errorComentar, setErrorComentar] = useState(null);
    const [disable, setDisable] = useState(false);
    const tags=link.tags


    async function votando(){
        setDisable(true)
        try{
            await onVote(link.id)
        }finally{
            setDisable(false)
        }
    }
    async function manejarComentario(datos) {

        try{
            setErrorComentar(null)
            setEnviando(true)
            const comentarioNuevo= await addComment(link.id,datos)
            const comentariosActualizado = [...comentarios, comentarioNuevo];
            setComentarios(comentariosActualizado)
            // es mejor usar setComentarios(prev => [...prev, nuevo]), pero el boton deshabilitado impide que la otra forma cause error
            // lo que pasa es que comentarios es el estado anterior cuando se renderizo, cambiara ese estado por otro lado
            //la copia estaria desactualizada
        }catch(e){
            setErrorComentar(e.message)
        }finally{
            setEnviando(false)
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

    <>
        <h1>Detalle</h1>
        <section className="lista">
            <div className="card">
            <p className="titulo" >{link.title}</p>
            <p className="fecha">{formatearFecha(link.createdAt)}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            <div className="tagCard">
                {tags.map(tag=>{
                    return(
                        <span key={tag.id} className="tag">{tag.name}</span>
                    )
                })}
                
            </div>
            <p>{link.description}</p>
            <span>{link.votes} </span>
            <button onClick={votando} title="Votar" disabled={disable} className={votado.has(link.id) ? "liked" : "disliked"}>♡</button>
        </div>
        </section>
        
        <h2>{comentarios.length? "Comentarios":null}</h2>
        <CommentList comments={comentarios}/>

        <CommentForm onSubmit={manejarComentario} enviando={enviando}/>
        {errorComentar ? errorComentar: null}

        <button onClick={onBack}>Volver</button>
    </>



  )
}

export default LinkDetail
