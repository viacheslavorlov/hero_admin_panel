import {createAction} from "@reduxjs/toolkit";

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
        .then(data => dispatch(loadFilters(data)))
        .catch(err => console.log(err));
}

export const setFilter = createAction('SET_FILTER')

export const loadFilters = createAction('LOAD_FILTERS')