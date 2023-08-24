



export function getPokemons() {
  return async function (dispatch) {
    await fetch("http://localhost:3001/pokemons")
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_ALL_POKEMONS', payload: data }));
  };
}



export function getPokemonByName(payload) {
  return async function (dispatch) {
    await fetch(`http://localhost:3001/pokemons/name/${payload}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_BY_NAME', payload: data }));
};
} 

export function getDetail(id) {
  return async function (dispatch) {
    await fetch(`http://localhost:3001/pokemons/id/${id}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_DETAIL', payload: data }));
};
} 


export function getfilter(id) {
  return async function (dispatch) {
    await fetch(`http://localhost:3001/pokemons/filter/${id}`)
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_POKEMON_FILTER', payload: data }));
};
} 

export function getTypes() {
  return async function (dispatch) {
    await fetch('http://localhost:3001/types')
      .then((data) => data.json())
      .then((data) => dispatch({ type: 'GET_TYPES', payload: data }));
};
} 



export function postpokemon(payload) {
  return function (dispatch) {
    try {
      fetch('http://localhost:3001/poke', {
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
// export function postPoke(payload) {
//   return async function () {
//     const create = await axios.post("http://localhost:3001/pokemon", payload);
//     return create;
//   };
// }



// import {
//   GET_ALL_COUNTRIES,
//   GET_ACTIVITIES,
//   GET_COUNTRY_BY_NAME,
//   GET_COUNTRY_DETAIL,
//   POST_ACTIVITY
// } from './actionTypes';

// export function getCountries() {
//   return async function (dispatch) {
//     await fetch("http://localhost:3001/countries")
//       .then((data) => data.json())
//       .then((data) => dispatch({ type: GET_ALL_COUNTRIES, payload: data }));
//   };
// }

// export function getDetail(id) {
//   return async function (dispatch) {
//     await fetch(`http://localhost:3001/countries/id/${id}`)
//       .then((data) => data.json())
//       .then((data) => dispatch({ type: GET_COUNTRY_DETAIL, payload: data }));
// };
// } 

// export function getActivities() {
//   return async function (dispatch) {
//     await fetch('http://localhost:3001/activities')
//       .then((data) => data.json())
//       .then((data) => dispatch({ type: GET_ACTIVITIES, payload: data }));
// };
// } 

// export function getCountriesByName(payload) {
//   return async function (dispatch) {
//     await fetch(`http://localhost:3001/countries/name/${payload}`)
//       .then((data) => data.json())
//       .then((data) => dispatch({ type: GET_COUNTRY_BY_NAME, payload: data }));
// };
// } 

// export function postActivity(payload) {
//   return function (dispatch) {
//     try {
//       fetch('http://localhost:3001/activity', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           return dispatch({
//             type: POST_ACTIVITY,
//             payload: data,
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }