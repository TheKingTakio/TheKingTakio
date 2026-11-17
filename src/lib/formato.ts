/** $12.000 — pesos colombianos con punto de miles, sin decimales. */
export function cop(valor: number): string {
  return '$' + Math.round(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 }).replace(/,/g, '.')
}
