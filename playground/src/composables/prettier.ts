import type { BuiltInParserName } from 'prettier'

export async function prettierCode(code: string, parser: BuiltInParserName) {
  try {
    const format = await import('prettier').then(r => r.format)
    return format(code, {
      parser,
      semi: false,
      singleQuote: true,
    })
  }
  catch {
    return code
  }
}
