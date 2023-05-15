import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { fetchTrendingMovies } from "../../store/movie/movieActions";
import { IMAGE_BASE_URL } from "../../data/endpoints";
import { Movie } from "../../store/movie/interfaces";
import { Container } from "../../components/container";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../../components/button/button";
import { Link } from "react-router-dom";

const Hero = ({ movie }: { movie: Movie }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 300]);

  return (
    <section>
      {
        movie && <div className="relative h-[70vh] overflow-hidden">
          <motion.div style={{ y }} className="-z-50 absolute top-0 left-0 w-full h-full">
            <img src={movie.backdrop_path} alt="movie" className="object-cover w-full h-full" />
            <div className="home_hero_overlay" />
          </motion.div>
          <Container>
            <div className="flex items-center h-full w-full relative text-white">
              <div className="md:w-3/4">
                <h1 className="mb-2 md:text-6xl text-4xl">{movie.title}</h1>
                <p className="md:text-xl">{movie.overview}</p>
                <div className="flex gap-4 mt-10 items-center">
                  <Button text="Watch Trailer" variant="rainbow" />
                  <Link to="www.google.com">
                    <Button text="Learn More" variant="secondary" />
                  </Link>
                </div>
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
      {movies[0] && <Hero movie={movies[0]} />}
      <Container>
        <section className="mt-8 gap-4 grid xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2">
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
