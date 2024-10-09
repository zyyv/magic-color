import type { HighlighterCore } from 'shiki/core'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const shiki = computedAsync<HighlighterCore>(async (onCancel) => {
  const shiki = await createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [
      () => import('shiki/themes/vitesse-dark.mjs'),
      () => import('shiki/themes/vitesse-light.mjs'),
    ],
    langs: [
      () => import('shiki/langs/css.mjs'),
      () => import('shiki/langs/javascript.mjs'),
      () => import('shiki/langs/json.mjs'),
      () => import('shiki/langs/scss.mjs'),
    ],
  })

  onCancel(() => shiki?.dispose())
  return shiki
})

export function highlight(code: string, lang: string) {
  if (!shiki.value)
    return code
  return shiki.value.codeToHtml(code, {
    lang,
    defaultColor: false,
    themes: {
      dark: 'vitesse-dark',
      light: 'vitesse-light',
    },
  })
}
