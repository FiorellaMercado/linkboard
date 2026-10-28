import './App.css'
import LinkCard from './components/LinkCard'
import { useState } from 'react'


function App() {
  const [links, setLinks] =useState([
                {id:1,title:"Fotosintesis", url:"https://fotosintesis.com", votes:3},
                {id:2,title:"Osos", url:"https://osos.com", votes:2},
                {id:3, title:"Suma", url:"https://suma.com", votes:1}
              ]);
  function manejarVoto(id){
    setLinks(lista => lista.map(link=> link.id===id ? {...link,votes: link.votes +1} : link))
  }
  return (
    <>
      
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
