import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'

function Card({id, name, imagen, hp, attack, speed, type}) {
  return (
  <div>
    <a>
      <Link to={`/pokemons/${id}`} >
      <div class="card">
        <div class="content">
          <div class="top">
            <p>{name}</p>
            <div class="color"></div>
          </div>
          <div class="middle">
            <div>
              <p>Type:</p> 
              <p>{type}</p>
            </div>
            <img src={imagen} />
          </div>
          <div class="bottom">
            <div>
              <p>HP</p>
              <p>{hp}</p>
            </div>
            <div>
              <p>ATK</p>
              <p>{attack}</p>
            </div>
            <div>
              <p>SPD</p>
              <p>{speed}</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </a>
  </div>

  )
}

export default Card