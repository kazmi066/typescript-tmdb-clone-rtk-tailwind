import { Button } from "../../../components/button/button"
import { MovieCard } from "../../../components/movieCard/movieCard"
import { Movie } from "../../../store/movie/interfaces"

interface MoviesListProps {
  movies: Movie[],
  loadMore: () => void,
  loading: boolean,
  hasMore?: boolean
}

export const MoviesList = ({ movies, loadMore, loading, hasMore } : MoviesListProps) => {
  return (
    <div className="pt-14 pb-24">
      <section className="mt-8 gap-x-4 gap-y-10 grid xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2 pb-14">
        {
          movies?.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} href={`/${movie.media_type}/${movie.id}`} />
            </div>
          ))
        }
      </section>
      <div className="w-full text-center">
        <Button
          variant="secondary"
          onClick={loadMore}
          className="rounded-md text-md font-light shadow-lg border-2 px-4 py-2"
          text={loading ? "loading...." : "Load more"}
        />
      </div>
    </div>
  )
}
