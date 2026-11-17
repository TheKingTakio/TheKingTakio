import { ButtonLink } from '../components/Button'
import { Vacio } from '../components/Estados'

export default function NoEncontrada() {
  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <Vacio titulo="Esta página no existe" texto="Puede que el enlace esté mal escrito. Volvamos al inicio." accion={<ButtonLink to="/">Ir al inicio</ButtonLink>} />
    </div>
  )
}
