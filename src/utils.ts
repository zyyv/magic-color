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

export function isColor(color: string) {
  return isHex(color) || isHsl(color) || isRgb(color) || isHsb(color)
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
  const s = Number.parseInt(match[1]) / 100
  const l = Number.parseInt(match[2]) / 100

  function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0)
      t += 1
    if (t > 1)
      t -= 1
    if (t < 1 / 6)
      return p + (q - p) * 6 * t
    if (t < 1 / 2)
      return q
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r, g, b
  if (s === 0) {
    r = g = b = l // Achromatic
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  return rgbToHex(`rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`)
}

export function hslToRgb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSL color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1]) / 100
  const l = Number.parseInt(match[2]) / 100

  let r, g, b
  if (s === 0) {
    r = g = b = l
  }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

export function hslToHsb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSL color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1]) / 100
  const l = Number.parseInt(match[2]) / 100

  function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0)
      t += 1
    if (t > 1)
      t -= 1
    if (t < 1 / 6)
      return p + (q - p) * 6 * t
    if (t < 1 / 2)
      return q
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r, g, b
  if (s === 0) {
    r = g = b = l // Achromatic
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  return rgbToHsb(`rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`)
}

// HEX To Others
export function hexToRgb(color: string): string {
  let match
  const _match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  const _shortMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i)
  if (_match)
    match = _match
  else if (_shortMatch)
    match = _shortMatch
  else
    throw new Error('Invalid HEX color format.')

  const r = Number.parseInt(match[1], 16)
  const g = Number.parseInt(match[2], 16)
  const b = Number.parseInt(match[3], 16)

  return `rgb(${r}, ${g}, ${b})`
}

export function hexToHsl(color: string): string {
  let match
  const _match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  const _shortMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i)
  if (_match)
    match = _match
  else if (_shortMatch)
    match = _shortMatch
  else
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
  let match
  const _match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  const _shortMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i)
  if (_match)
    match = _match
  else if (_shortMatch)
    match = _shortMatch
  else
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
  const s = Number.parseInt(match[1]) / 100
  const b = Number.parseInt(match[2]) / 100

  const c = b * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = b - c

  let r = 0
  let g = 0
  let bl = 0
  if (h >= 0 && h < 60) {
    r = c
    g = x
  }
  else if (h >= 60 && h < 120) {
    r = x
    g = c
  }
  else if (h >= 120 && h < 180) {
    g = c
    bl = x
  }
  else if (h >= 180 && h < 240) {
    g = x
    bl = c
  }
  else if (h >= 240 && h < 300) {
    r = x
    bl = c
  }
  else if (h >= 300 && h < 360) {
    r = c
    bl = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  bl = Math.round((bl + m) * 255)

  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`
}

export function hsbToRgb(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSB color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1]) / 100
  const b = Number.parseInt(match[2]) / 100

  const c = b * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = b - c

  let r = 0
  let g = 0
  let bl = 0
  if (h >= 0 && h < 60) {
    r = c
    g = x
  }
  else if (h >= 60 && h < 120) {
    r = x
    g = c
  }
  else if (h >= 120 && h < 180) {
    g = c
    bl = x
  }
  else if (h >= 180 && h < 240) {
    g = x
    bl = c
  }
  else if (h >= 240 && h < 300) {
    r = x
    bl = c
  }
  else if (h >= 300 && h < 360) {
    r = c
    bl = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  bl = Math.round((bl + m) * 255)

  return `rgb(${r}, ${g}, ${bl})`
}

export function hsbToHsl(color: string): string {
  const match = color.match(/\d+/g)
  if (!match || match.length < 3)
    throw new Error('Invalid HSB color format.')

  const h = Number.parseInt(match[0])
  const s = Number.parseInt(match[1]) / 100
  const b = Number.parseInt(match[2]) / 100

  const l = (2 - s) * b / 2
  const sl = l && l < 0.5 ? s * b / (l * 2) : s * b / (2 - l * 2)

  return `hsl(${h}, ${Math.round(sl * 100)}%, ${Math.round(l * 100)}%)`
}

/**
 * Convert color from one format to another.
 * @param colorString valid color string
 * @param targetFormat ColorType
 * @returns Result of ColorType
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
