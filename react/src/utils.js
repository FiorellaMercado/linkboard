export function formatearFecha(fechaCrudo) {
  const fecha = new Date(fechaCrudo)
  return fecha.toLocaleString('es-PY', { dateStyle: 'medium', timeStyle: 'short' })
}