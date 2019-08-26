import { POST_FAILURE, POST_SUCCESS } from "../actions";

export default (state = "", action) => {
  switch (action.type) {
    case POST_SUCCESS:
      return action.payload;
    case POST_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
