import { useEffect, useState } from 'react'
import { Download, Share, SquarePlus, X } from 'lucide-react'
import { Button } from './Button'

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

const CLAVE = 'napa-instalar-cerrado'
const esIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !('MSStream' in window)
const yaInstalada = () =>
  window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true

function leerCerrado() {
  try { return Number(localStorage.getItem(CLAVE) ?? 0) > Date.now() } catch { return false }
}

/** Hook reutilizable: sirve para el aviso flotante y para el enlace de la landing. */
export function useInstalar() {
  const [evento, setEvento] = useState<BIPEvent | null>(null)
  const [instalada, setInstalada] = useState(false)
  useEffect(() => {
    setInstalada(yaInstalada())
    const onBIP = (e: Event) => { e.preventDefault(); setEvento(e as BIPEvent) }
    const onInstalled = () => { setInstalada(true); setEvento(null) }
    window.addEventListener('beforeinstallprompt', onBIP)
    window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('beforeinstallprompt', onBIP); window.removeEventListener('appinstalled', onInstalled) }
  }, [])
  const instalar = async () => {
    if (!evento) return false
    await evento.prompt()
    const { outcome } = await evento.userChoice
    setEvento(null)
    return outcome === 'accepted'
  }
  return { puedeAndroid: !!evento, esIOS: esIOS(), instalada, instalar }
}

export function InstalarPWA() {
  const { puedeAndroid, esIOS: ios, instalada, instalar } = useInstalar()
  const [cerrado, setCerrado] = useState(leerCerrado)

  if (instalada || cerrado || (!puedeAndroid && !ios)) return null

  const cerrar = () => {
    setCerrado(true)
    try { localStorage.setItem(CLAVE, String(Date.now() + 7 * 864e5)) } catch { /* sin almacenamiento */ }
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 px-4 pb-safe" role="dialog" aria-label="Instalar La Ñapa">
      <div className="mx-auto max-w-[528px] bg-surface rounded-lg shadow-2 border border-border p-4 flex gap-3">
        <img src="/icons/logo-192.png" alt="" width={48} height={48} className="pixelated rounded-sm shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-bold">Instalar La Ñapa en tu celular</p>
          {puedeAndroid ? (
            <>
              <p className="text-sm text-muted mb-3">Ábrela como una app, sin ocupar casi espacio.</p>
              <Button onClick={instalar} className="min-h-11"><Download size={20} /> Instalar</Button>
            </>
          ) : (
            <ol className="text-sm text-muted mt-1 flex flex-col gap-1">
              <li className="flex items-center gap-1">1. Toca <Share size={16} aria-label="Compartir" className="text-primary" /> <b className="text-text">Compartir</b> abajo en Safari.</li>
              <li className="flex items-center gap-1">2. Elige <SquarePlus size={16} className="text-primary" /> <b className="text-text">Agregar a inicio</b>.</li>
            </ol>
          )}
        </div>
        <button onClick={cerrar} aria-label="Cerrar aviso" className="w-11 h-11 -m-2 grid place-items-center text-muted rounded-full"><X size={20} /></button>
      </div>
    </div>
  )
}
