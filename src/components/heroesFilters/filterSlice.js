import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const initialState = {
	filters: [],
	activeFilter: 'all',
	filterLoadingStatus: ''
}

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
				state.filters = action.payload;
			})
			.addCase(fetchFilters.rejected, state => {
				state.filterLoadingStatus = 'error'
			})
			.addDefaultCase(() => {});
	}
});

const {actions, reducer} = filterSlice;

export default reducer;

export const {setFilter} = actions;