import { useActionData } from '@remix-run/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface StandardActionResponse {
  ok: boolean
  message: string
  errors: string[]
}

export function useActionToast(defaultMessage = 'Guardado', cb?: () => void) {
  const actionData = useActionData<StandardActionResponse>()

  useEffect(() => {
    if (actionData?.ok) {
      toast.success(actionData.message || defaultMessage)
      cb?.()
    } else if (actionData?.errors) {
      toast.error(actionData.errors[0])
    }
  }, [actionData, defaultMessage, cb])
}
