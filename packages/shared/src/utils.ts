export function isObject(v: unknown) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

export function isArray(v: unknown) {
  return Array.isArray(v)
}

export function isFunction(v: unknown) {
  return Object.prototype.toString.call(v) === '[object Function]'
}

export function isString(v: unknown) {
  return typeof v === 'string'
}

export function isNumber(v: unknown) {
  return typeof v === 'number'
}
