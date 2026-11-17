import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Search, Receipt, User, ClipboardList, Package, Store, Bike, Wallet, LayoutDashboard, MapPinned, BarChart3, Users } from 'lucide-react'
import { AppLayout, type ItemNav } from './layouts/AppLayout'
import { SinConexion } from './components/SinConexion'
import { Cargando } from './components/Estados'

// Cada sección se descarga solo cuando se visita (carga inicial liviana).
const Landing = lazy(() => import('./pages/Landing'))
const InicioCliente = lazy(() => import('./pages/cliente/Inicio'))
const Proximamente = lazy(() => import('./pages/Proximamente'))
const NoEncontrada = lazy(() => import('./pages/NoEncontrada'))

const navCliente: ItemNav[] = [
  { to: '/app', etiqueta: 'Inicio', icono: Home, end: true },
  { to: '/app/buscar', etiqueta: 'Buscar', icono: Search },
  { to: '/app/pedidos', etiqueta: 'Pedidos', icono: Receipt },
  { to: '/app/perfil', etiqueta: 'Perfil', icono: User },
]
const navTienda: ItemNav[] = [
  { to: '/tienda', etiqueta: 'Pedidos', icono: ClipboardList, end: true },
  { to: '/tienda/catalogo', etiqueta: 'Catálogo', icono: Package },
  { to: '/tienda/cuentas', etiqueta: 'Cuentas', icono: Wallet },
  { to: '/tienda/negocio', etiqueta: 'Negocio', icono: Store },
]
const navDomi: ItemNav[] = [
  { to: '/domiciliario', etiqueta: 'Pedidos', icono: Bike, end: true },
  { to: '/domiciliario/resumen', etiqueta: 'Mi día', icono: Wallet },
  { to: '/domiciliario/perfil', etiqueta: 'Perfil', icono: User },
]
const navAdmin: ItemNav[] = [
  { to: '/admin', etiqueta: 'Inicio', icono: LayoutDashboard, end: true },
  { to: '/admin/aprobaciones', etiqueta: 'Usuarios', icono: Users },
  { to: '/admin/zonas', etiqueta: 'Zonas', icono: MapPinned },
  { to: '/admin/reportes', etiqueta: 'Reportes', icono: BarChart3 },
]

const Cargador = () => <div className="mx-auto max-w-[560px] p-4"><Cargando /></div>

export default function App() {
  return (
    <BrowserRouter>
      <SinConexion />
      <Suspense fallback={<Cargador />}>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/app" element={<AppLayout nav={navCliente} />}>
            <Route index element={<InicioCliente />} />
            <Route path="buscar" element={<Proximamente titulo="Buscar" etapa={3} />} />
            <Route path="pedidos" element={<Proximamente titulo="Tus pedidos" etapa={3} />} />
            <Route path="perfil" element={<Proximamente titulo="Tu perfil" etapa={2} />} />
          </Route>

          <Route path="/tienda" element={<AppLayout nav={navTienda} titulo="Panel de la tienda" />}>
            <Route index element={<Proximamente titulo="Pedidos de tu tienda" etapa={4} />} />
            <Route path="*" element={<Proximamente titulo="Panel de la tienda" etapa={4} />} />
          </Route>

          <Route path="/domiciliario" element={<AppLayout nav={navDomi} titulo="Domiciliario" />}>
            <Route index element={<Proximamente titulo="Tus domicilios" etapa={5} />} />
            <Route path="*" element={<Proximamente titulo="Domiciliario" etapa={5} />} />
          </Route>

          <Route path="/admin" element={<AppLayout nav={navAdmin} titulo="Administración" />}>
            <Route index element={<Proximamente titulo="Panel del administrador" etapa={6} />} />
            <Route path="*" element={<Proximamente titulo="Administración" etapa={6} />} />
          </Route>

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
