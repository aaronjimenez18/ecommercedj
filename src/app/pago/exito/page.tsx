"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CartProvider, useCart } from "@/lib/store/cart-context";

function ExitoContent() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="payment-page">
      <h1>¡PAGO EXITOSO!</h1>
      <p>
        Gracias por tu compra. Te enviaremos un correo con los detalles de tu
        pedido.
      </p>
      <Link href="/" className="btn btn-accent">
        VOLVER AL INICIO
      </Link>
    </main>
  );
}

export default function ExitoPage() {
  return (
    <CartProvider>
      <ExitoContent />
    </CartProvider>
  );
}
