import mapboxgl from 'mapbox-gl'
import { StrayedPetKind } from '~/types/StrayedPet'

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVjYXNzYWlkIiwiYSI6ImNsbGx1NTNhbTF4ajQzcnFvdDNxcWFza2UifQ.hPE2eu4YkSypDKdTn5GBYg'

export function getMarker(kind: StrayedPetKind) {
  const line = document.createElement('div')
  line.className = 'w-1 h-5 bg-black mx-auto'

  const markerTop = document.createElement('div')
  markerTop.className = `
    rounded-full w-12 h-12
    bg-black flex items-center justify-center
  `

  const text = document.createElement('div')
  text.className = 'text-white text-3xl'
  text.innerText = kind == 'dog' ? '🐶' : '🐱'
  markerTop.appendChild(text)

  const circleAndLine = document.createElement('div')
  circleAndLine.className = 'relative -top-[34px]'
  circleAndLine.appendChild(markerTop)
  circleAndLine.appendChild(line)

  const container = document.createElement('div')
  container.appendChild(circleAndLine)
  return container
}
