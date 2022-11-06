const initialState = {
	filters: [],
	activeFilter: 'all',
	filteredListOfHeroes: []
}

const fiters = (state = initialState, action) => {
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

export default fiters;