import Link from 'next/link'

export default function CanceladoPage() {
  return (
    <main className="payment-page">
      <h1>PAGO CANCELADO</h1>
      <p>
        Tu pago no se procesó, intentalo nuevamente.
      </p>
      <Link href="/" className="btn btn-accent">
        VOLVER AL INICIO
      </Link>
    </main>
  )
}
