import React from 'react'
import { formatearFecha } from '../utils'

function CommentCard({comment}) {
  return (
    <div className='card'>
        <p>{comment.author}</p>
        <p className='fecha'>{formatearFecha(comment.createdAt)} </p> 
        <p>{comment.text}</p>
    </div>
  )
}
export default CommentCard