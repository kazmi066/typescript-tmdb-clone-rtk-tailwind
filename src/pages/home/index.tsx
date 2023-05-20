import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { fetchTrendingMovies } from "../../store/movie/movieActions";
import { Container } from "../../components/container";
import { HeroSection } from "./components/heroSection";
import { Spinner } from "../../components/spinner";
import { MoviesList } from "./components/moviesList";
import { motion } from "framer-motion";

export const Home = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true); 
  const { loading, error, movies } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      dispatch(fetchTrendingMovies({ page: page, searchTerm: searchQuery }));
    }
  }, [dispatch, isInitialRender, page, searchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handlePagination = () => {
    setPage(prevPage => prevPage + 1);
  }

  if (loading && isInitialRender) {
    return <div className="mt-[50vh] flex items-center justify-center">
      <Spinner />
    </div>
  }

  if (error) {
    return <p className="text-center mt-14 text-red-500">{error}</p>
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      {movies[0] && <HeroSection movie={movies[3]} />}
      <Container>
        <MoviesList
          movies={movies}
          loading={loading}
          loadMore={handlePagination}
        />
        <input type="text" onChange={handleSearchChange} />
      </Container>
    </motion.main>
  )
}
