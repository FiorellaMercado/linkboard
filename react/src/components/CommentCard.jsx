import React from 'react'

function CommentCard({comment}) {
  return (
    <div>
        <p>{comment.author}</p>
        <p>{comment.createdAt} </p>
        <p>{comment.text}</p>
    </div>
  )
}
export default CommentCard