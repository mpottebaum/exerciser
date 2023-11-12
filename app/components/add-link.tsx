import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import type { ReactNode, RefAttributes } from 'react'

export type AddLinkProps = {
  to?: string
  children: ReactNode
} & Omit<LinkProps, 'to'> &
  RefAttributes<HTMLAnchorElement>

export function AddLink({ children, to, ...linkProps }: AddLinkProps) {
  if (!to) {
    return children
  }
  return (
    <Link to={to} {...linkProps}>
      {children}
    </Link>
  )
}
