import type { ColorType } from './types'

export function isHex(color: string) {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(color)
}

export function isHsl(color: string) {
  return /^hsl\(\d+,\s*\d+%\s*,\s*\d+%\)$/.test(color)
}

export function isRgb(color: string) {
  return /^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(color)
}

export function isHsb(color: string) {
  return /^hsb\(\d+,\s*\d+%\s*,\s*\d+%\)$/.test(color)
}

export function getColorFormat(color: string): ColorType | null {
  if (isHex(color))
    return 'hex'
  if (isHsl(color))
    return 'hsl'
  if (isRgb(color))
    return 'rgb'
  if (isHsb(color))
    return 'hsb'
  return null
}

// RGB To Others

export function rgbToHex(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid RGB color format.')

  // 将 RGB 分量转换为十六进制，并拼接成 HEX 格式
  const r = Number.parseInt(match[0])
  const g = Number.parseInt(match[1])
  const b = Number.parseInt(match[2])

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function rgbToHsl(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid RGB color format.')

  // 将 RGB 分量转换为十六进制，并拼接成 HEX 格式
  const r = Number.parseInt(match[0]) / 255
  const g = Number.parseInt(match[1]) / 255
  const b = Number.parseInt(match[2]) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
    h *= 60
  }

  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export function rgbToHsb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid RGB color format.')

  // 将 RGB 分量转换为十六进制，并拼接成 HEX 格式
  const r = Number.parseInt(match[0])
  const g = Number.parseInt(match[1])
  const b = Number.parseInt(match[2])

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = 0
  let v = max / 255

  if (delta !== 0) {
    s = delta / max
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
    h *= 60
    s *= 100
    v *= 100
  }
  return `hsb(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(v)}%)`
}

// HSL To Others

export function hslToHex(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSL color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const l = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return `#${f(0).toString(16)}${f(8).toString(16)}${f(4).toString(16)}`
}

export function hslToRgb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSL color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const l = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`
}

export function hslToHsb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSL color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const l = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return rgbToHsb(`rgb(${f(0)}, ${f(8)}, ${f(4)})`)
}

// HEX To Others
export function hexToRgb(color: string): string {
  const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match)
    throw new Error('Invalid HEX color format.')

  const r = Number.parseInt(match[1], 16)
  const g = Number.parseInt(match[2], 16)
  const b = Number.parseInt(match[3], 16)

  return `rgb(${r}, ${g}, ${b})`
}

export function hexToHsl(color: string): string {
  const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match)
    throw new Error('Invalid HEX color format.')

  const r = Number.parseInt(match[1], 16) / 255
  const g = Number.parseInt(match[2], 16) / 255
  const b = Number.parseInt(match[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
    h *= 60
  }

  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export function hexToHsb(color: string): string {
  const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match)
    throw new Error('Invalid HEX color format.')

  const r = Number.parseInt(match[1], 16)
  const g = Number.parseInt(match[2], 16)
  const b = Number.parseInt(match[3], 16)

  return rgbToHsb(`rgb(${r}, ${g}, ${b})`)
}

// HSB To Others

export function hsbToHex(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSB color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const b = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(b, 1 - b)
    return Math.round(255 * (b - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return `#${f(0).toString(16)}${f(8).toString(16)}${f(4).toString(16)}`
}

export function hsbToRgb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSB color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const b = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(b, 1 - b)
    return Math.round(255 * (b - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`
}

export function hsbToHsl(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSB color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1])
  const b = Number.parseInt(match[2])

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = s * Math.min(b, 1 - b)
    return Math.round(255 * (b - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
  }
  return rgbToHsl(`rgb(${f(0)}, ${f(8)}, ${f(4)})`)
}

/**
 * Convert color from one format to another.
 * @param colorString valid color string
 * @param targetFormat ColorType
 * @returns
 */
export function convertColor(colorString: string, targetFormat: ColorType): string | null {
  const color = colorString.toLowerCase()
  const colorFormat = getColorFormat(color)

  switch (targetFormat) {
    case 'hsl':
      switch (colorFormat) {
        case 'hsl':
          return color
        case 'hex':
          return hexToHsl(color)
        case 'rgb':
          return rgbToHsl(color)
        case 'hsb':
          return hsbToHsl(color)
      }
      break
    case 'hex':
      switch (colorFormat) {
        case 'hsl':
          return hslToHex(color)
        case 'hex':
          return color
        case 'rgb':
          return rgbToHex(color)
        case 'hsb':
          return hsbToHex(color)
      }
      break
    case 'rgb':
      switch (colorFormat) {
        case 'hsl':
          return hslToRgb(color)
        case 'hex':
          return hexToRgb(color)
        case 'rgb':
          return color
        case 'hsb':
          return hsbToRgb(color)
      }
      break
    case 'hsb':
      switch (colorFormat) {
        case 'hsl':
          return hslToHsb(color)
        case 'hex':
          return hexToHsb(color)
        case 'rgb':
          return rgbToHsb(color)
        case 'hsb':
          return color
      }
      break
  }

  return null
}
