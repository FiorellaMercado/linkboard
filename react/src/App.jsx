import { addLink, getLinks, voteLink } from './api';
import './App.css'
import { useState, useEffect} from 'react'
import LinkList from './components/LinkList';
import LinkDetail from './components/LinkDetail';

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
  const [selected, setSelected] = useState(null)  //guarda el id
  const [cargandoNuevo, setCargandoNuevo]=useState(false)
  const [errorNuevo,setErrorNuevo]=useState(null)
  const [tagActivo, setTagActivo]=useState(null)
  console.log(selected)

  
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

  function seleccionarDetalle(id){
    setSelected(id)
  }

  function volver(){
    setSelected(null)
  }

  function seleccionarTag(tag){
    console.log(tag)
    setTagActivo(tag)
  }

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

    async function manejarLink(datos){
      console.log(datos)
      try{
        setErrorNuevo(null)
        setCargandoNuevo(true)
        const nuevoLink= await addLink(datos)
        setLinks(links=>[...links,nuevoLink])
      }catch(e){
        setErrorNuevo(e.message)
      }finally{
        setCargandoNuevo(false)
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

      {
        selected ? 
        <LinkDetail link={links.find(link=>link.id===selected)} 
          onVote={manejarVoto} votado={votados} onBack={volver}/> : 
        <LinkList links={links} onVote={manejarVoto} votados={votados} 
         onSelect={seleccionarDetalle} onCreate={manejarLink} 
         creando={cargandoNuevo} errorCreando={errorNuevo}
         onSelectTag={seleccionarTag} tagActivo={tagActivo}/>
      }   
      
    </>
  )
}

export default App
