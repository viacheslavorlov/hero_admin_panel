import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const initialState = {
	filters: [],
	activeFilter: 'all'
}

const filterSlice = createSlice({

})