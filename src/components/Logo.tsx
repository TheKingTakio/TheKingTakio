type Props = { size?: number; conTexto?: boolean; className?: string }

export function Logo({ size = 40, conTexto = true, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={size > 64 ? '/icons/logo-512.png' : '/icons/logo-192.png'}
        width={size}
        height={size}
        alt={conTexto ? '' : 'La Ñapa'}
        className="pixelated rounded-sm"
      />
      {conTexto && <span className="font-title text-xl leading-none text-primary">La Ñapa</span>}
    </span>
  )
}
