import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { fetchTrendingMovies } from "../../store/movie/movieActions";
import { IMAGE_BASE_URL } from "../../data/endpoints";
import { Movie } from "../../store/movie/interfaces";
import { Container } from "../../components/container";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/heroSection";
import { MovieCard } from "../../components/movieCard/movieCard";

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
      {movies[0] && <HeroSection movie={movies[2]} />}
      <Container>
        <section className="mt-8 gap-4 grid xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2">
          {
            movies?.map((movie) => (
              <MovieCard movie={movie} href={`/movie/${movie.id}`} />
            ))
          }
        </section>
        <input type="text" onChange={handleSearchChange} />
      </Container>
    </main>
  )
}
