/**
 * Color Hash
 * By [Roland Rytz](https://github.com/RolandR)
 *
 * This function takes a string and returns a color hash.
 *
 * @param inputString The string to hash
 * @returns
 */

export function hash(inputString: string): { r: number, g: number, b: number, rgb: string, hex: string } {
  let sum = 0

  for (let i = 0; i < inputString.length; i++)
    sum += inputString.charCodeAt(i)

  const r = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 1).toString().substring(6)}`) * 256)
  const g = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 2).toString().substring(6)}`) * 256)
  const b = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 3).toString().substring(6)}`) * 256)

  const rgb = `rgb(${r}, ${g}, ${b})`

  const hex = `#${(`00${r.toString(16)}`).substring(r.toString(16).length).toUpperCase()}${(`00${g.toString(16)}`).substring(g.toString(16).length).toUpperCase()}${(`00${b.toString(16)}`).substring(b.toString(16).length).toUpperCase()}`

  return {
    r,
    g,
    b,
    rgb,
    hex,
  }
}
