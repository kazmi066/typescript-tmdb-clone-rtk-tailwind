import { useNavigate } from "react-router-dom";
import { Movie } from "../../../store/movie/interfaces";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../../components/container";
import { Button } from "../../../components/button/button";
import { formatDate } from "../../../utils/helpers";

const HeroSection = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate();
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
                <div className="mt-5">
                  <b>Release Date: </b>
                  {movie.release_date ? formatDate(movie.release_date) : '------'}
                </div>
                <div className="flex gap-4 mt-8 items-center">
                  <Button text="Watch Trailer" variant="rainbow" />
                  <Button text="Learn More" variant="secondary" onClick={() => navigate(`/movie/${movie.id}`)} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      }
    </section>
  )
}

export { HeroSection };
