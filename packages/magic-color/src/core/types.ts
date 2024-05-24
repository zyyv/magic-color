import type { ColorType, Colors, Opacity } from '@magic-color/core'

export interface ColorObject<T extends ColorType> {
  type: T
  value: Colors[T]
  alpha: Opacity
}
