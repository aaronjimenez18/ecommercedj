GDL — Producción, Música y DJ


**Producción:** (https://djgdl.netlify.app)

---

Funcionalidades

- **Catálogo de productos** — Cabinas DJ, escritorios de estudio y accesorios con precios, stock y vista 3D interactiva.
- **Carrito de compras** — Contexto de React con persistencia en `localStorage`.
- **Pagos con Stripe** — Checkout Session + Webhook para confirmación y correos automáticos.
- **Blog** — CRUD completo con slugs, contenido sanitizado y meta tags.
- **Servicios de DJ** — Paquetes "Standard Set" y "Full Experience" con formulario de reservación.
- **Panel de administración** — Gestión de productos, pedidos, servicios, blog y clientes.
- **Notificaciones por correo** — Confirmaciones de pedido y actualizaciones vía Resend.
- **3D interactivo** — Visualizador de productos en 3D con `@react-three/fiber` y modelo glTF.
- **SEO** — Sitemap dinámico, JSON-LD, Open Graph y Twitter Cards.
- **Analytics** — Google Analytics.
- **Diseño responsivo** — Animaciones con GSAP, scroll suave con Lenis, tipografía Cormorant Garamond.

---

Tecnologías

| Categoría            | Tecnología                                                  |
| -------------------- | ----------------------------------------------------------- |
| Framework            | Next.js 16 (App Router)                                     |
| Lenguaje             | TypeScript                                                  |
| UI Library           | React 19                                                    |
| Estilos              | CSS puro                                                    |
| Base de datos        | PostgreSQL (Supabase) + Prisma ORM                          |
| Autenticación        | Supabase SSR                                                |
| Pagos                | Stripe                                                      |
| Correos              | Resend                                                      |
| 3D                   | Three.js / @react-three/fiber / @react-three/drei           |
| Animaciones          | GSAP + Lenis                                                |
| Linter               | ESLint (flat config)                                        |


Requisitos

- Node.js 20+
- npm, pnpm, yarn o bun
- Cuenta en Supabase (base de datos + auth)
- Cuenta en Stripe
- API key de Resend

Variables de entorno

Crear un archivo `.env` en la raíz con las siguientes variables:

```env
# Base de datos (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend (correos)
RESEND_API_KEY="re_..."
FROM_EMAIL="tucorreo@ejemplo.com"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

 Instalación

```bash
npm install                  # Instala dependencias 
npm run dev                  # Servidor de desarrollo → http://localhost:3000
```

### Scripts disponibles

| Script             | Comando                | Descripción                              |
| ------------------ | ---------------------- | ---------------------------------------- |
| `dev`              | `next dev`             | Servidor de desarrollo                   |
| `build`            | `next build`           | Build de producción                      |
| `start`            | `next start`           | Servidor de producción                   |
| `lint`             | `eslint`               | Analiza el código                        |
| `prisma:generate`  | `prisma generate`      | Genera el cliente de Prisma              |
| `prisma:push`      | `prisma db push`       | Sincroniza el schema con la BD           |
| `prisma:seed`      | `prisma db seed`       | Pobla la BD con datos de ejemplo         |
| `db:setup`         | `prisma db push && seed` | Setup completo de base de datos        |

---

Estructura del proyecto

```
src/
├── app/                # Páginas (App Router)
│   ├── admin/          # Panel de administración
│   ├── api/            # Rutas API
│   ├── blog/           # Blog público
│   ├── pago/           # Páginas de éxito/cancelación de pago
│   └── productos/      # Detalle de productos
├── components/         # Componentes React
│   ├── layout/         # Header, Footer, Cart provider, WhatsApp float
│   ├── modals/         # Booking modal, Carrito drawer
│   ├── sections/       # Secciones del homepage
│   └── ui/             # Componentes reutilizables
├── hooks/              # Custom hooks
├── lib/                # Lógica de negocio
│   ├── db/             # Cliente y helpers de Prisma
│   ├── store/          # Contexto del carrito
│   ├── stripe/         # Cliente/servidor de Stripe
│   └── supabase/       # Cliente/servidor de Supabase
└── types/              # Tipos de TypeScript
```

---

API

| Ruta                          | Métodos                           | Auth | Descripción                  |
| ----------------------------- | --------------------------------- | ---- | ----------------------------- |
| `/api/auth/login`             | POST                              | ❌   | Inicio de sesión              |
| `/api/auth/logout`            | POST                              | ❌   | Cierre de sesión              |
| `/api/auth/me`                | GET                               | ❌   | Usuario actual                |
| `/api/products`               | GET, POST                         | ◎   | Listar / Crear producto       |
| `/api/products/[id]`          | GET, PUT, DELETE                  | ◎   | CRUD de producto              |
| `/api/orders`                 | GET                               | ✅   | Listar pedidos                |
| `/api/orders/[id]`            | PUT                               | ✅   | Actualizar pedido             |
| `/api/orders/stats`           | GET                               | ✅   | Estadísticas de ventas        |
| `/api/blog`                   | GET, POST                         | ◎   | Listar / Crear artículo       |
| `/api/blog/[id]`              | GET, PUT, DELETE                  | ◎   | CRUD de artículo              |
| `/api/services`               | GET, POST                         | ◎   | Listar / Crear servicio       |
| `/api/services/[id]`          | GET, PUT, DELETE                  | ◎   | CRUD de servicio              |
| `/api/bookings`               | POST                              | ❌   | Crear reservación             |
| `/api/customers`              | GET                               | ✅   | Listar clientes               |
| `/api/customers/[email]`      | GET                               | ✅   | Detalle de cliente            |
| `/api/upload`                 | POST                              | ✅   | Subir imagen                  |
| `/api/stripe/checkout`        | POST                              | ❌   | Crear sesión de pago          |
| `/api/stripe/webhook`         | POST                              | ❌   | Webhook de Stripe             |

