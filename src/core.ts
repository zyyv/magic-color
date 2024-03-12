import type { ColorType } from './types'

export class MagicColor {
  private color: string
  private type: ColorType = 'hex'

  constructor(color: string) {
    this.color = color
  }

  getColor(): string {
    return this.color
  }

  setColor(color: string): void {
    this.color = color
  }

  toString(_type: ColorType = this.type): string {
    return this.color
  }
}
