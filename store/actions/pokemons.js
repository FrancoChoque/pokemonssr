import { ADD_POKEMON, REMOVE_POKEMON } from './actionTypes';

export const addPokemon = pokemon => ({
  type: ADD_POKEMON,
  pokemon,
});

export const removePokemon = pokemon => ({
  type: REMOVE_POKEMON,
  pokemon,
});
