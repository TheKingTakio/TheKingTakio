import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Chip } from '../../components/Chip'
import { TarjetaTienda, TarjetaProducto, BarraCarrito, type TiendaResumen } from '../../components/Tarjetas'
import { Cargando } from '../../components/Estados'

// Vista previa de la etapa 1: datos de ejemplo, todavía sin base de datos.
const ZONAS = ['El Danubio', 'Hogares Soacha', 'Prado Vega', 'Ciudad Verde']
const CATEGORIAS = ['Todas', 'Comida', 'Droguería', 'Tienda', 'Panadería', 'Licores']
const TIENDAS: TiendaResumen[] = [
  { id: '1', nombre: 'Panadería La Espiga (DEMO)', categoria: 'Panadería', minutos: '20–30', domicilio: 3000, abierta: true },
  { id: '2', nombre: 'Droguería Su Salud (DEMO)', categoria: 'Droguería', minutos: '25–35', domicilio: 3000, abierta: true },
  { id: '3', nombre: 'Asadero El Gallo (DEMO)', categoria: 'Comida', minutos: '35–45', domicilio: 5000, abierta: false },
]

export default function Inicio() {
  const [zona, setZona] = useState(ZONAS[0])
  const [cat, setCat] = useState('Todas')
  const [carrito, setCarrito] = useState(0)

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl">¿Qué se te antoja hoy?</h1>
        <p className="text-sm text-muted inline-flex items-center gap-1"><MapPin size={16} aria-hidden /> Tu zona</p>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {ZONAS.map((z) => <Chip key={z} activo={z === zona} onClick={() => setZona(z)}>{z}</Chip>)}
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {CATEGORIAS.map((c) => <Chip key={c} activo={c === cat} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Tiendas en {zona}</h2>
        {TIENDAS.filter((t) => cat === 'Todas' || t.categoria === cat).map((t) => <TarjetaTienda key={t.id} t={t} />)}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Así se ve un producto</h2>
        <TarjetaProducto
          p={{ id: 'p1', nombre: 'Pan de queso x6', descripcion: 'Recién horneado, suavecito por dentro y doradito por fuera. Ideal para el café.', precio: 6000, disponible: true }}
          onAgregar={() => setCarrito((n) => n + 1)}
        />
        <TarjetaProducto p={{ id: 'p2', nombre: 'Torta de chocolate', descripcion: 'Porción grande.', precio: 8500, disponible: false }} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Así se ve cuando algo está cargando</h2>
        <Cargando filas={2} />
      </section>

      <BarraCarrito cantidad={carrito} total={carrito * 6000} />
    </div>
  )
}
