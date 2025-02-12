import { Cat } from '@phosphor-icons/react/dist/ssr/Cat'
import { Dog } from '@phosphor-icons/react/dist/ssr/Dog'
import { Link } from '@remix-run/react'

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      Mucca&nbsp;
      <Dog />
      <Cat />
    </Link>
  )
}
