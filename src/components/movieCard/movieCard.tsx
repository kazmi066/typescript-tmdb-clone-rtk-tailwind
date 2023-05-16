import { useNavigate } from "react-router-dom"
import { IMAGE_BASE_URL } from "../../data/endpoints"
import { Movie } from "../../store/movie/interfaces"

export const MovieCard = ({ movie, href }: { movie: Movie, href?: string }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (href) {
      navigate(href);
    }
  }

  return (
    <article key={movie.id} className="rounded-lg overflow-hidden">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt="movie"
        className="rounded-xl hover:-translate-y-2 transition-transform object-cover cursor-pointer"
        onClick={handleCardClick}
      />
      <h5 className="pt-2 font-medium truncate">{movie.title}</h5>
      <div className="flex justify-between pt-[.5px]">
        <small>{new Date(movie.release_date).getFullYear() || '-'}</small>
        <small className="rounded-sm border-[1px] px-2 py-[0.1px]">{movie.media_type}</small>
      </div>
    </article>
  )
}
