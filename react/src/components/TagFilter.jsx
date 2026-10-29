import React from 'react'

function TagFilter({listaTags, tagActivo, onSelect}) {
    
  return (
    <>
        <div className='tagCard'>
            {listaTags.map(tag=>{
                return(
                    <button  onClick={()=>onSelect(tag)}  key={tag} className={tagActivo===tag?'tagSelect':'tag'}>
                        {tag}
                    </button>
                )
            })}
            <button onClick={()=>onSelect(null)} className={!tagActivo?'tagSelect':'tag'}>Todos</button>
        </div>
    </>

  )
}
export default TagFilter