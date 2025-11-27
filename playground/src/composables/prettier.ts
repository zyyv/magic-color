import type { BuiltInParserName } from 'prettier'

export async function prettierCode(code: string, parser: BuiltInParserName) {
  try {
    const [
      format,
      parserBabel,
      parserPostcss,
      parserEstree,
    ] = await Promise.all([
      import('prettier/standalone').then(r => r.format),
      import('prettier/plugins/babel').then(m => m.default || m),
      import('prettier/plugins/postcss').then(m => m.default || m),
      import('prettier/plugins/estree').then(m => m.default || m),
    ])

    return await format(code, {
      parser,
      plugins: [
        parserBabel,
        parserPostcss,
        parserEstree,
      ],
      semi: false,
      singleQuote: true,
    })
  }

  catch (e: any) {
    console.error(e)
    return code
  }
}
