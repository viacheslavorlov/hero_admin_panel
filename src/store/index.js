import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/hero';
import filters from "../reducers/filters";

//* улучшение функции dispatch
const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
	    return next({
		    type: action
	    });
    }
	return next(action);
}

//* улучшение store (функция может принимать строку вместо объекта)
// const enhancer = (createStore) => (...args) => {
// 	const store = createStore(...args);
// 	const oldDispatch = store.dispatch;
// 	store.dispatch = (action) => {
// 		if (typeof action === 'string') {
// 			return oldDispatch({
// 				type: action
// 			})
// 		}
// 		return oldDispatch(action);
// 	}
// 	return store;
// }


const store = createStore(
	combineReducers({filters, heroes}),
	compose(applyMiddleware(ReduxThunk, stringMiddleware), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
);

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()