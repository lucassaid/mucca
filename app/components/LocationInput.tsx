import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { getMarker } from './getMarker'
import { StrayedPetKind } from '~/types/StrayedPet'

interface LocationInputProps {
  location: [number, number]
  onLocationChange: (location: [number, number]) => void
  zoom?: number
  requestGeo?: boolean
  kind: StrayedPetKind
}

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVjYXNzYWlkIiwiYSI6ImNsbGx1NTNhbTF4ajQzcnFvdDNxcWFza2UifQ.hPE2eu4YkSypDKdTn5GBYg'

export default function LocationInput({
  location,
  onLocationChange,
  zoom = 12,
  requestGeo = false,
  kind,
}: LocationInputProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!requestGeo) return
    try {
      navigator.geolocation.getCurrentPosition((geo) => {
        map.current?.setCenter([geo.coords.longitude, geo.coords.latitude])
      })
    } catch (err) {
      console.error(err)
    }
  }, [requestGeo])

  useEffect(() => {
    if (map.current || !mapContainer.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location,
      zoom,
    })

    markerRef.current = new mapboxgl.Marker(getMarker(kind))
      .setLngLat(location)
      .addTo(map.current)

    map.current.on('move', () => {
      if (!map.current) return
      const { lng, lat } = map.current.getCenter()
      onLocationChange([lng, lat])
      markerRef.current?.setLngLat([lng, lat])
    })
  }, [onLocationChange, location, zoom, kind])

  return (
    <div
      ref={mapContainer}
      className="map-container rounded-md h-[250px] w-full"
    />
  )
}
