import React from 'react'
import CommentCard from './CommentCard'

function CommentList({comments}) {
    console.log(comments)

  return (

    <>
        {comments.map(comment=>{
            return(
                <CommentCard key={comment.id} comment={comment}/>
            )
        })}
        
    </>
    
  )
}

export default CommentList
