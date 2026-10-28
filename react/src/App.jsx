import { getLinks, voteLink } from './api';
import './App.css'
import LinkCard from './components/LinkCard'
import { useState, useEffect} from 'react'

function leerVotados(){
  try{
    const storage = localStorage.getItem('votados')
    const arrayVotados= JSON.parse(storage)
    const votadosSet = new Set(arrayVotados)
    return votadosSet
  }catch{
    return new Set() 
  }
}

function App() {

  const [links, setLinks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [errorVoto, setErrorVoto]= useState(null);
  const [votados, setVotados]=useState(leerVotados)


  
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

  function guardarVotos(nuevoVotados){
    try{
      localStorage.setItem('votados', JSON.stringify([...nuevoVotados]))
    }catch{

    }
  }
  async function manejarVoto(id){
    try{
      setErrorVoto(null)
      let valor
      if(votados.has(id)){
        valor=-1
      }else{
        valor=1
      }
      
      const linkActualizado=await voteLink(id, valor)
      setLinks(lista => lista.map(link=> link.id===id ? {...link,votes: linkActualizado.votes} : link))
      const nuevoVotados= new Set(votados)
      valor===1 ? nuevoVotados.add(id) : nuevoVotados.delete(id) 
      setVotados(nuevoVotados)
      guardarVotos(nuevoVotados)


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
            <LinkCard key={link.id} link={link} onVote={manejarVoto} votado={votados.has(link.id)}/>
          )
        })
      }
      
    </>
  )
}

export default App
