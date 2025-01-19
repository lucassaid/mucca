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
          size-28 rounded-lg shrink-0 inset-0 cursor-pointer flex items-center justify-center
          ${
            imagePreviewSrc
              ? 'ring ring-cyan-800'
              : 'border border-dashed border-cyan-900'
          }  
        `}
      >
        {imagePreviewSrc && (
          <img
            className="size-28 rounded-lg shrink-0 object-cover"
            src={imagePreviewSrc}
            alt=""
          />
        )}
        <Upload size={20} />
      </label>
      <input
        type="file"
        id="image"
        name="image"
        hidden
        accept="image/*"
        onChange={handleImageChange}
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
