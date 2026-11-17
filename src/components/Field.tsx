import { useId, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { etiqueta: string; ayuda?: string; error?: string }

export function Field({ etiqueta, ayuda, error, className = '', ...rest }: Props) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold">{etiqueta}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error || ayuda ? `${id}-msg` : undefined}
        className={`h-12 px-3 rounded-sm bg-surface border text-base outline-none focus:border-primary ${error ? 'border-error' : 'border-border'}`}
        {...rest}
      />
      {(error || ayuda) && (
        <p id={`${id}-msg`} className={`text-sm ${error ? 'text-error' : 'text-muted'}`}>{error ?? ayuda}</p>
      )}
    </div>
  )
}
