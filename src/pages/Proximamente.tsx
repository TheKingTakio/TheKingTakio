import { Vacio } from '../components/Estados'

export default function Proximamente({ titulo, etapa }: { titulo: string; etapa: number }) {
  return <Vacio titulo={titulo} texto={`Esta pantalla la construimos en la etapa ${etapa}.`} />
}
