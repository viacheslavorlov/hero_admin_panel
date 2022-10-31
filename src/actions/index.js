export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (heroes) => {
    return {
        type: 'HERO_DELETED',
        payload: heroes
    }
}


export const addHero = (heroes) => {
    return {
        type: 'HERO_ADD',
        payload: heroes
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}


export const filterHeroes = (list) => {
    return {
        type: 'FILTERED_LIST_OF_HEROES',
        payload: list
    }
}