import React from 'react'
import {Link} from 'react-router-dom'
// import styles from '../Card/Card.module.css'

function Card({id, name, imagen,type}) {
  return (
    <div >        
            <h5  >{name}</h5>                
            <img  src={imagen}/>
            <h5 >{type}</h5>     
            <Link to={`/pokemons/${id}`} >
                DETAILS
            </Link>
    </div>
  )
}

export default Card