import { GET_PAGINATION_DATA } from "../actions/index";

export default (state = "", action) => {
  switch (action.type) {
    case GET_PAGINATION_DATA:
      return action.payload;

    default:
      return state;
  }
};