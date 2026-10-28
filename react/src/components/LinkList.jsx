
import LinkCard from './LinkCard'


function LinkList({links,onVote,votados,onSelect}) {
  return (
    <section className='lista'>
    { links.map(link=>{
        return(
            <LinkCard key={link.id} link={link} onVote={onVote} votado={votados.has(link.id)} onSelect={onSelect}/>
        )
        })
    }
    </section>
  )
}


export default LinkList