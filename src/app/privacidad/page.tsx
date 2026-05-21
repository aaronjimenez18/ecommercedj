import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description:
    'Aviso de Privacidad de GDL. Conoce cómo recopilamos, usamos y protegemos tus datos personales conforme a la LFPDPPP mexicana.',
  alternates: { canonical: '/privacidad' },
  openGraph: {
    title: 'Aviso de Privacidad | GDL',
    description:
      'Aviso de Privacidad de GDL. Protegemos tus datos personales de acuerdo con la legislación mexicana.',
  },
}

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <a href="/" className="legal-back">← Volver al inicio</a>
      <h1>Aviso de Privacidad</h1>

      <p>
        En GDL, nos tomamos muy en serio la protección de tus datos personales.
        Este Aviso de Privacidad describe cómo recopilamos, utilizamos, almacenamos
        y protegemos tu información personal, en cumplimiento con la Ley Federal de
        Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y
        su Reglamento.
      </p>

      <h2>1. Identidad y Domicilio del Responsable</h2>
      <p>
        <strong>Responsable:</strong> GDL<br />
        <strong>Correo electrónico:</strong> soporte@gdlprod.mx<br />
        <strong>Ubicación:</strong> Querétaro y Guadalajara, México
      </p>

      <h2>2. Datos Personales que Recopilamos</h2>
      <p>Podemos recopilar las siguientes categorías de datos personales:</p>
      <ul>
        <li>
          <strong>Datos de identificación:</strong> nombre completo, correo
          electrónico, teléfono, dirección de envío.
        </li>
        <li>
          <strong>Datos de pago:</strong> información necesaria para procesar
          pagos a través de Stripe. GDL no almacena números de tarjeta bancaria,
          CVV ni códigos de seguridad.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de navegador,
          páginas visitadas, tiempo de sesión y preferencias del sitio, recopilados
          a través de Google Analytics y tecnologías similares.
        </li>
        <li>
          <strong>Datos de comunicación:</strong> mensajes que nos envías a través
          de formularios de contacto, WhatsApp o correo electrónico.
        </li>
      </ul>

      <h2>3. Finalidades del Tratamiento</h2>
      <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
      <p><strong>Finalidades necesarias:</strong></p>
      <ul>
        <li>Procesar y dar seguimiento a tus pedidos y pagos.</li>
        <li>Coordinar la fabricación y entrega de productos.</li>
        <li>Brindar servicios de producción musical y eventos contratados.</li>
        <li>Enviar comunicaciones relacionadas con tu compra o servicio.</li>
        <li>Atender solicitudes de información, quejas o aclaraciones.</li>
        <li>Cumplir con obligaciones legales y fiscales.</li>
      </ul>
      <p><strong>Finalidades adicionales (no necesarias):</strong></p>
      <ul>
        <li>Enviar comunicaciones promocionales y boletines informativos.</li>
        <li>Realizar análisis de comportamiento y tendencias de navegación.</li>
        <li>Mejorar nuestros productos y servicios.</li>
      </ul>
      <p>
        Puedes oponerte al tratamiento de tus datos para las finalidades adicionales
        contactándonos en cualquier momento.
      </p>

      <h2>4. Transferencias de Datos</h2>
      <p>
        Podemos compartir tus datos personales con los siguientes terceros para los
        fines indicados:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> &mdash; procesamiento de pagos. Stripe puede
          transferir datos a Estados Unidos y otros países bajo estándares de
          seguridad equivalentes.
        </li>
        <li>
          <strong>Google Analytics</strong> &mdash; análisis de navegación y
          comportamiento en el sitio.
        </li>
        <li>
          <strong>SendGrid</strong> &mdash; envío de correos electrónicos
          transaccionales y promocionales.
        </li>
        <li>
          <strong>Supabase</strong> &mdash; almacenamiento y gestión de datos
          de la plataforma.
        </li>
        <li>
          <strong>Autoridades competentes</strong> &mdash; cuando sea requerido
          por ley o por orden judicial.
        </li>
      </ul>

      <h2>5. Derechos ARCO</h2>
      <p>
        Tienes derecho a <strong>Acceder</strong>, <strong>Rectificar</strong>,
        <strong>Cancelar</strong> u <strong>Oponerte</strong> (derechos ARCO) al
        tratamiento de tus datos personales. Para ejercer estos derechos, envía
        una solicitud a <strong>soporte@gdlprod.mx</strong> indicando:
      </p>
      <ul>
        <li>Tu nombre completo y correo electrónico.</li>
        <li>El derecho que deseas ejercer.</li>
        <li>Una descripción clara de los datos sobre los que recae la solicitud.</li>
        <li>Documento que acredite tu identidad.</li>
      </ul>
      <p>
        Te responderemos en un plazo máximo de 20 días hábiles. Si la solicitud es
        procedente, se hará efectiva en un plazo de 15 días hábiles adicionales.
      </p>

      <h2>6. Cookies y Tecnologías Similares</h2>
      <p>
        Utilizamos cookies propias y de terceros para el funcionamiento del sitio,
        analizar el tráfico y mejorar tu experiencia. Para más información, consulta
        nuestra{' '}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>7. Seguridad de la Información</h2>
      <p>
        Implementamos medidas de seguridad administrativas, técnicas y físicas para
        proteger tus datos personales contra daño, pérdida, alteración, destrucción
        o uso no autorizado. Sin embargo, ningún sistema de transmisión o
        almacenamiento electrónico es 100% seguro.
      </p>

      <h2>8. Cambios al Aviso de Privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar este Aviso de Privacidad en cualquier
        tiempo. Las modificaciones entrarán en vigor una vez publicadas en el sitio
        web. Te recomendamos revisar esta página periódicamente.
      </p>

      <h2>9. Consentimiento</h2>
      <p>
        Al proporcionar tus datos personales y utilizar nuestro sitio web, manifestamos
        tu consentimiento para el tratamiento de tus datos conforme a este Aviso de
        Privacidad.
      </p>

      <p className="legal-date">
        Última actualización: mayo 2026
      </p>
    </main>
  )
}