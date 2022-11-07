import {createReducer} from "@reduxjs/toolkit";

import {
	heroDeleted,
	addHero,
	fetchFilters,
	setFilter,
	loadFilters,
	fetchHeroes,
	heroesFetched,
	heroesFetchingError,
	heroesFetching
} from '../actions'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
	builder
		.addCase(heroesFetching, state => {
			state.heroesLoadingStatus = 'loading';
		})
		.addCase(heroesFetched, (state, action) => {
			state.heroes = action.payload;
			state.heroesLoadingStatus = 'idle';
		})
		.addCase(heroesFetchingError, state => {
			state.heroesLoadingStatus = 'error';
		})
		.addCase(addHero, (state, action) => {
			state.heroes.push(action.payload);
		})
		.addCase(heroDeleted, (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload)
		})
		.addDefaultCase(() => {});
})

// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		// case 'HEROES_FETCHING':
// 		// 	return {
// 		// 		...state,
// 		// 		heroesLoadingStatus: 'loading'
// 		// 	}
// 		// case 'HEROES_FETCHED':
// 		// 	return {
// 		// 		...state,
// 		// 		heroes: action.payload,
// 		// 		heroesLoadingStatus: 'idle'
// 		// 	}
// 		// case 'HEROES_FETCHING_ERROR':
// 		// 	return {
// 		// 		...state,
// 		// 		heroesLoadingStatus: 'error'
// 		// 	}
// 		case 'HERO_DELETED':
// 			return {
// 				...state,
// 				heroes: action.payload
// 			}
// 		case 'HERO_ADD':
// 			return {
// 				...state,
// 				heroes: action.payload
// 			}
// 		default:
// 			return state;
// 	}
// }
//
// export default reducer;

export default heroes;