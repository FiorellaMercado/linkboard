import React from 'react'
import CommentCard from './CommentCard'

function CommentList({comments}) {
    console.log(comments)

  return (

    <>
        <div className='lista'> 
        {comments.map(comment=>{
            return(
                <CommentCard key={comment.id} comment={comment}/>
            )
        })}
        </div>
        
    </>
    
  )
}

export default CommentList
