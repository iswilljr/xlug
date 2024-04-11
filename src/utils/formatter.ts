export function valueFormatter(n: number) {
  return Intl.NumberFormat('us').format(n)
}

export function formatHumanReadable(n: number) {
  return Intl.NumberFormat('us', { notation: 'compact' }).format(n)
}
