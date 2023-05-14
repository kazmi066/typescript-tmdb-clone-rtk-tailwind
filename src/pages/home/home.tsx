import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { fetchTrendingMovies } from "../../store/movie/movieActions";
import { IMAGE_BASE_URL } from "../../data/endpoints";
import { Movie } from "../../store/movie/interfaces";
import { Container } from "../../components/container";

const Hero = ({ movie }: { movie: Movie }) => {
  return (
    <section>
      {
        movie && <div className="relative h-[70vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
          <div className="home_hero_overlay" />
          <Container>
            <div className="flex items-center h-full w-full relative z-40 text-white">
              <div className="md:w-3/4">
                <h1 className="mb-4">{movie.title}</h1>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Container>
        </div>
      }
    </section>
  )
}

export const Home = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, movies } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    dispatch(fetchTrendingMovies({ page: 1, searchTerm: searchQuery }));
  }, [dispatch, searchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  if(loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <main>
      {movies[0] && <Hero movie={movies[1]} />}
      <Container>
        <section className="mt-8 gap-8 grid xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2">
          {
            movies?.map((movie) => (
              <article key={movie.id} className="rounded-lg overflow-hidden block float-left">
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="movie" className="rounded-xl hover:-translate-y-2 transition-transform object-cover cursor-pointer" />
                <h5 className="pt-2 font-medium truncate">{movie.title}</h5>
                <div className="flex justify-between pt-[.5px]">
                  <small>{new Date(movie.release_date).getFullYear() || '-'}</small>
                  <small className="rounded-sm border-[1px] px-2 py-[0.1px]">{movie.media_type}</small>
                </div>
              </article>
            ))
          }
        </section>
        <input type="text" onChange={handleSearchChange} />
      </Container>
    </main>
  )
}
