import { Clock, Bike, Plus, ShoppingBag } from 'lucide-react'
import { cop } from '../lib/formato'
import { Insignia } from './Chip'

export type TiendaResumen = {
  id: string; nombre: string; categoria: string; fotoUrl?: string | null
  minutos: string; domicilio: number; abierta: boolean
}

export function TarjetaTienda({ t, onClick }: { t: TiendaResumen; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full text-left flex gap-3 p-3 bg-surface rounded-lg shadow-1 active:scale-[.99] transition-transform">
      {t.fotoUrl ? (
        <img src={t.fotoUrl} alt="" width={64} height={64} loading="lazy" className="w-16 h-16 rounded-md object-cover shrink-0" />
      ) : (
        <span aria-hidden className="w-16 h-16 rounded-md shrink-0 grid place-items-center bg-primary-soft text-primary font-title text-2xl">
          {t.nombre.charAt(0)}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-bold text-base truncate">{t.nombre}</h3>
          {t.abierta ? <Insignia tono="exito">Abierta</Insignia> : <Insignia tono="neutro">Cerrada</Insignia>}
        </div>
        <p className="text-sm text-muted">{t.categoria}</p>
        <p className="text-sm text-muted flex items-center gap-3 mt-1">
          <span className="inline-flex items-center gap-1"><Clock size={16} aria-hidden />{t.minutos} min</span>
          <span className="inline-flex items-center gap-1"><Bike size={16} aria-hidden />{cop(t.domicilio)}</span>
        </p>
      </div>
    </button>
  )
}

export type ProductoResumen = { id: string; nombre: string; descripcion: string; precio: number; fotoUrl?: string | null; disponible: boolean }

export function TarjetaProducto({ p, onAgregar }: { p: ProductoResumen; onAgregar?: () => void }) {
  return (
    <div className="flex gap-3 p-3 bg-surface rounded-lg shadow-1">
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-bold text-lg">{p.nombre}</h3>
        <p className="text-sm text-muted line-clamp-2">{p.descripcion}</p>
        <p className="text-lg font-bold mt-1">{cop(p.precio)}</p>
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        {p.fotoUrl && <img src={p.fotoUrl} alt="" width={72} height={72} loading="lazy" className="w-18 h-18 rounded-md object-cover" />}
        {p.disponible ? (
          <button onClick={onAgregar} aria-label={`Agregar ${p.nombre}`} className="w-11 h-11 rounded-full bg-primary text-on-primary grid place-items-center hover:bg-primary-hover">
            <Plus size={22} strokeWidth={2.5} />
          </button>
        ) : (
          <span className="text-xs font-bold text-muted">Agotado</span>
        )}
      </div>
    </div>
  )
}

export function BarraCarrito({ cantidad, total, onClick }: { cantidad: number; total: number; onClick?: () => void }) {
  if (cantidad === 0) return null
  return (
    <div className="fixed inset-x-0 bottom-16 z-30 px-4 pb-3 pb-safe">
      <button onClick={onClick} className="mx-auto max-w-[528px] w-full min-h-14 px-4 rounded-md bg-primary text-on-primary shadow-2 flex items-center justify-between font-bold">
        <span className="inline-flex items-center gap-2"><ShoppingBag size={20} aria-hidden /> Ver pedido</span>
        <span>{cantidad} {cantidad === 1 ? 'producto' : 'productos'} · {cop(total)}</span>
      </button>
    </div>
  )
}
