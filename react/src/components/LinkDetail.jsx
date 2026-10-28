import { useEffect } from "react";
import { useState } from "react"
import { addComment, getDetails } from "../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function LinkDetail({link, onVote,votado}) {
    const [comentarios, setComentarios]=useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [errorComentar, setErrorComentar] = useState(null);
    const [disable, setDisable] = useState(false)


    async function votando(){
        setDisable(true)
        try{
            await onVote(link.id)
        }finally{
            setDisable(false)
        }
    }
    async function manejarComentario(e) {
        e.preventDefault();

        const autor = e.target.autor.value;
        const texto = e.target.texto.value;

        console.log(autor)
        console.log(texto)

        try{
            setErrorComentar(null)
            setEnviando(true)
            const comentarioNuevo= await addComment(link.id,{author: autor, text:texto})
            const comentariosActualizado = [...comentarios, comentarioNuevo];
            setComentarios(comentariosActualizado)
            e.target.reset()
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
                console.log(datos)
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
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            <p></p>
            <span>{link.votes} </span>
            <button onClick={votando} title="Votar" disabled={disable} className={votado.has(link.id) ? "liked" : "disliked"}>♡</button>
        </div>
        </section>
        
        <h2>{comentarios.length? "Comentarios":null}</h2>
        <CommentList comments={comentarios}/>

        <CommentForm onSubmit={manejarComentario} enviando={enviando}/>
        {errorComentar ? errorComentar: null}
    </>



  )
}

export default LinkDetail
