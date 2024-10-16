import type { ThemeMetas } from 'magic-color'

export function formatToJson(colors: ThemeMetas, key: string): string {
  return JSON.stringify({ [key]: colors }, null, 2)
}

export function formatToUnoCSS(colors: ThemeMetas, key: string): string {
  const json = formatToJson(colors, key)
  return json.slice(1, json.length - 1)
}

export function formatToTailwindCSS(colors: ThemeMetas, key: string): string {
  return formatToUnoCSS(colors, key)
}

export function formatToCSS(colors: ThemeMetas): string {
  let css = ':root {\n'
  for (const [key, value] of Object.entries(colors)) {
    css += `  --color-${key}: ${value};\n`
  }
  css += '}'
  return css
}

export function formatToSass(colors: ThemeMetas): string {
  let scss = ''
  for (const [key, value] of Object.entries(colors)) {
    scss += `$color-${key}: ${value};\n`
  }
  return scss
}

export function formatToLess(colors: ThemeMetas): string {
  let less = ''
  for (const [key, value] of Object.entries(colors)) {
    less += `@color-${key}: ${value};\n`
  }
  return less
}
