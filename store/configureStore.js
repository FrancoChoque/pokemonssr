import { createStore, combineReducers } from "redux";
import pokemonReducer from "./reducers/pokemons";

const rootReducer = combineReducers({
	pokemons: pokemonReducer,
});

export const initializeStore = (initialState) => {
	return createStore(rootReducer, initialState);
};

export default initializeStore;