import { createSlice } from '@reduxjs/toolkit';
import { fetchTrendingMovies } from './movieActions';
import { Movie } from './interfaces';

interface InitialState {
  loading: boolean,
  error: Error | null,
  movies: Movie[]
} 

const initialState: InitialState = {
  loading: false,
  error: null,
  movies: []
}

const movieSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingMovies.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movies = payload as Movie[];
    })
    .addCase(fetchTrendingMovies.rejected, (state, { payload }) => {
      state.loading = false;
      // state.error = payload.error;
    })
  }
});

export default movieSlice.reducer;
