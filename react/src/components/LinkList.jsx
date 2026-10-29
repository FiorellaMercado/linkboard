
import LinkCard from './LinkCard'
import LinkForm from './LinkForm'


function LinkList({links,onVote,votados,onSelect, onCreate, creando, errorCreando}) {
  return (
    <>
      <h1>Enlaces</h1>
      <LinkForm onCreate={onCreate} creando={creando}/>
      {errorCreando ? errorCreando: null}
      <section className='lista'>
        { links.map(link=>{
            return(
                <LinkCard key={link.id} link={link} onVote={onVote} votado={votados.has(link.id)} onSelect={onSelect}/>
            )
            })
        }
      </section>
    </>
  )
}


export default LinkList