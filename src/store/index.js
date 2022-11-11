import {configureStore} from "@reduxjs/toolkit";
import heroes from '../components/heroesList/heroSlice';
import filters from "../components/heroesFilters/filterSlice";
import {apiSlice} from "../api/apiSlice";

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

// combineReducers({filters, heroes}),
// compose(applyMiddleware(ReduxThunk, stringMiddleware), (window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()))


// * Использовать RTK - стандарт разработки
const store = configureStore({
	reducer: {heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware)
});

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()