import './App.css'
import LinkCard from './components/LinkCard'

function App() {
  const links=[
                {id:1,title:"Fotosintesis", url:"https://fotosintesis.com", votes:3},
                {id:2,title:"Osos", url:"https://osos.com", votes:2},
                {id:3, title:"Suma", url:"https://suma.com", votes:1}
              ]
  return (
    <>
      
      <h1>Lista</h1>

      { links.map(link=>{
          return(
            <LinkCard key={link.id} link={link} />
          )
        })
      }
      
          
    </>
  )
}

export default App
