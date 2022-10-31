const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredListOfHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: action.payload
            }
        case 'FILTER_HEROES':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'FILTERED_LIST_OF_HEROES':
            return {
                ...state,
                filteredListOfHeroes: action.payload
            }
        case 'SET_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;