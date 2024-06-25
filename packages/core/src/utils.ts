export function isObject(v: unknown) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

export const isArray = Array.isArray
