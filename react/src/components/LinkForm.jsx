import React, { useState } from 'react'

function LinkForm({onCreate, creando}) {
    function enviarForm(e){
        e.preventDefault();
        const titulo = e.target.titulo.value.trim();
        const url = e.target.url.value.trim();
        const descripcion = e.target.descripcion.value.trim();
        const tags = e.target.tag.value.trim();



        if (!titulo || !url ) return; 
        const datos={title: titulo, url:url}
        if(descripcion){
            datos['description']=descripcion
        }
        if(tags){
            const tagsArray= tags.split(",");
            const tagsTrim=tagsArray.map(tag=>tag.trim())
            const tagsLimpio= tagsTrim.filter(item=>Boolean(item))
            if (tagsLimpio.length>10) return;        
            if(tagsLimpio.length){
                datos['tags']=tagsLimpio
            }
        }


        onCreate(datos)
        e.target.reset()
    }
  return (
    <div className='lista'>
        
        <form onSubmit={(e)=>enviarForm(e)}  className="card" action="">
            <p className='titulo'>Crear nuevo enlace</p>
            <div>
                <label htmlFor="titulo"> Título: </label>
                <input id="titulo" required name='titulo' type="text"/>                
            </div>
            <div>
                <label htmlFor="url"> URL: </label>
                <input id="url" placeholder='https://ejemplo.com' required name='url' type="text"/>                
            </div>
            <div>
                <label htmlFor="tag"> Tags: </label>
                <input id="tag" placeholder='Separados por coma, máximo 10' name='tag' type="text"/>                
            </div>
            <div>
                <label htmlFor="descripcion">Descripción: </label>
                <input id="descripcion" name='descripcion' type="text" />
            </div>
            <button type="submit" disabled = {creando}>{creando ? "Creando..." : "Crear"}</button>
        </form>
    </div>
  )
}

export default LinkForm
