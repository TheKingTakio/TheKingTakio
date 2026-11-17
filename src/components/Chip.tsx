import type { ReactNode } from 'react'

export function Chip({ activo, onClick, children }: { activo?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`shrink-0 min-h-11 px-4 rounded-sm text-sm font-semibold border transition-colors ${
        activo ? 'bg-primary-soft border-primary text-primary' : 'bg-surface border-border text-text'
      }`}
    >
      {children}
    </button>
  )
}

export function Insignia({ children, tono = 'acento' }: { children: ReactNode; tono?: 'acento' | 'exito' | 'aviso' | 'error' | 'neutro' }) {
  const t = {
    acento: 'bg-accent text-on-accent',
    exito: 'bg-primary-soft text-success',
    aviso: 'bg-surface border border-border text-warning',
    error: 'bg-surface border border-border text-error',
    neutro: 'bg-bg border border-border text-muted',
  }[tono]
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${t}`}>{children}</span>
}
