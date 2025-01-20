import { Upload } from '@phosphor-icons/react/dist/ssr/Upload'
import { ChangeEvent, useCallback, useState } from 'react'

export function ImageInput() {
  const [imagePreviewSrc, setImagePreviewSrc] = useState('')
  const [fileName, setFileName] = useState('')

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return
    setImagePreviewSrc(URL.createObjectURL(file))
    setFileName(file.name)
  }, [])
  return (
    <>
      <label
        htmlFor="image"
        className={`
          h-32 md:w-32  rounded-lg shrink-0 cursor-pointer flex items-center justify-center
          ${
            imagePreviewSrc
              ? 'ring ring-cyan-800'
              : 'border border-dashed border-cyan-900'
          }  
        `}
      >
        {imagePreviewSrc ? (
          <img
            className="w-full h-full rounded-lg shrink-0 object-cover"
            src={imagePreviewSrc}
            alt=""
          />
        ) : (
          <div>
            <Upload size={20} className="flex mx-auto mb-1" />
            Cargar foto
          </div>
        )}
      </label>
      <input
        type="file"
        id="image"
        name="image"
        hidden
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <input
        type="text"
        name="image-name"
        hidden
        value={fileName}
        onChange={() => {}}
      />
    </>
  )
}
