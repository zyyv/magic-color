import type { BuiltInParserName } from 'prettier'

export async function prettierCode(code: string, parser: BuiltInParserName) {
  try {
    const format = await import('prettier').then(r => r.format)
    return await format(code, {
      parser,
      semi: false,
      singleQuote: true,
    })
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e: any) {
    // Why nor work? and throw a error
    // console.log(e)

    return code
  }
}
