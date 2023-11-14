import { type ReactNode } from 'react'
import { Button } from './button'

export interface LayoutProps {
  children: ReactNode
  actionBtnLabel: string
  actionBtnLink: string
}

export function Layout({
  children,
  actionBtnLabel,
  actionBtnLink,
}: LayoutProps) {
  return (
    <main className="flex h-full flex-col-reverse justify-between md:flex-col">
      <nav className="flex justify-between p-1">
        <Button onClick={() => window.history.back()}>&#128072;</Button>
        <Button linkTo={actionBtnLink}>{actionBtnLabel}</Button>
        <Button linkTo="/"> &#129312;</Button>
      </nav>
      <div className="h-full w-full">{children}</div>
    </main>
  )
}
