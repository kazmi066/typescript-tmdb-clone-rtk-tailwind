import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { IMAGE_BASE_URL, TRENDING_BASE_URL } from "../../data/endpoints";
import { Movie } from "./interfaces";

export const fetchTrendingMovies = createAsyncThunk('/movies/list', async(
  { page, searchTerm }: { page: number, searchTerm: string }, { rejectWithValue }
) => {
  try {
    const response = await axiosClient.get(
      searchTerm
        ? `${TRENDING_BASE_URL}&query=${searchTerm}&page=${page}`
        : `${TRENDING_BASE_URL}&page=${page}`
    );

    const movies = response.data.results.map((movie: Movie) => ({
      ...movie,
      backdrop_path: movie.backdrop_path ? IMAGE_BASE_URL + "/w1280" + movie.backdrop_path : null,
      poster_path: movie.poster_path ? IMAGE_BASE_URL + "/w342" + movie.poster_path : null,
      title: movie.title || movie.name
    }));

    return movies as Movie[];
  } catch (error) {
    return rejectWithValue(error) as unknown;
  }
});
