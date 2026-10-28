import React from 'react'

function CommentForm() {
  return (
    <div className='lista'>
        <p></p>
        <form className="" action="">
            <div>
                <label htmlFor="autor">Nombre: </label>
                <input id="autor" type="text" />
            </div>
            <div>
                <label htmlFor="texto"> Comentario: </label>
                <input id="texto" type="text" />                
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default CommentForm
