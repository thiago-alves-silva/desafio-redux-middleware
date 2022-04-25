import token from "./token.js";
import user from "./user.js";

// MIDDLEWARES
import thunk from "./middlewares/thunk.js";
import setLocalStorage from "./middlewares/setLocalStorage.js";
import logger from "./middlewares/logger.js";

const reducer = Redux.combineReducers({ token, user });
const middlewares = Redux.applyMiddleware(thunk, setLocalStorage, logger);
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const enhancer = compose(middlewares);
const store = Redux.createStore(reducer, enhancer);

export default store;
