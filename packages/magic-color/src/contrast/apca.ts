import type { RgbColor } from '@magic-color/core'
import { createMagicColor } from '../core'

const SA98G = {

  mainTRC: 2.4, // 2.4 exponent for emulating actual monitor perception

  // For reverseAPCA
  get mainTRCencode() { return 1 / this.mainTRC },

  // sRGB coefficients
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.0721750,

  // G-4g constants for use with 2.4 exponent
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,

  // G-4g Clamps and Scalers
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 0.0005,
  loClip: 0.1,

  /// // MAGIC NUMBERS for UNCLAMP, for use with 0.022 & 1.414 /////
  // Magic Numbers for reverseAPCA
  mFactor: 1.94685544331710,
  get mFactInv() { return 1 / this.mFactor },
  mOffsetIn: 0.03873938165714010,
  mExpAdj: 0.2833433964208690,
  get mExp() { return this.mExpAdj / this.blkClmp },
  mOffsetOut: 0.3128657958707580,
}

export function APCAcontrast(txtY: number, bgY: number, places = -1) {
  // send linear Y (luminance) for text and background.
  // txtY and bgY must be between 0.0-1.0
// IMPORTANT: Do not swap, polarity is important.

  const icp = [0.0, 1.1] // input range clamp / input error check

  if (
    Number.isNaN(txtY)
    || Number.isNaN(bgY)
    || Math.min(txtY, bgY) < icp[0]
    || Math.max(txtY, bgY) > icp[1]
  ) {
    // --
    return 0.0
  }

  // return zero on error
  // return 'error'; // optional string return for error

  /// ///////   SAPC LOCAL VARS   /////////////////////////////////////////

  let SAPC = 0.0 // For raw SAPC values
  let outputContrast = 0.0 // For weighted final values
  let polCat = 'BoW' // Alternate Polarity Indicator. N normal R reverse

  // TUTORIAL

  // Use Y for text and BG, and soft clamp black,
  // return 0 for very close luminances, determine
  // polarity, and calculate SAPC raw contrast
  // Then scale for easy to remember levels.

  // Note that reverse contrast (white text on black)
  // intentionally returns a negative number
  // Proper polarity is important!

  /// ///////   BLACK SOFT CLAMP   ////////////////////////////////////////

  // Soft clamps Y for either color if it is near black.
  txtY = (txtY > SA98G.blkThrs)
    ? txtY
    : txtY + (SA98G.blkThrs - txtY) ** SA98G.blkClmp
  bgY = (bgY > SA98G.blkThrs)
    ? bgY
    : bgY + (SA98G.blkThrs - bgY) ** SA98G.blkClmp

  /// // Return 0 Early for extremely low ∆Y
  if (Math.abs(bgY - txtY) < SA98G.deltaYmin)
    return 0.0

  /// ///////   APCA/SAPC CONTRAST - LOW CLIP (W3 LICENSE)  ///////////////

  if (bgY > txtY) { // For normal polarity, black text on white (BoW)
    // Calculate the SAPC contrast value and scale
    SAPC = (bgY ** SA98G.normBG
    - txtY ** SA98G.normTXT) * SA98G.scaleBoW

    // Low Contrast smooth rollout to prevent polarity reversal
    // and also a low-clip for very low contrasts
    outputContrast = (SAPC < SA98G.loClip) ? 0.0 : SAPC - SA98G.loBoWoffset
  }
  else { // For reverse polarity, light text on dark (WoB)
    // WoB should always return negative value.
    polCat = 'WoB'

    SAPC = (bgY ** SA98G.revBG
    - txtY ** SA98G.revTXT) * SA98G.scaleWoB

    outputContrast = (SAPC > -SA98G.loClip) ? 0.0 : SAPC + SA98G.loWoBoffset
  }

  // return Lc (lightness contrast) as a signed numeric value
  // Round to the nearest whole number as string is optional.
  // Rounded can be a signed INT as output will be within ± 127
  // places = -1 returns signed float, 1 or more set that many places
  // 0 returns rounded string, uses BoW or WoB instead of minus sign

  if (places < 0) { // Default (-1) number out, all others are strings
    return outputContrast * 100.0
  }
  else if (places === 0) {
    return `${Math.round(Math.abs(outputContrast) * 100.0)}<sub>${polCat}</sub>`
  }
  else if (Number.isInteger(places)) {
    return (outputContrast * 100.0).toFixed(places)
  }
  else { return 0.0 }
} // End APCAcontrast()

export function calcAPCA(textColor: string, bgColor: string, places = -1) {
  return APCAcontrast(
    sRGBtoY(createMagicColor(textColor).toRgb().value),
    sRGBtoY(createMagicColor(bgColor).toRgb().value),
    places,
  )
}

export function sRGBtoY(rgb: RgbColor = [0, 0, 0]) { // send sRGB 8bpc (0xFFFFFF) or string
  const simpleExp = (chan: number) => (chan / 255.0) ** SA98G.mainTRC

  return SA98G.sRco * simpleExp(rgb[0])
    + SA98G.sGco * simpleExp(rgb[1])
    + SA98G.sBco * simpleExp(rgb[2])
}
