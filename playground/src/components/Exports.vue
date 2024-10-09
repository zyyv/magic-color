<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'
import type { BuiltInParserName } from 'prettier'

const colorName = inject<ComputedRef<string>>('colorName')!
const colors = inject<ComputedRef<ThemeMetas>>('colors')!

const lang = ref('UnoCSS')
const langs = reactive<{
  icon: string
  name: string
  parser: BuiltInParserName
  lang: string
}[]>([
  {
    icon: 'i-logos-unocss',
    name: 'UnoCSS',
    parser: 'babel',
    lang: 'javascript',
  },
  {
    icon: 'i-logos-tailwindcss-icon',
    name: 'Tailwind',
    parser: 'babel',
    lang: 'javascript',
  },
  {
    icon: 'i-logos-sass',
    name: 'Sass',
    parser: 'scss',
    lang: 'scss',
  },
  {
    name: 'JSON',
    icon: 'i-logos-json',
    parser: 'json',
    lang: 'json',
  },
])

const highlightCode = computedAsync(async () => {
  const key = colorName.value.toLowerCase().replace(/\s+/g, '-')
  const currentLang = langs.find(l => l.name === lang.value)!

  // TODO: Add support for other languages
  const c = JSON.stringify({ [key]: colors.value }, null, 2)
  const formatted = (await prettierCode(c, currentLang.parser)).trim()
  return highlight(formatted, currentLang.lang)
})

function handleLangChange(e: Event) {
  lang.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <div w-700px pr>
    <div fsc gap-2 mb-8>
      <div text-sm>
        Export as:
      </div>
      <div fcc gap-3>
        <div v-for="item in langs" :key="item.name" class="inline-flex items-center">
          <label class="relative flex items-center cursor-pointer" :for="item.name">
            <input
              :id="item.name"
              :value="item.name"
              name="output"
              type="radio"
              :checked="lang === item.name"
              class="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300:50 checked:border-purple:30 transition-all"
              @change="handleLangChange"
            >
            <span class="absolute bg-purple w-2.5 h-2.5 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </label>
          <label class="ml-1 text-primary:80 cursor-pointer text-sm" :for="item.name" fcc gap-1>
            <i :class="item.icon" text-xs />
            {{ item.name }}
          </label>
        </div>
      </div>
    </div>

    <div pr>
      <div
        text-xs select-none
        fcc gap-1
        pa right-1 top-1
        trans op-50 hover:op-100
        cursor-pointer
        bg-gray:30 rd
        p="x1 y0.5"
      >
        <i i-carbon-bring-forward />
        Copy Code
      </div>
      <div v-html="highlightCode" />
    </div>
  </div>
</template>
