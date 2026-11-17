# DESIGN.md — La Ñapa

Domicilios de barrio en Soacha. La app debe sentirse **cercana, alegre y confiable**: como el vecino que te trae el pedido y te regala la ñapa. No debe parecerse a Rappi (naranja) ni a DiDi Food (naranja): La Ñapa es **verde y amarilla**.

Público: vecinos de El Danubio, Hogares Soacha, Prado Vega y Ciudad Verde, casi todos desde el celular, muchos con datos limitados y celulares Android de gama media.

## 1. Color

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--color-primary` | `#0F6B47` | `#3CC48A` | Botones principales, enlaces, pestaña activa |
| `--color-primary-hover` | `#0B5539` | `#5FD4A2` | Hover y presionado del botón principal |
| `--color-primary-soft` | `#E3F3EB` | `#12362A` | Fondos de chips activos y avisos verdes |
| `--color-accent` | `#FBC13A` | `#FBC13A` | Solo para la "ñapa": promociones, insignias, la estrella. Texto encima siempre `#1C1917` |
| `--color-bg` | `#FFFBF2` | `#141210` | Fondo de la app (crema cálido, no blanco puro) |
| `--color-surface` | `#FFFFFF` | `#1E1B18` | Tarjetas, hojas inferiores, modales |
| `--color-border` | `#E8E1D5` | `#2E2A26` | Bordes y separadores |
| `--color-text` | `#1C1917` | `#F5F1EA` | Texto principal |
| `--color-text-muted` | `#6B645C` | `#A8A29E` | Texto secundario, ayudas, fechas |
| `--color-success` | `#15803D` | `#4ADE80` | Pedido entregado, pago confirmado |
| `--color-warning` | `#B45309` | `#FBBF24` | Pedido demorado, tienda por cerrar |
| `--color-error` | `#B42318` | `#F87171` | Errores, pedido cancelado |

Contraste revisado: blanco sobre `--color-primary` 6,5:1; texto sobre `--color-bg` 16,9:1; texto secundario 5,6:1; texto oscuro sobre amarillo 10,6:1.

Reglas: un solo color de acción (el verde). El amarillo nunca es botón principal. Sin degradados morados, sin vidrio esmerilado, sin texto con degradado.

## 2. Tipografía

- **Títulos:** `Baloo 2` (600 y 700). Redondeada y amable, combina con el logo pixelado.
- **Texto e interfaz:** `Nunito Sans` (400, 600, 700).
- Ambas de Google Fonts, con `font-display: swap` y solo los pesos usados (pesa poco con datos móviles).

| Token | Tamaño / interlineado | Uso |
|---|---|---|
| `--text-xs` | 12 / 16 | Insignias, etiquetas pequeñas |
| `--text-sm` | 14 / 20 | Texto secundario, ayudas de formulario |
| `--text-base` | 16 / 24 | Texto normal (nunca menos de 16 en campos, para que iPhone no haga zoom) |
| `--text-lg` | 18 / 26 | Nombre de producto, precios |
| `--text-xl` | 22 / 28 | Títulos de sección |
| `--text-2xl` | 28 / 34 | Título de pantalla |
| `--text-3xl` | 36 / 42 | Título de la landing |

Precios siempre en pesos colombianos con punto de miles: `$12.000`.

## 3. Espaciado y diseño

- Escala base 4: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`.
- Margen lateral de pantalla en celular: 16. Separación entre secciones: 32.
- Ancho máximo del contenido en computador: 1080 (landing) y 560 (app, centrada).
- Diseño pensado primero para pantallas de 360 px de ancho.
- Zonas táctiles de mínimo 44 × 44 px.

## 4. Forma y profundidad

- Radios: `--radius-sm 8` (chips, campos), `--radius-md 12` (botones), `--radius-lg 16` (tarjetas), `--radius-full 999` (avatares, insignias).
- Sombras (solo dos):
  - `--shadow-1: 0 1px 2px rgba(28,25,23,.06), 0 2px 8px rgba(28,25,23,.06)`: tarjetas.
  - `--shadow-2: 0 8px 24px rgba(28,25,23,.12)`: hojas inferiores y carrito flotante.

## 5. Componentes

- **Botón principal:** fondo verde, texto blanco 16/700, alto 48, radio 12. Hover más oscuro, foco con anillo de 3 px `--color-primary` al 40 %, deshabilitado al 40 % de opacidad.
- **Botón secundario:** fondo `--color-surface`, borde `--color-border`, texto verde.
- **Botón discreto:** solo texto verde, sin fondo.
- **Barra del carrito:** fija abajo, verde, muestra "Ver pedido · 3 productos · $34.000".
- **Tarjeta de tienda:** foto o inicial, nombre, categoría, tiempo estimado, costo del domicilio y estado (Abierta / Cerrada).
- **Tarjeta de producto:** nombre, descripción corta de 2 líneas, precio, botón redondo "+".
- **Chips de filtro:** zona y categoría (Comida, Droguería, Tienda, Panadería, Licores).
- **Estado del pedido:** línea de tiempo vertical (Recibido → Preparando → En camino → Entregado).
- **Navegación inferior** (cliente): Inicio, Buscar, Pedidos, Perfil. Paneles de tienda, repartidor y administrador con su propia navegación.
- **Campos:** alto 48, etiqueta arriba, mensaje de error debajo en rojo.
- **Estados vacíos y de error** con una frase amable y una acción ("Todavía no hay tiendas en tu zona. Avísame cuando lleguen").
- Cada pantalla tiene estado de carga (esqueletos), vacío y error.

## 6. Imágenes e íconos

- Logo: bolsa amarilla pixel art sonriente sobre verde, con la estrella de la ñapa (`logo-512.png`, `logo-192.png`, `logo-32.png`). Escalar siempre con `image-rendering: pixelated`.
- Íconos de interfaz: **Lucide**, trazo 2 px, 20–24 px. Sin emojis como íconos.
- Fotos de productos subidas por las tiendas, comprimidas a WebP, máximo 800 px.
- El estilo pixel art queda solo para el logo, la estrella de la ñapa y las ilustraciones de estados vacíos. El resto de la interfaz es limpio y moderno.

## 7. Tono de voz

Cercano y claro, como un vecino: "¡Tu pedido va en camino!", "Pídelo y te llega la ñapa". Tratar de "tú". Frases cortas. Nunca culpar al usuario en los errores.
