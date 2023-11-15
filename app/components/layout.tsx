import { type ReactNode } from 'react'
import { Button, ButtonProps } from './button'

export interface ActionBtnProps {}
export interface LayoutProps {
  children: ReactNode
  actionBtnProps?: ButtonProps
  actionBtnLabel?: string
}

export function Layout({
  children,
  actionBtnLabel,
  actionBtnProps,
}: LayoutProps) {
  return (
    <main className="flex h-full flex-col-reverse justify-between md:flex-col">
      <nav className="flex justify-between p-1">
        <Button onClick={() => window.history.back()}>&#128072;</Button>
        {actionBtnProps && (
          <Button {...actionBtnProps}>{actionBtnLabel}</Button>
        )}
        <Button linkTo="/"> &#129312;</Button>
      </nav>
      <div className="h-full w-full">{children}</div>
    </main>
  )
}
