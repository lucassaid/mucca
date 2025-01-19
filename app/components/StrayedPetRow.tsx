import { StrayedPetPost } from '~/types/StrayedPet'

export function StrayedPetRow(post: StrayedPetPost) {
  return (
    <div className="flex gap-x-3 py-3 items-center">
      <img
        className="size-14 bg-cyan-700 rounded shrink-0"
        src={post.image}
        alt={post.title}
      />
      <div>
        <h4>{post.title}</h4>
        <p className="text-xs opacity-80 line-clamp-2">{post.description}</p>
      </div>
    </div>
  )
}
