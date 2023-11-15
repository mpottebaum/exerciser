import { AddLink } from './add-link'

export type ButtonProps = {
  variant?: 'primary' | 'secondary'
  linkTo?: string
  linkState?: Record<string, string>
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({
  variant = 'primary',
  linkTo,
  linkState,
  children,
  ...buttonProps
}: ButtonProps) {
  return (
    <AddLink to={linkTo} state={linkState}>
      {variant === 'primary' && (
        <button
          {...buttonProps}
          className="rounded border-2 border-black bg-black px-4 py-2 uppercase text-white hover:bg-black/75 active:border-fuchsia-300"
        >
          {children}
        </button>
      )}
      {variant === 'secondary' && (
        <button
          {...buttonProps}
          className="rounded border-2 border-black px-4 py-2 uppercase text-black hover:text-black/75 active:border-fuchsia-300"
        >
          {children}
        </button>
      )}
    </AddLink>
  )
}
