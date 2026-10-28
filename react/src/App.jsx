import { getLinks, voteLink } from './api';
import './App.css'
import LinkCard from './components/LinkCard'
import { useState, useEffect} from 'react'



function App() {

  const [links, setLinks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [errorVoto, setErrorVoto]= useState(null);

  
  useEffect(()=>{
    async function cargar() {
      try{
        const datos = await getLinks()
        setLinks(datos)
      } catch (e){
        setError(e.message)
      }finally{
        setCargando(false)
      }
    }
    cargar();

  },[])

  async function manejarVoto(id){
    try{
      const linkActualizado=await voteLink(id, 1)
      setLinks(lista => lista.map(link=> link.id===id ? {...link,votes: linkActualizado.votes} : link))

    }catch(e){
      setErrorVoto(e.message)
    }
  }

  if (cargando){
    return <p>Cargando...</p>
  }
  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <>
      
      {errorVoto ?<p>Error {errorVoto}</p> : null}

      <h1>Lista</h1>

      { links.map(link=>{
          return(
            <LinkCard key={link.id} link={link} onVote={manejarVoto}/>
          )
        })
      }
      
    </>
  )
}

export default App
