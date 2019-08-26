import { createStore, applyMiddleware, compose } from "redux";

//to handle async with redux
import ReduxThunk from "redux-thunk";

//importing root reducer
import rootReducer from "./reducers";

//accessing redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
