import type { ColorType, Colors, Opacity } from '@magic-color/core'

export interface ColorObject<T extends ColorType> {
  type: T
  values: Colors[T]
  alpha: Opacity
}
