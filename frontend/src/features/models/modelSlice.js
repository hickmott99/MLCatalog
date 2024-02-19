import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_GET_MODELS } from '../../constants/constants';


const initialState = {
    loading: false,
    error: null,
    models: [],
    queryString: ""
};


export const fetchModelsAsync = createAsyncThunk(
    'models/fetch',
    async (queryString) => {
      const response = await fetch(API_GET_MODELS + queryString);
      if (response.status !== 200) { throw new Error('error') }
      const data = await response.json();
      let payload = {
        "models" : data,
        "queryString": queryString
      }
      return payload;   
    }
)


export const modelSlice = createSlice({
  name: 'model', 
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchModelsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.models = [];
        state.queryString = ""
      })
      .addCase(fetchModelsAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.models = action.payload.models;
          state.queryString = action.payload.queryString
      })        
      .addCase(fetchModelsAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = "Unable to fetch models currently. Please try again later.";
          state.models = [];
          state.queryString = ""
      })
  }
});

export default modelSlice.reducer;
