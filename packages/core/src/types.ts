import type { Colors, ColorType, Opacity } from '@magic-color/transformer'

export interface ColorObject<T extends ColorType> {
  type: T
  values: Colors[T]
  alpha: Opacity
}
