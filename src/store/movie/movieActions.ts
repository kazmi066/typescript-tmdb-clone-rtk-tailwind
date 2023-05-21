import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL, SEARCH_BASE_URL, TRENDING_BASE_URL } from "../../data/endpoints";
import { Actor, Movie } from "./interfaces";

export const fetchTrendingMovies = createAsyncThunk('/movies/list', async(
  { page, searchTerm = "" }: { page: number, searchTerm?: string }, { rejectWithValue }
) => {
  try {
    const response = await axiosClient.get(
      searchTerm
        ? `${SEARCH_BASE_URL}&query=${searchTerm}&page=${page}`
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
    return rejectWithValue(error);
  }
});

export const fetchMovieInfo = createAsyncThunk('/movie/info', async(
  { id, type }: { id: number, type: string }, { rejectWithValue }
) => {
  try {
    const response = await axiosClient.get(`${API_BASE_URL}/${type}/${id}?api_key=${API_KEY}`);

    const movieInfo = {
      ...response.data,
      backdrop_path: response.data.backdrop_path ? IMAGE_BASE_URL + "/w1280" + response.data.backdrop_path : null,
      poster_path: response.data.poster_path ? IMAGE_BASE_URL + "/w342" + response.data.poster_path : null,
      title: response.data.title || response.data.name
    };

    return movieInfo as Movie;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchMovieActors = createAsyncThunk('/movie/actors', async(
  { id, type }: { id: number, type: string }, { rejectWithValue }
) => {
  try {
    const response = await axiosClient.get(`${API_BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
    let actors = [];

		if (response.data) {
			actors = response.data.cast.map((actor: Actor) => ({
				...actor,
				profile_path: actor.profile_path ? IMAGE_BASE_URL + "/w185" + actor.profile_path : "https://www.tgv.com.my/assets/images/404/movie-poster.jpg",
			}))
		}

    return actors;
  } catch (error) {
    return rejectWithValue(error);
  }
});
