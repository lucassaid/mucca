import mapboxgl from 'mapbox-gl'
import { ReactNode, useCallback, useEffect, useState } from 'react'

interface ChildrenProps {
  map: mapboxgl.Map
}

interface SearchMapProps {
  requestGeo?: boolean
  children?: (props: ChildrenProps) => ReactNode
  height?: number
}

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVjYXNzYWlkIiwiYSI6ImNsbGx1NTNhbTF4ajQzcnFvdDNxcWFza2UifQ.hPE2eu4YkSypDKdTn5GBYg'

export default function Map({
  requestGeo = false,
  children,
  height = 480,
}: SearchMapProps) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!requestGeo) return
    try {
      navigator.geolocation.getCurrentPosition((geo) => {
        map?.setCenter([geo.coords.longitude, geo.coords.latitude])
      })
    } catch (err) {
      console.error(err)
    }
  }, [requestGeo, map])

  const handleMapContainerRef = useCallback((container: HTMLDivElement) => {
    if (container) {
      setMap(
        new mapboxgl.Map({
          container,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-55.2544, -34.8701],
          zoom: 12,
        })
      )
    }
  }, [])

  return (
    <>
      <div
        ref={handleMapContainerRef}
        className="map-container rounded-md w-full"
        style={{ height }}
      />
      {map ? children?.({ map }) : null}
    </>
  )
}
