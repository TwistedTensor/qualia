import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import graph from './modules/graph';

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const reducer = combineReducers({
  graph
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
//const configureStore = (initialState) => createStore(reducer, initialState);
export default configureStore;

