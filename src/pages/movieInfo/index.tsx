import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieActors, fetchMovieInfo } from "../../store/movie/movieActions";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/spinner";
import { Container } from "../../components/container";
import RatingStar from '../../assets/ratingStar.svg';
import { formatDate } from "../../utils/helpers";

export const MovieInfo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { movie, loading, actors } = useSelector((state: RootState) => state.movie);
  const { id: movieID, type } = params;

  useEffect(() => {
    if (movieID && type) {
      dispatch(
        fetchMovieInfo({ id: Number(movieID), type: type })
      );
      dispatch(
        fetchMovieActors({ id: Number(movieID), type: type })
      )
    }
  }, [dispatch, movieID, type]);

  if (loading) {
    return <div className="mt-[50vh] flex items-center justify-center">
      <Spinner />
    </div>
  }

  return (
    <main>
      {
        movie
        && <article>
          <div className="relative">
            <img src={movie.backdrop_path} alt="movie" className="object-cover w-full h-[50vh]" />
            <div className="home_hero_overlay" />
          </div>
          <Container>
            <div className="flex gap-6 my-14">
              <img src={movie.poster_path} alt="movie poster"></img>
              <div>
                <h1 className="text-4xl font-medium">{movie.title}</h1>
                <div className="flex mt-2 mb-4 items-center gap-4">
                  <div className="flex items-center">
                    <RatingStar />
                    <p className="-mb-1 pl-[1.5px]">{movie.vote_average?.toFixed(1)}</p>
                  </div>
                  <div className="px-2 py-[1px] text-sm bg-black text-white rounded-xl">{type}</div>
                </div>
                <p>{movie.overview}</p>
                <div className="mt-5">
                  <b>Genre:</b>
                  {
                    movie.genres?.map((genre, index) => (
                      <span key={genre.id}> {genre.name}{index + 1 !== movie.genres?.length && ","}</span>
                    ))
                  }
                </div>
                <div className="mt-1">
                  <b>Release Date: </b>
                  {movie.release_date ? formatDate(movie.release_date) : '------'}
                </div>
                <div className="mt-1">
                  <b>Vote Count: </b>{movie.vote_count}
                </div>
                <div className="mt-1">
                  <b>Spoken Languages: </b>
                  {
                    movie.spoken_languages?.map((language, index) => (
                      <span key={index}> {language.name}{index + 1 !== movie.spoken_languages?.length && ","}</span>
                    ))
                  }
                </div>
              </div>
            </div>
            <section className="pb-24">
              <h1 className="text-gray-500 mb-8">Cast</h1>
              <div className="flex items-center gap-4 flex-wrap">
                {
                  actors.map((actor) => (
                    <div className="m-2 w-44 cursor-pointer hover:opacity-90" key={actor.id}>
                      <div className="relative text-center w-full h-full bg-true-gray-400 dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md">
                        <img className="w-full h-full object-cover" src={actor.profile_path} alt={`poster for ${actor.character}`} />
                        <h4 className="absolute bottom-0 w-full text-white backdrop-filter backdrop-brightness-50 backdrop-blur-sm p-1">
                          {actor.original_name} ({actor.character})
                        </h4>
                      </div>
                    </div>
                  ))
                }
              </div>
            </section>
          </Container>
        </article>
      }
    </main>
  )
}
