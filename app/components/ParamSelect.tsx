import { useSearchParams } from '@remix-run/react'
import { HTMLProps, useCallback, FormEvent } from 'react'

interface ParamSelectProps extends HTMLProps<HTMLSelectElement> {
  name: string
  defaultParamValue?: string
}

export function ParamSelect({ defaultParamValue, ...props }: ParamSelectProps) {
  const [params, setParams] = useSearchParams()

  const handleChange = useCallback(
    (e: FormEvent<HTMLSelectElement>) => {
      setParams((curr) => {
        curr.set(props.name, e.currentTarget.value)
        return curr
      })
    },
    [setParams, props.name]
  )

  return (
    <select
      value={params.get(props.name) || defaultParamValue}
      onChange={handleChange}
      {...props}
    />
  )
}
