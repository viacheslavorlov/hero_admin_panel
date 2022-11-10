import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


// const initialState = {
// 	filters: [],
// 	activeFilter: 'all',
// 	filterLoadingStatus: ''
// }

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
	activeFilter: 'all',
	filterLoadingStatus: ''
})

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	async () => {
		const {request} = useHttp();
		return await request('http://localhost:3001/filters');
	}
)

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.activeFilter = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilters.pending, state => {
				state.filterLoadingStatus = 'loading';
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				filterAdapter.setAll(state, action.payload);
				state.filterLoadingStatus = 'idle';
			})
			.addCase(fetchFilters.rejected, state => {
				state.filterLoadingStatus = 'error'
			})
			.addDefaultCase(() => {});
	}
});

const {actions, reducer} = filterSlice;

export const {selectAll} = filterAdapter.getSelectors(state => state.filters);

// export const allFilters = createSelector(
// 	selectAll,
// 	(filters) => {
// 		console.log(filters)
// 		return filters;
// 	}
// )

export default reducer;

export const {setFilter} = actions;