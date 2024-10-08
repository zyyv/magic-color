/**
 * Credit to [@Myndex](https://github.com/Myndex) and copy from [apca-w3](https://github.com/Myndex/apca-w3)
 * @see https://github.com/Myndex/apca-w3
 */

import type { RgbColor } from '@magic-color/core'
import { Magicolor } from '../core'
import { SA98G } from './constant'

function APCAcontrast(txtY: number, bgY: number, places = -1) {
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
}

function sRGBtoY(rgb: RgbColor = [0, 0, 0]) { // send sRGB 8bpc (0xFFFFFF) or string
  const simpleExp = (chan: number) => (chan / 255.0) ** SA98G.mainTRC

  return SA98G.sRco * simpleExp(rgb[0])
    + SA98G.sGco * simpleExp(rgb[1])
    + SA98G.sBco * simpleExp(rgb[2])
}

function alphaBlend(rgbaFG = [0, 0, 0, 1.0], rgbBG = [0, 0, 0], round = true) {
  rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0) // clamp alpha 0-1
  const compBlend = 1.0 - rgbaFG[3]
  const rgbOut: RgbColor = [0, 0, 0] // or just use rgbBG to retain other elements?

  for (let i = 0; i < 3; i++) {
    rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3]
    if (round)
      rgbOut[i] = Math.min(Math.round(rgbOut[i] as number), 255)
  };
  return rgbOut
}

export function calcAPCA(textColor: string, bgColor: string, places = -1, round = true) {
  const mcText = new Magicolor(textColor).toRgb()
  const mcBg = new Magicolor(bgColor).toRgb()
  const alpha = mcText.alpha

  const bgClr = mcBg.value()
  let txClr = mcText.value()

  const hasAlpha = alpha !== 1

  if (hasAlpha)
    txClr = alphaBlend([...txClr, alpha], bgClr, round)

  return APCAcontrast(sRGBtoY(txClr), sRGBtoY(bgClr), places)
}

export function reverseAPCA(
  contrast = 0,
  color?: string,
  knownType: 'background' | 'text' = 'background',
) {
  if (Math.abs(contrast) < 9)
    return false
  // abs contrast must be > 9

  let knownY = color ? sRGBtoY(new Magicolor(color).value('rgb')) : 1.0
  let unknownY = knownY
  let knownExp
  let unknownExp

  /// //   APCA   0.0.98G - 4g - W3 Compatible Constants   ////////////////////

  const scale = contrast > 0 ? SA98G.scaleBoW : SA98G.scaleWoB
  const offset = contrast > 0 ? SA98G.loBoWoffset : -SA98G.loWoBoffset

  contrast = (Number.parseFloat(contrast.toString()) * 0.01 + offset) / scale

  // Soft clamps Y if it is near black.
  knownY = (knownY > SA98G.blkThrs)
    ? knownY
    : knownY + (SA98G.blkThrs - knownY) ** SA98G.blkClmp

  // set the known and unknown exponents
  if (knownType === 'background') {
    knownExp = contrast > 0 ? SA98G.normBG : SA98G.revBG
    unknownExp = contrast > 0 ? SA98G.normTXT : SA98G.revTXT
    unknownY = (knownY ** knownExp - contrast) ** (1 / unknownExp)
    if (Number.isNaN(unknownY))
      return false
  }
  else if (knownType === 'text') {
    knownExp = contrast > 0 ? SA98G.normTXT : SA98G.revTXT
    unknownExp = contrast > 0 ? SA98G.normBG : SA98G.revBG
    unknownY = (contrast + knownY ** knownExp) ** (1 / unknownExp)
    if (Number.isNaN(unknownY))
      return false
  }
  else { return false } // return false on error

  // return contrast +'----'+unknownY;

  if (unknownY > 1.06 || unknownY < 0)
    return false // return false on overflow
  // if (unknownY < 0) { return false } // return false on underflow
  // unknownY = Math.max(unknownY,0.0);

  //  unclamp
  unknownY = (unknownY > SA98G.blkThrs)
    ? unknownY
    : (((unknownY + SA98G.mOffsetIn) * SA98G.mFactor) ** SA98G.mExp * SA98G.mFactInv) - SA98G.mOffsetOut

  //    unknownY - 0.22 * Math.pow(unknownY*0.5, 1/blkClmp);

  unknownY = Math.max(Math.min(unknownY, 1.0), 0.0)

  const hexB = (Math.round(unknownY ** SA98G.mainTRCencode * 255)
  ).toString(16).padStart(2, '0')

  return `#${hexB}${hexB}${hexB}`
}
