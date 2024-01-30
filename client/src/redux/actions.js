



export function getPokemons() {
  return async function (dispatch) {
    await fetch('https://cute-erin-barracuda-fez.cyclic.app/pokemons")
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_ALL_POKEMONS', payload: data }));
  };
}



export function getPokemonByName(payload) {
  return async function (dispatch) {
    await fetch(`https://cute-erin-barracuda-fez.cyclic.app/pokemons/name/${payload}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_BY_NAME', payload: data }));
};
} 

export function getDetail(id) {
  return async function (dispatch) {
    await fetch(`https://cute-erin-barracuda-fez.cyclic.app/pokemons/id/${id}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_DETAIL', payload: data }));
};
} 


export function getfilter(id) {
  return async function (dispatch) {
    await fetch(`https://cute-erin-barracuda-fez.cyclic.app/pokemons/filter/${id}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_FILTER', payload: data }));
};
} 

export function getTypes() {
  return async function (dispatch) {
    await fetch('https://cute-erin-barracuda-fez.cyclic.app/types')
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_TYPES', payload: data }));
};
} 



export function postpokemon(payload) {
  return function (dispatch) {
    try {
      fetch('https://cute-erin-barracuda-fez.cyclic.app/poke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          return dispatch({
            type: 'POST_POKEMON',
            payload: data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
