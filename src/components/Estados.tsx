import type { ReactNode } from 'react'
import { Button } from './Button'

export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />
}

export function Cargando({ filas = 3 }: { filas?: number }) {
  return (
    <div role="status" aria-label="Cargando" className="flex flex-col gap-3">
      {Array.from({ length: filas }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 bg-surface rounded-lg shadow-1">
          <Skeleton className="w-16 h-16 shrink-0" />
          <div className="flex-1 flex flex-col gap-2 py-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Vacio({ titulo, texto, accion }: { titulo: string; texto?: string; accion?: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
      <img src="/icons/logo-192.png" alt="" width={72} height={72} className="pixelated rounded-md opacity-90" />
      <h2 className="text-xl">{titulo}</h2>
      {texto && <p className="text-muted max-w-xs">{texto}</p>}
      {accion}
    </div>
  )
}

export function ErrorAmable({ texto = 'No pudimos cargar esto. Revisa tu conexión e intenta otra vez.', onReintentar }: { texto?: string; onReintentar?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center text-center gap-3 py-10 px-4">
      <h2 className="text-xl">Algo no salió bien</h2>
      <p className="text-muted max-w-xs">{texto}</p>
      {onReintentar && <Button variante="secundario" onClick={onReintentar}>Intentar de nuevo</Button>}
    </div>
  )
}
