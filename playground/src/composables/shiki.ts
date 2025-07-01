import type { HighlighterCore } from 'shiki/core'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

import langCSS from 'shiki/langs/css.mjs'
import langJavascript from 'shiki/langs/javascript.mjs'
import langJSON from 'shiki/langs/json.mjs'
import langLESS from 'shiki/langs/less.mjs'
import langSCSS from 'shiki/langs/scss.mjs'

import vitesseDark from 'shiki/themes/vitesse-dark.mjs'
import vitesseLight from 'shiki/themes/vitesse-light.mjs'

export const shiki = computedAsync<HighlighterCore>(async (onCancel) => {
  const shiki = await createHighlighterCore({
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
    themes: [
      vitesseDark,
      vitesseLight,
    ],
    langs: [
      langCSS,
      langJavascript,
      langJSON,
      langSCSS,
      langLESS,
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
