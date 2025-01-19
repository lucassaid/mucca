import { PawPrint } from '@phosphor-icons/react/dist/ssr'
import { Link } from '@remix-run/react'
import LocationInput from '~/components/LocationInput'
import { Logo } from '~/components/Logo'
import { StrayedPetRow } from '~/components/StrayedPetRow'
import { mockPosts } from '~/mocks/posts'

export default function SearchScreen() {
  return (
    <div className="px-4 max-w-xl mx-auto">
      <div className="py-4 flex justify-between">
        <Logo />
        <select className="input">
          <option>Perros</option>
          <option>Gatos</option>
        </select>
      </div>
      <LocationInput
        requestGeo
        location={[0, 0]}
        onLocationChange={console.log}
        kind="dog"
      />
      <div className="h-3" />
      {mockPosts.map((post) => (
        <StrayedPetRow key={post.title} {...post} />
      ))}
      <hr className="my-10 opacity-20" />
      <div className="text-center">
        <p>No encuentras a tu mascota?</p>
        <p className="opacity-80 text-sm mt-2">
          Usa el mapa para seguir buscando. Si no logras encontrarla, crea una
          publicación en pocos segundos, no necesitas registrarte:
        </p>
        <br />
        <Link to="new">
          <button>Publicar mascota extraviada</button>
        </Link>
      </div>
      <div className="h-16" />
      <p className="opacity-60 p-3 text-xs text-center">
        Sin ánimo de lucro, hecho por y para los amantes de las
        mascotas&nbsp;&nbsp;
        <PawPrint weight="fill" size={16} className="inline mb-[2px]" />
      </p>
    </div>
  )
}
