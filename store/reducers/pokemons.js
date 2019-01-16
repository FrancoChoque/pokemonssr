import { ADD_POKEMON, REMOVE_POKEMON } from '../actions/actionTypes';

const initialState = {
  pokemons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POKEMON: {
      const pokemons = [...state.pokemons];
      pokemons.push(action.pokemon);
      return {
        ...state,
        pokemons,
      };
    }
    case REMOVE_POKEMON: {
      const pokemons = [...state.pokemons];
      pokemons.splice(pokemons.indexOf(action.pokemon), 1);
      return {
        ...state,
        pokemons,
      };
    }
    default:
      return state;
  }
};

export default reducer;
