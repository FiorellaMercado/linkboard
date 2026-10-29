import React from 'react'

function TagFilter({listaTags, tagActivo, onSelect}) {
    console.log(tagActivo)
  return (
    <>
        <div className='tagCard'>
            {listaTags.map(tag=>{
                return(
                    <button  onClick={()=>onSelect(tag.name)}  key={tag.id} className={tagActivo===tag.name?'tagSelect':'tag'}>
                        {tag.name}
                    </button>
                )
            })}
            <button onClick={()=>onSelect('Todos')} className={tagActivo==='Todos'?'tagSelect':'tag'}>Todos</button>
        </div>
    </>

  )
}
export default TagFilter