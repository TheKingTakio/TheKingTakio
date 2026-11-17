import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variante = 'principal' | 'secundario' | 'discreto'
const base =
  'inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded-md text-base font-bold transition-colors ' +
  'disabled:opacity-40 disabled:pointer-events-none select-none'
const estilos: Record<Variante, string> = {
  principal: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover',
  secundario: 'bg-surface text-primary border border-border hover:bg-primary-soft',
  discreto: 'text-primary hover:bg-primary-soft px-3',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; ancho?: boolean; children: ReactNode }

export function Button({ variante = 'principal', ancho, className = '', ...rest }: Props) {
  return <button className={`${base} ${estilos[variante]} ${ancho ? 'w-full' : ''} ${className}`} {...rest} />
}

export function ButtonLink({ to, variante = 'principal', ancho, className = '', children }: { to: string; variante?: Variante; ancho?: boolean; className?: string; children: ReactNode }) {
  return <Link to={to} className={`${base} ${estilos[variante]} ${ancho ? 'w-full' : ''} ${className}`}>{children}</Link>
}
