import { Actor } from "../../../store/movie/interfaces"

export const ActorCard = ({ actor } : { actor: Actor }) => {
  return (
    <div className="m-2 w-44 cursor-pointer hover:opacity-90">
      <div className="relative text-center w-full h-full bg-true-gray-400 dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md">
        <img className="w-full h-full object-cover" src={actor.profile_path} alt={`poster for ${actor.character}`} />
        <h4 className="absolute bottom-0 w-full text-white backdrop-filter backdrop-brightness-50 backdrop-blur-sm p-1">
          {actor.original_name} ({actor.character})
        </h4>
      </div>
    </div>
  )
}
