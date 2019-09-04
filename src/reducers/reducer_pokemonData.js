import { DELETE_POKEMON, GET_POKEMON_DATA } from "../actions/index";

export default (state = "", action) => {
  switch (action.type) {
    case GET_POKEMON_DATA:
      return action.payload;

    case DELETE_POKEMON:
      return state.filter(pokemon => pokemon._id !== action.id);

    default:
      return state;
  }
};
