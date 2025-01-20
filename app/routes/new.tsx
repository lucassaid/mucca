import {
  ActionFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import LocationInput from '~/components/LocationInput'
import { Logo } from '~/components/Logo'
import { StrayedPetPost } from '~/types/StrayedPet'
import { put } from '@vercel/blob'
import { ImageInput } from '~/components/ImageInput'

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

  if (!file)
    return {
      ok: false,
      errors: ['No file selected'],
    }

  const key = `strayed/${Date.now()}-${fileName}`
  const { url } = await put(key, file, { access: 'public' })

  console.log(url)
  return {
    ok: true,
    errors: [],
  }

  // file is a "NodeOnDiskFile" which implements the "File" API
  // ... etc
}

export default function FoundScreen() {
  const [kind, setKind] = useState<StrayedPetPost['kind']>('dog')

  return (
    <div className="px-4 max-w-xl mx-auto">
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
      <LocationInput
        kind={kind}
        requestGeo
        location={[0, 0]}
        onLocationChange={console.log}
      />
      <div className="h-4" />
      <Form method="post" encType="multipart/form-data">
        <div className="md:flex gap-x-3">
          <ImageInput />
          <div className="h-3 md:hidden" />
          <div className="flex-1 px-2 py-1 bg-cyan-900/50 rounded w-full">
            <input
              placeholder="Título"
              id="title"
              className="text-lg focus:outline-none w-full"
              type="text"
            />
            <div className="h-1" />
            <textarea
              placeholder="Raza, color, detalles que ayuden a la identifición"
              className="focus:outline-none opacity-70 rounded w-full !h-[58px] resize-none"
            />
          </div>
        </div>
        <div className="h-3" />
        <input
          placeholder="Teléfono de contacto"
          className="focus:outline-none px-2 py-1 bg-cyan-900/50 rounded w-full"
        />
        <div className="h-3" />
        <button className="w-full" type="submit">
          Publicar
        </button>
      </Form>
      <div className="h-6" />
    </div>
  )
}
