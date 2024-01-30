import type { ColorType } from '.'
import { convertColor, getColorType, isColor, rgbToHex, rgbToHsb, rgbToHsl } from '.'

function tint(components: number[], intensity: number) {
  return components.map(c => Math.round(c + (255 - c) * intensity))
}

function shade(components: number[], intensity: number) {
  return components.map(c => Math.round(c * intensity))
}

function withTint(intensity: number) {
  return (hex: number[]) => tint(hex, intensity)
}

function withShade(intensity: number) {
  return (hex: number[]) => shade(hex, intensity)
}

export interface ThemeOptions {
  /**
   * Output color type
   *
   * @default same type as input
   */
  type?: ColorType

  /**
   * Custom render output color
   * @param color result color
   * @returns
   */
  render?: (color: string) => string
}

export function theme(color: string, options: ThemeOptions = {}): Record<string, string> {
  if (!isColor(color))
    throw new Error(`Invalid color: ${color}`)

  const defaultOptions: ThemeOptions = {
    type: getColorType(color)!,
    render: c => c,
  }

  const { type, render } = { ...defaultOptions, ...options } as Required<ThemeOptions>
  const finnalRender = (color: string) => {
    let c = ''
    switch (type) {
      case 'hsl':
        c = rgbToHsl(color)
        break
      case 'hsb':
        c = rgbToHsb(color)
        break
      case 'hex':
        c = rgbToHex(color)
        break
      case 'rgb':
      default:
        c = color
    }

    return render(c)
  }

  const rgb = convertColor(color, 'rgb')
  const components = rgb!.slice(4, -1).split(',').map(Number)

  const variants = {
    50: withTint(0.95),
    100: withTint(0.9),
    200: withTint(0.75),
    300: withTint(0.6),
    400: withTint(0.3),
    500: (c: number[]) => c,
    600: withShade(0.9),
    700: withShade(0.6),
    800: withShade(0.45),
    900: withShade(0.3),
    950: withShade(0.2),
  }

  const colors: Record<string, string> = {}

  for (const [name, fn] of Object.entries(variants))
    colors[name] = finnalRender(`rgb(${fn(components).join(', ')})`)

  return colors
}
