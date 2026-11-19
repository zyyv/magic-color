export const numberPattern = /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/.source
export const alphaPattern = `${numberPattern}%?`
export const huePattern = `${numberPattern}(?:deg|grad|rad|turn)?`

type ChannelFormats = [number | 'angle', number | 'angle', number | 'angle']

function parseChannel(token: string, format: ChannelFormats[number]) {
  const value = Number.parseFloat(token)
  if (format !== 'angle')
    return token.endsWith('%') && format !== 100 ? (value / 100) * format : value

  const angle = token.toLowerCase()
  if (angle.endsWith('turn'))
    return value * 360
  if (angle.endsWith('grad'))
    return value * 0.9
  if (angle.endsWith('rad'))
    return value * (180 / Math.PI)
  return value
}

export function parseFunctionalColor(match: RegExpMatchArray | null, formats: ChannelFormats = [100, 100, 100]) {
  if (!match)
    return

  const values = match.slice(1, 4).map((token, i) => parseChannel(token, formats[i])) as [number, number, number]
  const alphaText = match[4] ?? '1'
  const alpha = Number.parseFloat(alphaText) / (alphaText.endsWith('%') ? 100 : 1)
  if (values.every(Number.isFinite) && alpha >= 0 && alpha <= 1)
    return { values, alpha }
}

export function parseOkColor(match: RegExpMatchArray | null, formats: ChannelFormats) {
  const parsed = parseFunctionalColor(match, formats)
  if (!match || !parsed)
    return

  const lightness = parsed.values[0]
  if (lightness < 0 || lightness > 100)
    return

  // Keep accepting unitless lightness above 1 on the legacy 0–100 scale.
  if (lightness <= 1 && !match[1].endsWith('%'))
    parsed.values[0] *= 100
  return parsed
}
