import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

// const initialState = {
// 	heroes: [],
// 	heroesLoadingStatus: 'idle',
// }
const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle'
});


export const fetchHeroes = createAsyncThunk(
	'heroes/heroesFetched',
	async () => {
		const {request} = useHttp();
		return await request('http://localhost:3001/heroes')
	}
)

const heroSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		addHero: (state, action) => {
			heroesAdapter.addOne(state, action.payload);
		},
		heroDeleted: (state, action) => {
			heroesAdapter.removeOne(state, action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = 'loading';
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				heroesAdapter.setAll(state, action.payload);
				state.heroesLoadingStatus = 'idle';
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	}
});

const {actions, reducer} = heroSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
	(state) => state.filters.activeFilter,
	selectAll,
	(activeFilter, heroes) => {
		const filteredList = heroes.filter(item => item.element === activeFilter)

		if (activeFilter === 'all') {
			return heroes;
		} else {
			return filteredList;
		}
	}
);


export const {
	addHero,
	heroDeleted
} = actions;