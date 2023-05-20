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
    <section className="mt-8 gap-4 grid xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2 pb-24">
      {
        movies?.map((movie) => (
          <MovieCard movie={movie} href={`/${movie.media_type}/${movie.id}`} />
        ))
      }
      <div className="flex items-center justify-center">
        <button
          onClick={loadMore}
          className="rounded-md text-md font-light shadow-lg border-2 px-4 py-2 mx-auto"
        >
          {loading ? "loading...." : "Load more"}
        </button>
      </div>
    </section>
  )
}
