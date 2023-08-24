import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../Card/Card.module.css'

function Card({id, name, imagen,type}) {
  return (
    <div className={styles.individual_card}>        
            <h5 className={styles.name} >{name}</h5>                
            <img className={styles.img} src={imagen}/>
            <h5 className={styles.type}>{type}</h5>     
            <Link to={`/pokemons/${id}`} className={styles.detail}>
                DETAILS
            </Link>
    </div>
  )
}

export default Card