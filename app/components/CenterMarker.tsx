import { useEffect } from 'react'
import { useMapMarker } from './useMapMarker'
import { MapPinSimple } from '@phosphor-icons/react/dist/ssr/MapPinSimple'

interface PostMarkerProps {
  map: mapboxgl.Map
  onChange: (newLngLat: [number, number]) => void
}

export function CenterMarker({ map, onChange }: PostMarkerProps) {
  const [markerElementRef, markerRef] = useMapMarker(map)

  useEffect(() => {
    map.on('move', () => {
      if (!map) return
      const { lng, lat } = map.getCenter()
      markerRef.current?.setLngLat([lng, lat])
      onChange([lng, lat])
    })
  }, [map, markerRef, onChange])

  return (
    <div ref={markerElementRef}>
      <MapPinSimple
        weight="fill"
        className="text-black relative -top-4"
        size={40}
      />
    </div>
  )
}
