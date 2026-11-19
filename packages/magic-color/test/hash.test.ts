import { mc } from 'magic-color'
import { describe, expect, it } from 'vitest'

describe('hash colors', () => {
  it('uses FNV-1a by default and preserves the legacy mapping on request', () => {
    expect(mc.hash('hello')).toBe('#9f2cab')
    expect(mc.hash('example', 'hex', 'legacy')).toBe('#1dbaae')
  })

  it('includes character order for ASCII and Unicode inputs', () => {
    expect(new Set(['abc', 'bca', 'cba'].map(input => mc.hash(input))).size).toBe(3)
    expect(mc.hash('张三')).not.toBe(mc.hash('三张'))
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
