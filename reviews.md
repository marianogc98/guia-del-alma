# Cómo implementar el bloque de Reviews (Airbnb + Google)

Este documento describe cómo está implementada la sección de reseñas en The Authentic Tango: puntuaciones globales por plataforma y un carousel de reseñas mezcladas (Airbnb + Google) ordenadas por fecha, con diseño responsive.

---

## 1. Qué hace el bloque

- **Scores destacados**: Dos tarjetas (Airbnb y Google) con logo, estrella, puntuación (ej. 4.9 / 5.0) y texto tipo "140+ reseñas". Una de ellas puede ser un enlace (ej. al listing de Airbnb).
- **Carousel de reseñas**: Un único slider que muestra reseñas de ambas plataformas mezcladas, ordenadas de más nueva a más antigua. Cada tarjeta incluye:
  - Icono de cita, logo de plataforma (Airbnb o Google)
  - Estrellas (1–5), fecha, mensaje, nombre
- **Responsive**:
  - Móvil: 1 reseña visible.
  - Tablet (`md`): 2 reseñas.
  - Desktop (`lg`): 3 reseñas.

---

## 2. Estructura de datos

Las reseñas y los scores viven en los archivos de mensajes (i18n). En otra web puedes usar el mismo formato en JSON/JS.

### Formato por plataforma

Cada plataforma tiene:

- `score`: puntuación global (string, ej. `"4.9"`, `"5.0"`).
- `total`: texto del total de reseñas (ej. `"140+"`, `"10+"`).
- `reviews`: array de objetos con:
  - `name`: nombre del autor.
  - `date`: texto de fecha (ej. `"January 2026"`, `"December 2025"`). Se usa para ordenar; debe ser parseable (mes + año).
  - `rating`: número de estrellas (1–5).
  - `message`: texto de la reseña.

Ejemplo (inglés):

```json
{
  "reviews": {
    "title": "Reviews",
    "airbnb": {
      "score": "4.9",
      "total": "140+",
      "reviews": [
        {
          "name": "Ana",
          "date": "January 2026",
          "rating": 5,
          "message": "Best experience we participated in Buenos Aires..."
        }
      ]
    },
    "google": {
      "score": "5.0",
      "total": "10+",
      "reviews": [
        {
          "name": "Heidi bech Geschwendtner",
          "date": "January 2026",
          "rating": 5,
          "message": "I had an amazing day with Maria..."
        }
      ]
    }
  }
}
```

En el código, cada ítem del carousel lleva un campo extra `platform: 'airbnb' - 'google'` para mostrar logo y estilos.

---

## 3. Dependencias

- **React** (o Next.js).
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/) vía `embla-carousel-react`.
- **Iconos**:
  - `lucide-react`: `Star`, `Quote` (y opcionalmente flechas del carousel).
  - `react-icons`: `FaAirbnb` (`react-icons/fa`), `SiGoogle` (`react-icons/si`) para los logos.
- **UI**: componente tipo **Card** (titulo/contenido) para las tarjetas de score y de cada reseña. No es obligatorio; se puede sustituir por `div` con las mismas clases.

Instalación aproximada:

```bash
npm install embla-carousel-react react-icons lucide-react
```

Si usas el Carousel de **shadcn/ui**, también necesitas su `Carousel` (que ya usa Embla por dentro) y `Button` para prev/next. En este proyecto el carousel es el de shadcn.

---

## 4. Componentes UI necesarios

### 4.1 Carousel (estilo shadcn/ui)

El carousel se basa en Embla y expone:

- `Carousel`: contenedor con `opts` (align, loop, etc.).
- `CarouselContent`: wrapper con `overflow-hidden` y flex.
- `CarouselItem`: cada slide; se controla el ancho con clases (`basis-full`, `md:basis-1/2`, `lg:basis-1/3`).
- `CarouselPrevious` / `CarouselNext`: botones opcionales.

Estructura mínima:

```tsx
<Carousel opts={{ align: 'start', loop: true }} className="w-full">
  <CarouselContent className="-ml-2 md:-ml-4">
    {items.map((item, i) => (
      <CarouselItem key={i} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
        {/* contenido de la tarjeta */}
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="hidden md:flex -left-12" />
  <CarouselNext className="hidden md:flex -right-12" />
</Carousel>
```

El `-ml-*` y `pl-*` compensan el gap entre ítems; los valores pueden ajustarse a tu diseño.

### 4.2 Card

Cada reseña va en una tarjeta con borde, padding y hover. Ejemplo de estructura:

- `Card` > `CardContent` con:
  - Quote + logo de plataforma (arriba).
  - Estrellas + fecha.
  - Mensaje (flex-1 para que las tarjetas queden igual de altas si usas grid/flex).
  - Nombre (abajo, con borde superior).

Si no usas Card, un `div` con clases equivalentes (border, rounded, padding, shadow) vale igual.

---

## 5. Lógica del componente

### 5.1 Ordenar por fecha

Las fechas vienen como texto `"Month YYYY"` (inglés o español). Para ordenar:

1. Parsear a `Date`: mapa de nombres de mes → número (0–11), split por espacio, construir `new Date(year, month, 1)`.
2. Unir todas las reseñas en un solo array y añadir `platform: 'airbnb' - 'google'`.
3. Ordenar por fecha descendente: `dateB.getTime() - dateA.getTime()`.

Ejemplo de `parseDate` (soporta inglés y español):

```ts
const months: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
  Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11
}
function parseDate(dateString: string): Date {
  const [month, year] = dateString.split(' ')
  return new Date(parseInt(year), months[month] ?? 0, 1)
}
```

### 5.2 Estrellas

Se renderizan 5 estrellas; se rellenan las primeras `rating` con color (ej. `fill-primary text-primary`) y el resto con estilo “vacío” (ej. `fill-transparent text-muted-foreground/30`). Icono: `Star` de lucide-react.

### 5.3 Plataforma

Por cada reseña, según `platform`:

- **Icono**: Airbnb → `FaAirbnb` (color #FF5A5F), Google → `SiGoogle` (color #4285F4).
- **Fondo/borde** de la pastilla del logo: Airbnb `bg-[#FF5A5F]/10 border-[#FF5A5F]/20`, Google `bg-[#4285F4]/10 border-[#4285F4]/20`.

---

## 6. Paso a paso para otra web

1. **Datos**
   - Crea una estructura igual a la de arriba (por ejemplo `reviews.airbnb` y `reviews.google` con `score`, `total`, `reviews[]`).
   - Si no usas i18n, puedes importar un JSON o definir un objeto en el componente.

2. **Instalar dependencias**
   - `embla-carousel-react`, `react-icons`, `lucide-react` (y, si aplica, el Carousel de shadcn/ui).

3. **Carousel y Card**
   - Si usas shadcn: añade los componentes Carousel y Card.
   - Si no: implementa un carousel con Embla y tarjetas con `div` + Tailwind (o tu sistema de estilos).

4. **Componente Reviews**
   - Obtener `airbnbData` y `googleData` (desde i18n, props o JSON).
   - Construir `allReviews`: merge de `airbnbData.reviews` y `googleData.reviews` añadiendo `platform`, luego ordenar por `parseDate(review.date)` descendente.
   - Renderizar:
     - Título de la sección.
     - Bloque de scores: dos tarjetas (logo, estrella, score, total); una puede ser `<a>` al listing de Airbnb.
     - Carousel: `allReviews.map` → `CarouselItem` → Card con quote, logo, estrellas, fecha, mensaje, nombre.

5. **Responsive**
   - En `CarouselItem`: `basis-full` (móvil 1), `md:basis-1/2` (2), `lg:basis-1/3` (3).

6. **Accesibilidad**
   - Mantener `role="region"` y `aria-roledescription="carousel"` en el Carousel; cada slide con `role="group"` y `aria-roledescription="slide"` si usas la misma estructura que shadcn.

---

## 7. Sin i18n: datos estáticos en el componente

Puedes definir todo en el mismo archivo:

```ts
const reviewsData = {
  title: 'Reviews',
  airbnb: {
    score: '4.9',
    total: '140+',
    reviews: [
      { name: 'Ana', date: 'January 2026', rating: 5, message: '...' }
    ]
  },
  google: {
    score: '5.0',
    total: '10+',
    reviews: [
      { name: 'Heidi', date: 'January 2026', rating: 5, message: '...' }
    ]
  }
}
```

Luego en el componente usas `reviewsData.airbnb`, `reviewsData.google` y la misma lógica de merge + ordenación + carousel.

---

## 8. Resumen de archivos en este proyecto

| Qué - Dónde |
|-----|--------|
| Traducciones / datos reviews - `messages/en.json`, `messages/es.json` → clave `reviews` |
| Componente Reviews - `components/reviews.tsx` |
| Carousel (Embla + shadcn) - `components/ui/carousel.tsx` |
| Card - `components/ui/card.tsx` |
| Iconos - `lucide-react` (Star, Quote), `react-icons/fa` (FaAirbnb), `react-icons/si` (SiGoogle) |

Con esta estructura y la misma lógica de datos + ordenación + responsive puedes replicar el bloque de reviews en otra web usando React/Next y, si quieres, solo datos estáticos sin i18n.
