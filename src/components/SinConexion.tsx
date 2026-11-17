import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'

export function SinConexion() {
  const [offline, setOffline] = useState(!navigator.onLine)
  useEffect(() => {
    const on = () => setOffline(false), off = () => setOffline(true)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  if (!offline) return null
  return (
    <div role="status" className="sticky top-0 z-50 bg-text text-bg text-sm px-4 py-2 flex items-center justify-center gap-2">
      <WifiOff size={16} /> Estás sin internet. Cuando vuelva la señal, seguimos.
    </div>
  )
}
