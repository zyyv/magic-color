import { describe, expect, it } from 'vitest'
import { hash } from 'magic-color'

describe('hash colors', () => {
  it('hash output', () => {
    const input = 'example'
    const result = hash(input)

    expect(result).toMatchInlineSnapshot(`
      {
        "b": 174,
        "g": 186,
        "hex": "#1DBAAE",
        "r": 29,
        "rgb": "rgb(29, 186, 174)",
      }
    `)
  })

  it('should generate consistent color for the same input', () => {
    const input = 'example'
    const result1 = hash(input)
    const result2 = hash(input)

    expect(result1).toEqual(result2)
  })

  it('should generate different colors for different inputs', () => {
    const input1 = 'example1'
    const input2 = 'example2'
    const result1 = hash(input1)
    const result2 = hash(input2)

    expect(result1).not.toEqual(result2)
  })

  it('should generate valid rgb color', () => {
    const input = 'example'
    const result = hash(input)

    expect(result.rgb).toMatch(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/)
  })

  it('should generate valid hex color', () => {
    const input = 'example'
    const result = hash(input)

    expect(result.hex).toMatch(/^#[0-9A-F]{6}$/)
  })

  it('should generate correct individual color values', () => {
    const input = 'example'
    const result = hash(input)

    expect(result.r).toBeGreaterThanOrEqual(0)
    expect(result.r).toBeLessThanOrEqual(255)
    expect(result.g).toBeGreaterThanOrEqual(0)
    expect(result.g).toBeLessThanOrEqual(255)
    expect(result.b).toBeGreaterThanOrEqual(0)
    expect(result.b).toBeLessThanOrEqual(255)
  })
})
