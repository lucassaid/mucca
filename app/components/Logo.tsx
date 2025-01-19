import { Cat, Dog } from '@phosphor-icons/react'
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
