export type InputProps = {
  label?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function Input({ label, name, ...inputProps }: InputProps) {
  return (
    <>
      {label && (
        <div className="flex w-full flex-col items-start">
          <label className="uppercase" htmlFor={name}>
            {label}
          </label>
          <input className="w-full" name={name} {...inputProps} />
        </div>
      )}
      {!label && <input name={name} {...inputProps} />}
    </>
  )
}
