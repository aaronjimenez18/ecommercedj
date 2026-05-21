import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y Condiciones de GDL. Información sobre productos, pagos, envíos, devoluciones y uso del sitio para equipamiento DJ y producción musical.',
  alternates: { canonical: '/terminos' },
  openGraph: {
    title: 'Términos y Condiciones | GDL',
    description:
      'Términos y Condiciones de GDL para la compra de equipamiento DJ, servicios de producción musical y eventos.',
  },
}

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <a href="/" className="legal-back">← Volver al inicio</a>
      <h1>Términos y Condiciones</h1>

      <h2>1. Información General</h2>
      <p>
        El presente documento establece los Términos y Condiciones bajo los cuales GDL
        (en adelante &laquo;GDL&raquo;, &laquo;nosotros&raquo; o &laquo;la Empresa&raquo;)
        pone a disposición de los usuarios (&laquo;Usuario&raquo; o &laquo;Cliente&raquo;)
        los productos y servicios ofrecidos a través del sitio web{' '}
        <strong>djgdl.netlify.app</strong>.
      </p>
      <p>
        GDL es una plataforma integral para DJ y productores musicales con operaciones
        en Querétaro y Guadalajara, México. Nos dedicamos a la fabricación de muebles
        especializados para DJ, servicios de producción musical y curaduría de
        experiencias sonoras.
      </p>
      <p>
        Para cualquier comunicación, puedes contactarnos en:{' '}
        <strong>soporte@gdlprod.mx</strong>
      </p>

      <h2>2. Productos y Servicios</h2>
      <p>
        GDL ofrece:<br />
        (a) Muebles especializados para DJ (cabinas, racks, estaciones de trabajo).<br />
        (b) Servicios de producción musical.<br />
        (c) Organización y curaduría de eventos.<br />
        (d) Contenido editorial a través de nuestro blog.
      </p>
      <p>
        Las características, precios y disponibilidad de los productos se muestran en
        el sitio web y pueden estar sujetos a cambios sin previo aviso. Nos reservamos
        el derecho de descontinuar cualquier producto o servicio en cualquier momento.
      </p>

      <h2>3. Precios y Pagos</h2>
      <p>
        Todos los precios están expresados en pesos mexicanos (MXN) e incluyen los
        impuestos aplicables, salvo que se indique lo contrario. Los precios de envío
        se calculan y muestran antes de finalizar la compra.
      </p>
      <p>
        Los pagos se procesan a través de <strong>Stripe</strong>, una plataforma de
        pagos segura. GDL no almacena ni tiene acceso a los datos completos de tu
        tarjeta bancaria. Al realizar un pago, aceptas los términos de Stripe y
        autorizas el cargo correspondiente.
      </p>
      <p>
        GDL se reserva el derecho de cancelar cualquier pedido en caso de
        sospecha de fraude, error en el precio o falta de disponibilidad del producto.
      </p>

      <h2>4. Envíos y Entregas</h2>
      <p>
        Nuestros muebles se fabrican bajo pedido. Los tiempos de entrega se indican en
        la ficha de cada producto y son aproximados. Trabajamos con servicios de paquetería
        para entregas dentro de la República Mexicana.
      </p>
      <p>
        El riesgo de pérdida o daño de los productos se transfiere al Cliente en el
        momento de la entrega por parte de la paquetería. Te recomendamos inspeccionar
        tu pedido al recibirlo y reportar cualquier anomalía directamente a la
        paquetería y a nosotros.
      </p>

      <h2>5. Devoluciones y Reembolsos</h2>
      <p>
        Dado que nuestros muebles se fabrican bajo pedido y de forma artesanal, no
        aceptamos devoluciones por cambio de opinión. Si tu producto llega dañado o
        presenta defectos de fabricación, contáctanos dentro de los <strong>7 días
        hábiles</strong> posteriores a la entrega a <strong>soporte@gdlprod.mx</strong>
        e incluiremos evidencia fotográfica.
      </p>
      <p>
        Evaluaremos cada caso y, si procede, coordinaremos la reparación o reposición
        del producto sin costo adicional. No aplica para daños causados por mal uso,
        modificaciones no autorizadas o desgaste normal.
      </p>

      <h2>6. Propiedad Intelectual</h2>
      <p>
        Todo el contenido del sitio web, incluyendo pero no limitado a textos, imágenes,
        logotipos, diseños, gráficos, software y código fuente, es propiedad de GDL o
        de sus licenciantes y está protegido por las leyes de propiedad intelectual
        de México y tratados internacionales.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, modificación, exhibición pública
        o cualquier otro uso no autorizado del contenido sin el consentimiento previo
        y por escrito de GDL.
      </p>

      <h2>7. Uso del Sitio</h2>
      <p>
        El Usuario se compromete a utilizar el sitio web de conformidad con la ley,
        la moral, el orden público y los presentes Términos y Condiciones. Queda
        expresamente prohibido:
      </p>
      <ul>
        <li>Realizar actividades fraudulentas o ilícitas.</li>
        <li>Introducir virus, malware o cualquier código dañino.</li>
        <li>Intentar acceder sin autorización a los sistemas de GDL.</li>
        <li>Utilizar robots, spiders u otras herramientas de extracción de datos.</li>
      </ul>

      <h2>8. Limitación de Responsabilidad</h2>
      <p>
        GDL no será responsable por daños indirectos, incidentales o consecuentes
        derivados del uso o la imposibilidad de uso de los productos o servicios,
        incluyendo pérdida de ingresos, datos o interrupciones del negocio.
      </p>
      <p>
        Nuestra responsabilidad máxima en cualquier caso se limitará al monto total
        pagado por el producto o servicio en cuestión.
      </p>

      <h2>9. Ley Aplicable y Jurisdicción</h2>
      <p>
        Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos
        Mexicanos. Para cualquier controversia relacionada con el presente documento,
        las partes se someten a la jurisdicción de los tribunales competentes en
        Querétaro, México, renunciando a cualquier otro fuero que pudiera
        corresponderles.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        GDL se reserva el derecho de modificar estos Términos y Condiciones en
        cualquier momento. Los cambios entrarán en vigor inmediatamente después de
        su publicación en el sitio web. Te recomendamos revisar esta página
        periódicamente.
      </p>

      <p className="legal-date">
        Última actualización: mayo 2026
      </p>
    </main>
  )
}