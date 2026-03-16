# Guía para crear una web multipágina con las mismas tecnologías

Este documento describe cómo crear **otra web** usando el mismo stack tecnológico que este portfolio, pero con **varias páginas** y **estilo diferente**. Incluye integración de **Umami** para analytics. Pensado para que Cursor (u otro desarrollador) pueda seguir los pasos en un proyecto nuevo.

---

## 1. Stack tecnológico (igual que este proyecto)

| Tecnología - Versión - Uso |
|------------|---------|-----|
| **Next.js** - 16.x - App Router, API Routes, SSR/SSG |
| **React** - 19.x - UI |
| **TypeScript** - 5.x - Tipado |
| **Tailwind CSS** - 4.x - Estilos (PostCSS) |
| **Framer Motion** - 12.x - Animaciones |
| **Lucide React** - última - Iconos |
| **clsx** + **tailwind-merge** - - - Utilidad `cn()` para clases condicionales |
| **Resend** - 6.x - Envío de emails (formulario de contacto) |

### Comandos iniciales en el nuevo proyecto

```bash
npx create-next-app@latest mi-web --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd mi-web
npm install framer-motion lucide-react clsx tailwind-merge resend
```

- **Tailwind 4**: Si create-next-app usa Tailwind 3, migrar a 4 según [docs](https://tailwindcss.com/docs/installation) (PostCSS con `@tailwindcss/postcss` y `@import "tailwindcss"` en CSS).

---

## 2. Estructura de carpetas recomendada (multipágina)

```
app/
├── layout.tsx          # Layout raíz (fuentes, metadata, Umami, estilos globales)
├── globals.css         # Variables CSS, tema, Tailwind
├── page.tsx            # Página principal (/)
├── [otras-paginas]/    # Ej: blog/, servicios/, contacto/
│   └── page.tsx
├── api/
│   └── send-email/
│       └── route.ts   # Si hay formulario de contacto con Resend
├── components/
│   ├── layout/        # Header, Footer, Navigation, etc.
│   ├── ui/            # Botones, formularios, cards reutilizables
│   └── Umami.tsx      # Script de Umami (ver sección 5)
└── lib/
    ├── hooks/         # useContactForm, etc.
    ├── utils/         # cn, validation, etc.
    └── data/          # Datos estáticos si aplica

types/                  # Tipos TypeScript globales
public/                 # Imágenes, favicon, etc.
```

- **Varias páginas**: Crear carpetas bajo `app/` con su `page.tsx` (ej: `app/servicios/page.tsx` → `/servicios`).
- **Navegación**: Usar `<Link href="/ruta">` de `next/link` entre páginas; no depender de scroll a secciones como en un one-page.

---

## 3. Estilo diferente: qué tocar

- **`app/globals.css`**: Cambiar variables (`:root`), colores, fuentes y cualquier clase global. Aquí se define el “look” (claro/oscuro, paleta, tipografía).
- **Fuentes**: En `app/layout.tsx` cambiar las fuentes de Google (o locales) y las variables CSS (`--font-*`).
- **Componentes**: Reutilizar patrones (layout, formularios, botones) pero con las clases y componentes que reflejen el nuevo diseño. No copiar el estilo del portfolio; usar este proyecto solo como referencia de stack y estructura.

---

## 4. Utilidades y patrones a replicar

### 4.1 Utilidad `cn` (clases condicionales con Tailwind)

Archivo: `app/lib/utils/cn.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Usar en todos los componentes que combinen clases condicionales.

### 4.2 Formulario de contacto con Resend

- **API Route**: `app/api/send-email/route.ts`  
  - POST que recibe `{ nombre, email, asunto, mensaje }`, valida, y usa Resend para enviar al email del sitio.  
  - Variables de entorno: `RESEND_API_KEY`, opcional `RESEND_FROM_EMAIL`.
- **Cliente**: Hook `useContactForm` que hace `fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) })` y maneja loading/éxito/error.
- No hace falta EmailJS; solo Resend en el servidor.

### 4.3 Variables de entorno

- **Resend**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (opcional).
- **Umami**: Ver sección 5.

---

## 5. Implementación de Umami

### 5.1 Componente Umami

Crear `app/components/Umami.tsx`:

```tsx
'use client'

import Script from 'next/script'

declare global {
  interface Window {
    umami?: {
      track?: (eventName: string, eventData?: Record<string, unknown>) => void
      trackEvent?: (eventName: string, eventData?: Record<string, unknown>) => void
    }
  }
}

export default function Umami() {
  const handleLoad = () => {
    if (typeof window === 'undefined') return
    setTimeout(() => {
      if (
        window.umami &&
        (typeof window.umami.track === 'function' ||
          typeof window.umami.trackEvent === 'function')
      ) {
        window.dispatchEvent(new Event('umami-ready'))
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Umami cargado y listo')
        }
      } else {
        window.dispatchEvent(new Event('umami-ready'))
      }
    }, 200)
  }

  return (
    <Script
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://umami.example.com/script.js'}
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''}
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  )
}
```

- **URL del script** y **website-id** deben venir de variables de entorno para no hardcodear el dominio/instancia de Umami.

### 5.2 Incluir Umami en el layout

En `app/layout.tsx`, dentro del `<body>`, incluir el componente:

```tsx
import Umami from '@/app/components/Umami'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Umami />
        {children}
      </body>
    </html>
  )
}
```

Así todas las páginas llevan analytics sin repetir código.

### 5.3 Variables de entorno para Umami

En `.env.local` (y en la plataforma de deploy):

```env
# Umami
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://tu-instancia-umami.com/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=tu-website-id
```

- En Umami: crear un sitio, copiar **Website ID** y la URL del script (tu dominio donde está instalado Umami).

### 5.4 Eventos personalizados (opcional)

Donde quieras trackear eventos (ej. clic en CTA, envío de formulario):

```ts
if (typeof window !== 'undefined' && window.umami?.track) {
  window.umami.track('nombre-del-evento', { key: 'value' })
}
```

---

## 6. Checklist para el nuevo proyecto

- [ ] Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [ ] Dependencias: framer-motion, lucide-react, clsx, tailwind-merge, resend.
- [ ] Estructura `app/` con varias rutas (cada ruta con su `page.tsx`).
- [ ] `globals.css` y layout con el **nuevo** estilo (no el del portfolio).
- [ ] Utilidad `cn` en `app/lib/utils/cn.ts`.
- [ ] Si hay contacto: API route `app/api/send-email/route.ts` con Resend y hook en cliente.
- [ ] Umami: componente `Umami.tsx`, incluido en `layout.tsx`, variables `NEXT_PUBLIC_UMAMI_SCRIPT_URL` y `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- [ ] Variables de entorno documentadas (Resend + Umami) y configuradas en deploy.

---

## 7. Resumen para Cursor

Al leer este archivo en **otro** proyecto:

1. Usar el **mismo stack** (Next 16, React 19, Tailwind 4, TypeScript, Framer Motion, Lucide, Resend, clsx, tailwind-merge).
2. Crear una web **multipágina** (varias rutas en `app/*/page.tsx`), con navegación por `<Link>`.
3. Definir un **estilo propio** en `globals.css` y en los componentes (no clonar el estilo de este portfolio).
4. Implementar **Umami** con el componente y variables de entorno indicados.
5. Opcional: formulario de contacto con **Resend** (API route + hook + env).

Con esto, el nuevo proyecto tendrá la misma base tecnológica, múltiples páginas y analytics con Umami.
