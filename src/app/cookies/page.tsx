import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Política de Cookies de GDL. Conoce qué cookies utilizamos en nuestro sitio web y cómo gestionarlas.',
  alternates: { canonical: '/cookies' },
  openGraph: {
    title: 'Política de Cookies | GDL',
    description:
      'Política de Cookies de GDL. Información sobre el uso de cookies propias y de terceros en nuestro sitio.',
  },
}

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <a href="/" className="legal-back">← Volver al inicio</a>
      <h1>Política de Cookies</h1>

      <p>
        En GDL, utilizamos cookies y tecnologías similares para garantizar el
        correcto funcionamiento de nuestro sitio web, mejorar tu experiencia de
        navegación y analizar el tráfico. Esta Política de Cookies explica qué
        son las cookies, qué tipos utilizamos, para qué fines y cómo puedes
        gestionarlas.
      </p>

      <h2>1. ¿Qué son las Cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web almacenan
        en tu navegador cuando los visitas. Permiten que el sitio recuerde tus
        preferencias, acciones y navegación durante un período de tiempo, para
        que no tengas que volver a introducirlas cada vez que nos visites.
      </p>

      <h2>2. Tipos de Cookies que Utilizamos</h2>

      <h3>2.1. Cookies Técnicas o Esenciales</h3>
      <p>
        Son necesarias para el funcionamiento básico del sitio web. Permiten la
        navegación, la autenticación de usuarios y la gestión de sesiones. Sin
        estas cookies, el sitio no puede funcionar correctamente. Se incluyen
        aquí las cookies utilizadas por <strong>Supabase</strong> para la
        autenticación y gestión de la sesión del usuario.
      </p>

      <h3>2.2. Cookies Analíticas</h3>
      <p>
        Utilizamos <strong>Google Analytics</strong> para recopilar información
        anónima sobre cómo los visitantes interactúan con el sitio: páginas más
        visitadas, tiempo de permanencia, origen del tráfico, etc. Esto nos ayuda
        a mejorar la calidad y el contenido del sitio. Las cookies utilizadas
        incluyen <code>_ga</code>, <code>_gid</code> y <code>_gat</code>.
      </p>

      <h3>2.3. Cookies de Terceros</h3>
      <p>
        Algunos servicios externos que integramos en nuestro sitio pueden
        establecer sus propias cookies:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> &mdash; cookies necesarias para el procesamiento
          seguro de pagos y prevención de fraude.
        </li>
        <li>
          <strong>YouTube</strong> &mdash; si incrustamos videos, YouTube puede
          establecer cookies para medir visualizaciones y mejorar su servicio.
        </li>
      </ul>

      <h2>3. Base Legal</h2>
      <p>
        Las cookies técnicas están exentas de consentimiento por ser necesarias
        para el funcionamiento del sitio. Para las cookies analíticas y de terceros,
        solicitamos tu consentimiento previo a su instalación, de acuerdo con la
        legislación aplicable en materia de protección de datos y comercio
        electrónico.
      </p>

      <h2>4. Gestión de Cookies</h2>
      <p>
        Puedes configurar, bloquear o eliminar las cookies en cualquier momento
        a través de la configuración de tu navegador. A continuación, te
        proporcionamos enlaces a las guías de los navegadores más comunes:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
            Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Ten en cuenta que si deshabilitas las cookies técnicas, algunas partes
        del sitio podrían no funcionar correctamente.
      </p>

      <h2>5. Cookies de Redes Sociales</h2>
      <p>
        Nuestro sitio incluye enlaces a nuestras páginas en Instagram, YouTube y
        TikTok. Estas redes sociales pueden establecer cookies cuando interactúas
        con sus funcionalidades. No tenemos control sobre estas cookies; te
        recomendamos revisar las políticas de cookies de cada plataforma.
      </p>

      <h2>6. Actualizaciones</h2>
      <p>
        Podemos actualizar esta Política de Cookies en cualquier momento. Te
        notificaremos cualquier cambio publicando la nueva versión en esta página.
        Te recomendamos revisarla periódicamente.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Si tienes preguntas sobre nuestra Política de Cookies, contáctanos en:{' '}
        <strong>soporte@gdlprod.mx</strong>
      </p>

      <p className="legal-date">
        Última actualización: mayo 2026
      </p>
    </main>
  )
}
