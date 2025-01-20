import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

type UseMapMarkerReturn = [
  React.RefObject<HTMLDivElement>,
  React.RefObject<mapboxgl.Marker | null>
]

export function useMapMarker(map: mapboxgl.Map): UseMapMarkerReturn {
  const markerElementRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!markerElementRef.current) return
    const marker = new mapboxgl.Marker(markerElementRef.current!)
    markerRef.current = marker
    try {
      marker.addTo(map)
    } catch (err) {
      console.log(err)
    }
    return () => {
      marker.remove()
    }
  }, [map])

  return [markerElementRef, markerRef]
}
