
import LinkCard from './LinkCard'


function LinkList({links,onVote,votados,onSelect}) {
  return (
    <>
      <h1>Enlaces</h1>
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