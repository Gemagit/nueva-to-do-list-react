import React from 'react'

function TodoCard(props) {
  return (
    <article>
        <h3>{props.tarea}</h3>
        <br/>
        <button className="delete-button" onClick={()=>props.delete()}>X</button>
    </article>
  )
}

export default TodoCard;