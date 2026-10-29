
import LinkCard from './LinkCard'
import LinkForm from './LinkForm'
import TagFilter from './TagFilter'


function LinkList({links,onVote,votados,onSelect, onCreate, creando, errorCreando, onSelectTag, tagActivo}) {
  const lista=links.filter(link=>link.tags.length)
  const listaArray=lista.map(link=>link.tags)
  const listaObjetos= listaArray.flat()
  let listafiltrada=[]
  const listaNombres = listaObjetos.map(tag => tag.name)
  const listaTags=[...new Set(listaNombres)]
  if(tagActivo){
    listafiltrada=links.filter(link=> link.tags.some(tag=>tag.name===tagActivo))
  }
  
  console.log(listafiltrada)
  return (
    <>
      <h1>Enlaces</h1>
      <LinkForm onCreate={onCreate} creando={creando}/>
      {errorCreando ? errorCreando: null}
      <TagFilter listaTags={listaTags} onSelect={onSelectTag} tagActivo={tagActivo}/>
      <section className='lista'>
        { (tagActivo?listafiltrada:links).map(link=>{
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