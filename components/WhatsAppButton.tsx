type Props = {
  phone: string
  text?: string
  children?: React.ReactNode
}

export default function WhatsAppButton({ phone, text, children }: Props) {
  const msg = encodeURIComponent(text ?? 'Hola, quiero más información.')
  const href = `https://wa.me/${phone}?text=${msg}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-border-default px-3 py-2 hover:bg-bg-muted"
    >
      {children ?? 'Contactar por WhatsApp'}
    </a>
  )
}
