import type { ColorObject, ColorType, Colors, HexColor, HsbColor, HslColor, Opacity, RgbColor } from '..'

export function createColorObject<T extends ColorType>(type: T, value: Colors[T], opacity: Opacity): ColorObject<T> {
  return {
    type,
    value,
    opacity,
    toString(withOpacity = false): string {
      if (this.type === 'keyword') {
        const o = opacityToString(this.opacity, true)
        return this.value + (withOpacity ? o : '') as HexColor
      }
      else if (this.type === 'hex') {
        return withOpacity
          ? this.value + opacityToString(this.opacity, true) as HexColor
          : this.value as HexColor
      }
      else if (this.type === 'rgb') {
        return withOpacity
          ? `rgba(${(this.value as RgbColor).join(', ')}, ${this.opacity})`
          : `rgb(${(this.value as RgbColor).join(', ')})`
      }
      else {
        const values = [this.value[0], `${this.value[1]}%`, `${this.value[2]}%`]
        return `${this.type}(${values.join(', ')})`
      }
    },
  }
}

export function opacityToString(opacity: Opacity, toHex = false): string {
  return toHex
    ? Math.round(opacity * 255).toString(16).padStart(2, '0')
    : `${opacity * 100}%`
}
