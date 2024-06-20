export function isObject(v: unknown) {
  return Object.prototype.toString.call(v)
}

export const isArray = Array.isArray
