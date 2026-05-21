**!Medidas de Seguridad¡**

Autenticación & Autorización

rotección de APIs
Todas las rutas administrativas y de mutación requieren una sesión válida de Supabase. Un helper reutilizable `authenticate()` (`src/lib/auth-guard.ts`) verifica la sesión del lado del servidor usando `supabase.auth.getUser()` antes de ejecutar cualquier operación. Esto evita accesos no autorizados independientemente de las protecciones del lado del cliente.

**Rutas protegidas:**
| Ruta | Métodos | Motivo |
|---|---|---|
| `/api/products` | POST | Crear productos |
| `/api/products/[id]` | PUT, DELETE | Modificar/eliminar productos |
| `/api/orders` | GET | Ver todos los pedidos (datos personales) |
| `/api/orders/[id]` | PUT | Cambiar estado/rastreo de pedidos |
| `/api/orders/stats` | GET | Ingresos y ventas |
| `/api/blog` | POST | Crear artículos |
| `/api/blog/[id]` | PUT, DELETE | Modificar/eliminar artículos |
| `/api/services` | POST | Crear servicios |
| `/api/services/[id]` | PUT, DELETE | Modificar/eliminar servicios |
| `/api/bookings` | GET | Ver todas las reservas (datos personales) |
| `/api/customers` | GET | Ver todos los clientes (datos personales) |
| `/api/customers/[email]` | GET | Ver detalle de cliente (datos personales) |
| `/api/upload` | POST | Subir imágenes al almacenamiento |

**Rutas públicas (sin autenticación):**
- `GET /api/products`, `GET /api/products/[id]` — catálogo público
- `GET /api/blog`, `GET /api/blog/[id]`, `GET /api/blog?slug=` — blog público
- `GET /api/services`, `GET /api/services/[id]` — listado de servicios
- `POST /api/bookings` — formulario de reserva (con límite de tasa)
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` — flujo de autenticación

Protección CSRF
Los endpoints que modifican datos requieren una cookie de sesión válida. Supabase SSR configura las cookies con `SameSite=Lax` por defecto, lo que previene la falsificación de peticiones entre sitios (CSRF) mientras permite la navegación normal.

Manejo de Sesiones
La autenticación usa Supabase Auth con sesiones basadas en cookies mediante `@supabase/ssr`. Las cookies se configuran con los atributos `httpOnly`, `secure` y `sameSite`. La verificación de la sesión ocurre del lado del servidor en cada petición protegida.



Límite de Tasa (Rate Limiting)

Se implementó un limitador de tasa en memoria (`src/lib/rate-limit.ts`) para prevenir abusos en endpoints públicos:

| Endpoint | Límite | Ventana | Motivo |
|---|---|---|---|
| `POST /api/auth/login` | 10 intentos | 15 minutos por IP | Evitar adivinación de contraseñas por fuerza bruta |
| `POST /api/bookings` | 5 envíos | 1 hora por IP | Prevenir spam en reservas |

El limitador responde con HTTP 429 e incluye la cabecera `Retry-After` cuando se excede el límite.

---

Validación de Entrada & Codificación de Salida

Inyección SQL
Todas las consultas a la base de datos usan **Prisma ORM** con consultas parametrizadas. Los datos del usuario nunca se concatenan en cadenas SQL.

Cross-Site Scripting (XSS)
- **Contenido del blog:** `dangerouslySetInnerHTML` se sanitiza con **DOMPurify** (`src/app/blog/[slug]/blog-client.tsx`), eliminando etiquetas y atributos HTML maliciosos mientras conserva el formato seguro.
- **React JSX:** Todo el texto visible al usuario se renderiza mediante el escape automático de React, que codifica entidades HTML.
- **JSON-LD:** Los scripts de datos estructurados usan `JSON.stringify()`, generando JSON seguro.
- **Correos electrónicos:** Los nombres de producto en correos transaccionales se escapan con HTML mediante la función `escapeHtml()` (`src/lib/email.ts`).

Validación de Subida de Archivos
El endpoint de subida de imágenes (`/api/upload`) valida:
- **Tipo de archivo:** Solo se aceptan JPEG, PNG, WebP, GIF y AVIF.
- **Tamaño:** Máximo 5 MB por archivo.
- **Autenticación:** Requiere una sesión de administrador válida.

---

Seguridad en Pagos

Integración con Stripe
- **Checkout Sessions** (página de pago alojada por Stripe) — no se manejan tarjetas directamente, lo que reduce el alcance PCI DSS.
- **Verificación de firmas en webhooks:** Cada evento de webhook se verifica con `stripe.webhooks.constructEvent()` usando el secreto de firma configurado (`whsec_...`). Esto asegura que el payload fue enviado por Stripe y no ha sido alterado.
- **Versión de API fija:** La versión de la API de Stripe está explícitamente configurada (`2026-04-22.dahlia`) para evitar cambios inesperados.
- **Llaves secretas** están en variables de entorno, nunca en código fuente ni en bundles del cliente. Las llaves secretas nunca usan el prefijo `NEXT_PUBLIC_`.

Eventos de Webhook Gestionados
| Evento | Acción |
|---|---|
| `checkout.session.completed` | Crear pedido en base de datos + enviar correo de confirmación |
| `payment_intent.succeeded` | Creación idempotente de pedido |
| `checkout.session.expired` | Registro para monitoreo |

---

Gestión de Secretos

Variables de Entorno
- `.env` está excluido del control de versiones (`*.env*` en `.gitignore`).
- Los valores secretos (URLs de base de datos, llaves de API, llaves de Stripe) nunca usan el prefijo `NEXT_PUBLIC_`, evitando su exposición al cliente.
- Solo los valores verdaderamente públicos usan `NEXT_PUBLIC_`: URL de Supabase, anon key, llave publicable de Stripe, e ID de Google Analytics.

Cabeceras de Seguridad

Todas las respuestas incluyen las siguientes cabeceras, configuradas en `next.config.ts`:

| Cabecera | Valor | Propósito |
|---|---|---|
| `Content-Security-Policy` | Restringe fuentes de scripts, estilos, imágenes, conexiones, frames y fuentes | Prevenir XSS, inyección de datos y carga de recursos no autorizados |
| `X-Frame-Options` | `DENY` | Prevenir clickjacking bloqueando la inclusión en iframes |
| `X-Content-Type-Options` | `nosniff` | Prevenir la detección automática del tipo MIME |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controlar la filtración de información del referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restringir el acceso a funciones del navegador |


`'unsafe-inline'` es necesario para la hidratación de Next.js y `'unsafe-eval'` para las librerías de animación GSAP/Three.js. Los orígenes externos están explícitamente permitidos.

---

Manejo de Errores

- **Endpoint de reservas:** Responde con `"Error al crear la reserva"` genérico sin filtrar detalles internos.
- **Endpoint de autenticación:** Los mensajes de error de Supabase se devuelven tal cual (controlados por Supabase), lo que no filtra más allá de si las credenciales son válidas.
- **Rutas API:** Las operaciones de base de datos se envuelven en bloques try/catch, devolviendo mensajes de error genéricos al cliente mientras registran los detalles en el servidor.

---

Las tablas de la base de datos se acceden exclusivamente a través de **Prisma** con conexión directa, lo que omite el RLS de Supabase. La capa de autenticación de las APIs proporciona el control de acceso en su lugar.

Prevención de Filtración de Errores
- Los endpoints de productos, servicios, blog, reservas y clientes devuelven mensajes de error sanitizados.
- El manejador de webhooks captura todos los errores, los registra en el servidor y devuelve una respuesta 500 genérica.
- Las rutas de mutación de datos (PUT, POST, DELETE) envuelven consistentemente las operaciones en bloques try/catch.
