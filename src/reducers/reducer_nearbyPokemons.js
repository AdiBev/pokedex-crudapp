import { GET_NEARBY_POKEMONS, RESET_REQUEST_STATUS } from "../actions";

export default (state = "", action) => {
  switch (action.type) {
    case GET_NEARBY_POKEMONS:
      return action.payload;

    case RESET_REQUEST_STATUS:
      return action.payload;

    default:
      return state;
  }
};
