import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieActors, fetchMovieInfo, fetchTrendingMovies } from './movieActions';
import { Actor, Movie } from './interfaces';

interface InitialState {
  loading: boolean,
  error: string,
  movies: Movie[],
  movie: Partial<Movie>,
  actors: Actor[]
} 

const initialState: InitialState = {
  loading: false,
  error: '',
  movies: [],
  movie: {},
  actors: []
}

const movieSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {
    clearMovies(state) {
      state.movies = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movies = state.movies.concat(payload as Movie[]);
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      }),
    builder
      .addCase(fetchMovieInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movie = payload;
      })
      .addCase(fetchMovieInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
    builder
      .addCase(fetchMovieActors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieActors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.actors = payload;
      })
      .addCase(fetchMovieActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
  }
});

export const { clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
