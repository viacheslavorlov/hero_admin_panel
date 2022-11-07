import {createReducer} from "@reduxjs/toolkit";
import {loadFilters, setFilter} from "../actions";

const initialState = {
	filters: [],
	activeFilter: 'all',
}
// const filters = createReducer(initialState, builder => {
// 	builder
// 		.addCase(setFilter, (state, action) => {
// 			state.filters.activeFilter = action.payload;
// 		})
// 		.addCase(loadFilters, (state, action) => {
// 				state.filters.filters = action.payload;
// 		})
// 		.addDefaultCase(() =>{})
// })
const filters = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_FILTERS':
			return {
				...state,
				filters: action.payload
			}
		case 'FILTER_HEROES':
			return {
				...state,
				activeFilter: action.payload
			}
		case 'FILTERED_LIST_OF_HEROES':
			console.log('filter')
			return {
				...state,
				filteredListOfHeroes: action.payload
			}
		case 'SET_FILTER':
			return {
				...state,
				activeFilter: action.payload
			}
		default: return state;
	}
}

export default filters;