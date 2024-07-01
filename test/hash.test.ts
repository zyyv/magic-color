import { describe, expect, it } from 'vitest'
import { mc } from 'magic-color'

describe('hash colors', () => {
  it('hash output', () => {
    const input = 'example'
    const result = mc.hash(input)

    expect(result).toMatchInlineSnapshot(`"#1dbaae"`)
  })

  it('should generate consistent color for the same input', () => {
    const input = 'example'
    const result1 = mc.hash(input)
    const result2 = mc.hash(input)

    expect(result1).toEqual(result2)
  })

  it('should generate different colors for different inputs', () => {
    const input1 = 'example1'
    const input2 = 'example2'
    const result1 = mc.hash(input1)
    const result2 = mc.hash(input2)

    expect(result1).not.toEqual(result2)
  })

  it('should generate valid rgb color', () => {
    const input = 'example'
    const result = mc.hash(input, 'rgb')

    expect(result).toMatch(/^rgb\((\d{1,3}) (\d{1,3}) (\d{1,3})\)$/)
  })

  it('should generate valid hex color', () => {
    const input = 'example'
    const result = mc.hash(input)

    expect(result).toMatch(/^#[0-9A-F]{6}$/i)
  })
})
