import {
  ActionFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { Logo } from '~/components/Logo'
import { StrayedPetKind, StrayedPetPost } from '~/types/StrayedPet'
import { put } from '@vercel/blob'
import { ImageInput } from '~/components/ImageInput'
import Map from '~/components/Map'
import { CenterMarker } from '~/components/CenterMarker'
import { postsCollection } from '~/db.server'
import { useActionToast } from '~/components/useActionToast'

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  )
  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const file = formData.get('image')
  const fileName = formData.get('image-name')
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const phone = formData.get('phone') as string
  const coordinates = JSON.parse(formData.get('coordinates') as string) as [
    number,
    number
  ]
  const kind = formData.get('kind') as StrayedPetKind

  if (!file)
    return {
      ok: false,
      errors: ['Debes subir una imagen'],
    }

  const key = `strayed/${Date.now()}-${fileName}`
  const { url } = await put(key, file, { access: 'public' })

  await postsCollection.insertOne({
    title,
    description,
    phone,
    image: url,
    kind,
    tags: [],
    location: {
      type: 'Point',
      coordinates,
    },
    reuniteDate: null,
    createdAt: new Date(),
  })

  return {
    ok: true,
    errors: [],
  }
}

export default function FoundScreen() {
  const [kind, setKind] = useState<StrayedPetPost['kind']>('dog')
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0])

  useActionToast()

  return (
    <Form
      className="px-4 max-w-xl mx-auto"
      method="post"
      encType="multipart/form-data"
    >
      <div className="py-4 flex justify-between">
        <Logo />
      </div>
      <div className="h-4" />
      <div className="flex items-center">
        <span className="text-xl">Publicar &nbsp;</span>
        <select
          value={kind}
          onChange={(e) =>
            setKind(e.currentTarget.value as StrayedPetPost['kind'])
          }
          className="input !text-lg !h-9"
          name="kind"
        >
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
        </select>
        <span className="text-xl">&nbsp; extraviado</span>
      </div>
      <div className="h-3" />
      <span className="text-xs opacity-80">
        Ubicación donde se perdió o encontraste a la mascota
      </span>
      <div className="h-1" />
      <Map requestGeo height={250}>
        {({ map }) => <CenterMarker map={map} onChange={setCoordinates} />}
      </Map>
      <div className="h-4" />
      <div className="md:flex gap-x-3">
        <ImageInput />
        <div className="h-3 md:hidden" />
        <div className="flex-1 px-2 py-1 bg-cyan-900/50 rounded w-full">
          <input
            placeholder="Título"
            id="title"
            className="text-lg focus:outline-none w-full"
            type="text"
            name="title"
            required
          />
          <div className="h-1" />
          <textarea
            placeholder="Raza, color, detalles que ayuden a la identifición"
            className="focus:outline-none opacity-70 rounded w-full !h-[58px] resize-none"
            name="description"
            required
          />
        </div>
      </div>
      <div className="h-3" />
      <input
        placeholder="Teléfono de contacto"
        className="focus:outline-none px-2 py-1 bg-cyan-900/50 rounded w-full"
        required
        name="phone"
        autoComplete="tel"
      />
      <input
        type="hidden"
        name="coordinates"
        value={JSON.stringify(coordinates)}
      />
      <div className="h-3" />
      <button className="w-full" type="submit">
        Publicar
      </button>
      <div className="h-10" />
    </Form>
  )
}
