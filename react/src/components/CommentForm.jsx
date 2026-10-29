import React, { useState } from 'react'

function CommentForm({onSubmit, enviando}) {
    function enviarForm(e){
        e.preventDefault();
        const autor = e.target.autor.value.trim();
        const texto = e.target.texto.value.trim();

        console.log(autor)
        console.log(texto)
        if (!autor || !texto) return;  
        onSubmit({author: autor, text:texto})
        e.target.reset()
    }
  return (
    <div className='card'>
        <p className='titulo'>Deja tu comentario</p>
        <form onSubmit={(e)=>enviarForm(e)}  className="" action="">
            <div>
                <label htmlFor="autor">Nombre: </label>
                <input id="autor" required name='autor' type="text" />
            </div>
            <div>
                <label htmlFor="texto"> Comentario: </label>
                <input id="texto" required name='texto' type="text"/>                
            </div>
            <button type="submit" disabled = {enviando}>{enviando ? "Enviando..." : "Enviar"}</button>
        </form>
    </div>
  )
}

export default CommentForm
