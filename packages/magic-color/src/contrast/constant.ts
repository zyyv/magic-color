export const SA98G = {
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
