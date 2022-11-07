import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroesFetching: state => {
			state.heroesLoadingStatus = 'loading'
		},
		heroesFetched: (state, action) => {
			state.heroes = action.payload;
			state.heroesLoadingStatus = 'idle';
		},
		heroesFetchingError: state => {
			state.heroesLoadingStatus = 'error';
		},
		addHero: (state, action) => {
			state.heroes.push(action.payload);
		},
		heroDeleted: (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload)
		}
	}
});

const {actions, reducer} = heroSlice;

export default reducer;
export const {
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
	addHero,
	heroDeleted,
} = actions;