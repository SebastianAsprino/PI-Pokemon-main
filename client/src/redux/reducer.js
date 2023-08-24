

const initialState = {
  pokemons: [],
  detail:[],
  types:[]

};


export default function reducer(state = initialState, { type, payload }) {
  switch (type) {

    case 'GET_ALL_POKEMONS':
      return {
        ...state,
        pokemons: payload
      };
    

    case 'GET_POKEMON_DETAIL':
      return {
        ...state,
        detail: payload
      };    

    case 'GET_POKEMON_FILTER':
      return {
        ...state,
        pokemons: payload
      };    
    
    case 'GET_POKEMON_BY_NAME':
      console.log(payload)
      return {
        ...state,
        pokemons: payload, 
      }

    case 'GET_TYPES':
      return {
        ...state,
        types: payload
      };


    default:
      return state;
  }

}
