// Genera los íconos de la PWA.
// Si existe logo-512.png en la raíz del proyecto (el logo real), se usa ese.
// Si no, dibuja un logo provisional en pixel art (bolsa amarilla sonriente + estrella).
import sharp from 'sharp'
import { existsSync, mkdirSync } from 'node:fs'

const VERDE = '#0F6B47'
const out = 'public/icons'
mkdirSync(out, { recursive: true })

// Mapa de 16×16: G verde, Y amarillo, D amarillo oscuro, K tinta, S estrella, W brillo
const mapa = [
  'GGGGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGSGG',
  'GGGGGKKKKGGGSSSG',
  'GGGGKGGGGKGGGSGG',
  'GGGGKGGGGKGGGGGG',
  'GGKKKKKKKKKKGGGG',
  'GGKYYYYYYYYDKGGG',
  'GGKYWYYYYYYDKGGG',
  'GGKYYKYYYKYDKGGG',
  'GGKYYYYYYYYDKGGG',
  'GGKYKYYYYKYDKGGG',
  'GGKYYKKKKYYDKGGG',
  'GGKYYYYYYYYDKGGG',
  'GGKDDDDDDDDDKGGG',
  'GGGKKKKKKKKKGGGG',
  'GGGGGGGGGGGGGGGG',
]
const colores = { G: VERDE, Y: '#FBC13A', D: '#D99A14', K: '#1C1917', S: '#FBC13A', W: '#FFF3C4' }

function svgProvisional() {
  const rects = mapa.flatMap((fila, y) =>
    [...fila].map((c, x) => `<rect x="${x}" y="${y}" width="1" height="1" fill="${colores[c]}"/>`))
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges">${rects.join('')}</svg>`)
}

const base = existsSync('logo-512.png')
  ? sharp('logo-512.png')
  : sharp(svgProvisional()).resize(16, 16, { kernel: 'nearest' })
const fuente = await base.png().toBuffer()
const px = (n) => sharp(fuente).resize(n, n, { kernel: 'nearest' }).png()

await px(512).toFile(`${out}/logo-512.png`)
await px(192).toFile(`${out}/logo-192.png`)
await px(180).toFile(`${out}/apple-touch-icon.png`)
await px(32).toFile('public/favicon-32.png')

// Maskable: logo al 70 % centrado sobre verde (zona segura del 80 %)
const interior = await px(358).toBuffer()
await sharp({ create: { width: 512, height: 512, channels: 4, background: VERDE } })
  .composite([{ input: interior, left: 77, top: 77 }]).png().toFile(`${out}/maskable-512.png`)

// Usar los logos reales si existen
for (const n of [192, 32]) {
  if (existsSync(`logo-${n}.png`)) {
    await sharp(`logo-${n}.png`).png().toFile(n === 32 ? 'public/favicon-32.png' : `${out}/logo-${n}.png`)
  }
}
console.log(existsSync('logo-512.png') ? 'Íconos generados con el logo real.' : 'Íconos generados con el logo PROVISIONAL.')
