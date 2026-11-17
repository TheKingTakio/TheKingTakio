import { ShoppingBag } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Logo } from '../components/Logo'
import { useInstalar } from '../components/InstalarPWA'

// Landing provisional. La versión completa se diseña en la etapa 7.
export default function Landing() {
  const { puedeAndroid, instalar } = useInstalar()
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="mx-auto w-full max-w-[1080px] h-16 px-4 flex items-center justify-between">
        <Logo size={36} />
        <ButtonLink to="/app" variante="discreto">Entrar</ButtonLink>
      </header>
      <main className="flex-1 mx-auto w-full max-w-[1080px] px-4 py-8 flex flex-col items-center text-center gap-6">
        <img src="/icons/logo-512.png" alt="" width={160} height={160} className="pixelated rounded-lg shadow-1" />
        <h1 className="text-3xl max-w-md">Lo de tu barrio, a tu puerta</h1>
        <p className="text-muted max-w-sm">Pide a las tiendas de El Danubio, Hogares Soacha, Prado Vega y Ciudad Verde. Pídelo y te llega la ñapa.</p>
        <ButtonLink to="/app" className="w-full max-w-xs"><ShoppingBag size={20} /> Pedir ahora</ButtonLink>
        {puedeAndroid && <button onClick={instalar} className="text-primary font-bold min-h-11">Instalar La Ñapa en tu celular</button>}
        <p className="text-sm text-muted max-w-sm">La Ñapa conecta a vecinos, tiendas y domiciliarios; los pagos se hacen directamente entre ellos.</p>
      </main>
    </div>
  )
}
