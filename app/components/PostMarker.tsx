import { useEffect } from 'react'
import { StrayedPetPost } from '~/types/StrayedPet'
import { useMapMarker } from './useMapMarker'

interface PostMarkerProps {
  post: StrayedPetPost & { _id: string }
  map: mapboxgl.Map
}

export function PostMarker({ post, map }: PostMarkerProps) {
  const [markerElementRef, markerRef] = useMapMarker(map)

  useEffect(() => {
    markerRef.current?.setLngLat(post.location.coordinates)
  }, [post.location.coordinates, markerRef])

  return (
    <div
      ref={markerElementRef}
      className="w-32 text-black group hover:w-72 p-1 hover:p-2 rounded-lg bg-white z-0 hover:z-10"
    >
      <img
        className="w-full h-14 group-hover:h-28 rounded object-cover"
        src={post.image}
        alt={post.title}
      />
      <div className="hidden group-hover:block mt-1">
        <div className="line-clamp-1 text-sm mb-1">{post.title}</div>
        <p className="line-clamp-2 text-xs">{post.description}</p>
        <div className="h-2" />
        <button className="border w-full">Ver publicación</button>
      </div>
    </div>
  )
}
