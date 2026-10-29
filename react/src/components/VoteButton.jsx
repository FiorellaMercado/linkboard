import React from 'react'

function VoteButton({votando, disabled,votado}) {

  return (
     <button onClick={votando} title="Votar" disabled={disabled} className={votado ? "liked" : "disliked"}>♡</button>
  )
}
export default VoteButton
