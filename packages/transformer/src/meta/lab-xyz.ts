import type { LabColor } from '../types'

type Triplet = [number, number, number]

export const D50_WHITE: Triplet = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585]

const delta = 6 / 29
const multiplier = 3 * delta ** 2
const offset = 4 / 29

function labToXyzComponent(value: number): number {
  return value > delta ? value ** 3 : multiplier * (value - offset)
}

function xyzToLabComponent(value: number): number {
  return value > delta ** 3 ? Math.cbrt(value) : value / multiplier + offset
}

export function labToXyzD50([l, a, b]: LabColor): Triplet {
  const lightness = (l + 16) / 116
  return [
    D50_WHITE[0] * labToXyzComponent(lightness + a / 500),
    D50_WHITE[1] * labToXyzComponent(lightness),
    D50_WHITE[2] * labToXyzComponent(lightness - b / 200),
  ]
}

export function xyzD50ToLab(xyz: Triplet): LabColor {
  const [x, y, z] = xyz.map((value, index) => xyzToLabComponent(value / D50_WHITE[index]))
  return [Math.max(0, 116 * y - 16), 500 * (x - y), 200 * (y - z)]
}

// CSS Color 4 sRGB/XYZ matrices composed with the Bradford white-point transforms.
// https://www.w3.org/TR/css-color-4/#color-conversion-code
export function linearRgbToXyzD50(r: number, g: number, b: number): Triplet {
  return [
    0.43606574687426947 * r + 0.3851515095901597 * g + 0.1430784199651387 * b,
    0.22249317711056527 * r + 0.7168870130944824 * g + 0.060619809794952365 * b,
    0.013923921463169401 * r + 0.09708132423141017 * g + 0.7140993568158808 * b,
  ]
}

export function xyzD50ToLinearRgb(x: number, y: number, z: number): Triplet {
  return [
    3.1341358529001173 * x - 1.6173859980180427 * y - 0.4906622179110973 * z,
    -0.9787954765557777 * x + 1.9162543773959886 * y + 0.0334428733903669 * z,
    0.07195539255794736 * x - 0.22897675981518203 * y + 1.4053860351131182 * z,
  ]
}
