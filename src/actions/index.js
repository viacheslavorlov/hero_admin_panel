import {createAction} from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching)
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
        .then(data => dispatch(loadFilters(data)))
        .catch(err => console.log(err));
}

export const heroesFetching = createAction('HEROES_FETCHING')

export const heroesFetched = createAction('HEROES_FETCHED')

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const heroDeleted = createAction('HERO_DELETED')

export const addHero = createAction('HERO_ADD')

export const setFilter = createAction('SET_FILTER')

export const loadFilters = createAction('LOAD_FILTERS')