import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [pokemon, setPokemon] = useState('');

    function handleSubmit (event){
        event.preventDefault();
        if (pokemon.length > 0){dispatch(getPokemonByName(pokemon))
        setPokemon('');
        event.target.reset();}
        else{
            alert('not valide', window.location.reload())
            
        }
    }

    function handleSearch(event){
        event.preventDefault();
        setPokemon(event.target.value)
    }

  return (
    <div>
        <form onSubmit={(event)=>handleSubmit(event)} >
          <input  type="text" placeholder='Buscar pokemon' onChange={(event)=> handleSearch(event)}/>
          <button type='submit'>SEARCH</button>
        </form>
    </div>
  )
}