import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { InstalarPWA } from '../components/InstalarPWA'

export type ItemNav = { to: string; etiqueta: string; icono: LucideIcon; end?: boolean }

export function AppLayout({ nav, titulo, extraHeader }: { nav: ItemNav[]; titulo?: string; extraHeader?: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-30 bg-bg border-b border-border">
        <div className="mx-auto max-w-[560px] h-14 px-4 flex items-center justify-between gap-3">
          <Link to="/" aria-label="Ir al inicio de La Ñapa"><Logo size={32} /></Link>
          {titulo && <span className="text-sm font-semibold text-muted truncate">{titulo}</span>}
          {extraHeader}
        </div>
      </header>

      <main className="flex-1 w-full mx-auto max-w-[560px] px-4 pt-4 pb-28">
        <Outlet />
      </main>

      <InstalarPWA />

      <nav aria-label="Navegación principal" className="fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-border pb-safe">
        <ul className="mx-auto max-w-[560px] grid" style={{ gridTemplateColumns: `repeat(${nav.length}, 1fr)` }}>
          {nav.map(({ to, etiqueta, icono: Icono, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 h-16 text-xs font-semibold ${isActive ? 'text-primary' : 'text-muted'}`
                }
              >
                <Icono size={24} strokeWidth={2} aria-hidden />
                {etiqueta}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
