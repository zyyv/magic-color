import { Magicolor } from '@magic-color/core'

const { sqrt, min, max, atan2, abs, cos, sin, exp, PI } = Math

export function deltaE(a: string, b: string, Kl = 1, Kc = 1, Kh = 1) {
  // Delta E (CIE 2000)
  // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
  const rad2deg = function (rad: number) {
    return (360 * rad) / (2 * PI)
  }
  const deg2rad = function (deg: number) {
    return (2 * PI * deg) / 360
  }
  const mcA = new Magicolor(a)
  const mcB = new Magicolor(b)
  const [L1, a1, b1] = mcA.value('lab', false)
  const [L2, a2, b2] = mcB.value('lab', false)
  const avgL = (L1 + L2) / 2
  const C1 = sqrt(a1 ** 2 + b1 ** 2)
  const C2 = sqrt(a2 ** 2 + b2 ** 2)
  const avgC = (C1 + C2) / 2
  const G = 0.5 * (1 - sqrt(avgC ** 7 / (avgC ** 7 + 25 ** 7)))
  const a1p = a1 * (1 + G)
  const a2p = a2 * (1 + G)
  const C1p = sqrt(a1p ** 2 + b1 ** 2)
  const C2p = sqrt(a2p ** 2 + b2 ** 2)
  const avgCp = (C1p + C2p) / 2
  const arctan1 = rad2deg(atan2(b1, a1p))
  const arctan2 = rad2deg(atan2(b2, a2p))
  const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360
  const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360
  const avgHp
        = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2
  const T
        = 1
        - 0.17 * cos(deg2rad(avgHp - 30))
        + 0.24 * cos(deg2rad(2 * avgHp))
        + 0.32 * cos(deg2rad(3 * avgHp + 6))
        - 0.2 * cos(deg2rad(4 * avgHp - 63))
  let deltaHp = h2p - h1p
  deltaHp
        = abs(deltaHp) <= 180
      ? deltaHp
      : h2p <= h1p
        ? deltaHp + 360
        : deltaHp - 360
  deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2)
  const deltaL = L2 - L1
  const deltaCp = C2p - C1p
  const sl = 1 + (0.015 * (avgL - 50) ** 2) / sqrt(20 + (avgL - 50) ** 2)
  const sc = 1 + 0.045 * avgCp
  const sh = 1 + 0.015 * avgCp * T
  const deltaTheta = 30 * exp(-(((avgHp - 275) / 25) ** 2))
  const Rc = 2 * sqrt(avgCp ** 7 / (avgCp ** 7 + 25 ** 7))
  const Rt = -Rc * sin(2 * deg2rad(deltaTheta))
  const result = sqrt(
    (deltaL / (Kl * sl)) ** 2
    + (deltaCp / (Kc * sc)) ** 2
    + (deltaHp / (Kh * sh)) ** 2
    + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)),
  )
  return max(0, min(100, result))
}
