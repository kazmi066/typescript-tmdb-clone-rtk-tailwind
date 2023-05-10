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
              <div className="md:w-2/4">
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
        <section className="mt-8 grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 justify-center">
          {
            movies?.map((movie) => (
              <article key={movie.id}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="movie" />
                <h3>{movie.title}</h3>
              </article>
            ))
          }
        </section>
      </Container>
    </main>
  )
}
