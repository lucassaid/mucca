import { PawPrint } from '@phosphor-icons/react/dist/ssr/PawPrint'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Logo } from '~/components/Logo'
import Map from '~/components/Map'
import { ParamSelect } from '~/components/ParamSelect'
import { PostMarker } from '~/components/PostMarker'
import { postsCollection } from '~/db.server'
import { StrayedPetKind } from '~/types/StrayedPet'

export async function loader(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url)
  const kind = (url.searchParams.get('kind') as StrayedPetKind) || 'dog'
  const posts = await postsCollection.find({ kind }).toArray()

  return {
    posts: posts.map((p) => ({ ...p, _id: p._id.toString() })),
  }
}

export default function SearchScreen() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="py-3 flex justify-between">
        <Logo />
        <ParamSelect defaultParamValue="dog" name="kind" className="input">
          <option value="dog">Perros</option>
          <option value="cat">Gatos</option>
        </ParamSelect>
      </div>
      <Map requestGeo>
        {({ map }) => {
          if (!map) return ''
          return posts.map((post) => (
            <PostMarker key={post._id} map={map} post={post} />
          ))
        }}
      </Map>
      <div className="h-6" />
      <div className="text-center max-w-lg mx-auto">
        <p>No encuentras a tu mascota?</p>
        <p className="opacity-80 text-sm mt-1">
          Crea una publicación en pocos segundos, no necesitas registrarte:
        </p>
        <div className="h-4" />
        <Link to="new">
          <button>Publicar mascota extraviada</button>
        </Link>
      </div>
      <div className="h-10" />
      <p className="opacity-60 p-3 text-xs text-center">
        Sin ánimo de lucro, hecho por y para los amantes de las
        mascotas&nbsp;&nbsp;
        <PawPrint weight="fill" size={16} className="inline mb-[2px]" />
      </p>
    </div>
  )
}
