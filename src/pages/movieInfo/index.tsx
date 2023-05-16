import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieInfo } from "../../store/movie/movieActions";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

export const MovieInfo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { movie, loading, error } = useSelector((state: RootState) => state.movie);
  const { id: movieID, type } = params;

  useEffect(() => {
    if (movieID && type) {
      dispatch(
        fetchMovieInfo({ id: Number(movieID), type: type })
      );
    }
  }, [dispatch, movieID, type]);

  return (
    <main>
      {
        movie && <article>
          <h1>{movie.title}</h1>
          <img src={movie.poster_path} alt="movie poster"></img>
        </article>
      }
    </main>
  )
}
