<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import type { BuiltInParserName } from 'prettier'
import { mc } from 'magic-color'

const props = defineProps<{
  colors: ThemeMetas
  name: string
}>()

const formaters = await import('../../utils/format')

const copyCode = ref<string>()
const exportType = ref(mc.supports[1]) // 'hex'
const lang = ref('UnoCSS')
const langs = reactive<{
  icon: string
  name: string
  parser: BuiltInParserName
  lang: string
  formater: Promise<(code: ThemeMetas, key: string) => string>
}[]>([
      {
        icon: 'i-logos-unocss',
        name: 'UnoCSS',
        parser: 'babel',
        lang: 'javascript',
        formater: formaters.formatToUnoCSS,
      },
      {
        icon: 'i-logos-tailwindcss-icon',
        name: 'Tailwind',
        parser: 'babel',
        lang: 'javascript',
        formater: formaters.formatToTailwindCSS,
      },
      {
        icon: 'i-logos-css-3',
        name: 'CSS',
        parser: 'css',
        lang: 'css',
        formater: formaters.formatToCSS,
      },
      {
        icon: 'i-logos-sass',
        name: 'Sass',
        parser: 'scss',
        lang: 'scss',
        formater: formaters.formatToSass,
      },
      {
        name: 'JSON',
        icon: 'i-logos-json',
        parser: 'json',
        lang: 'json',
        formater: formaters.formatToJson,
      },
    ])

const highlightCode = computedAsync(async () => {
  const key = props.name.toLowerCase().replace(/\s+/g, '-')
  const currentLang = langs.find(l => l.name === lang.value)!
  const colorsValue = Object.fromEntries(Object.entries(props.colors).map(([k, v]) => [k, mc(v).css(exportType.value as unknown as ColorType)]))
  const formater = await currentLang.formater
  const prettifyCode = (await prettierCode(formater(colorsValue as unknown as ThemeMetas, key), currentLang.parser)).trim()
  copyCode.value = prettifyCode
  return highlight(prettifyCode, currentLang.lang)
})

function handleLangChange(e: Event) {
  lang.value = (e.target as HTMLInputElement).value
}
function handleExportTypeChange(e: Event) {
  exportType.value = (e.target as HTMLInputElement).value as BuiltInParserName
}

const { copy, copied } = useClipboard()
</script>

<template>
  <div w-700px pr>
    <div fsc gap-2 mb-4>
      <div text-sm>
        Export as:
      </div>
      <div fcc gap-3>
        <div v-for="item in langs" :key="item.name" class="inline-flex items-center">
          <label class="relative flex items-center cursor-pointer" :for="item.name">
            <input
              :id="item.name" :value="item.name" name="output" type="radio" :checked="lang === item.name"
              class="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300:50 checked:border-purple:30 transition-all"
              @change="handleLangChange"
            >
            <span
              class="absolute bg-purple size-0 rounded-full peer-checked:size-2.2 transition-all duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </label>
          <label class="ml-1 text-primary:80 cursor-pointer text-sm" :for="item.name" fcc gap-1>
            <i :class="item.icon" text-xs />
            {{ item.name }}
          </label>
        </div>
      </div>
    </div>
    <div fsc gap-2 mb-8>
      <div text-sm>
        Type as:
      </div>
      <div fcc gap-3>
        <div v-for="type in mc.supports" :key="type" class="inline-flex items-center">
          <label class="relative flex items-center cursor-pointer" :for="type">
            <input
              :id="type" :value="type" name="exportType" type="radio" :checked="exportType === type"
              class="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300:50 checked:border-purple:30 transition-all"
              @change="handleExportTypeChange"
            >
            <span
              class="absolute bg-yellow size-0 rounded-full peer-checked:size-2.2 transition-all duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </label>
          <label class="ml-1 text-primary:80 cursor-pointer text-sm" :for="type" fcc gap-1>
            {{ type.toUpperCase() }}
          </label>
        </div>
      </div>
    </div>

    <div pr b="~ dashed dark:#3c3c3c #ccc" p2 rd>
      <div
        v-if="highlightCode" text-xs select-none fcc gap-1 pa right-1 top-1 trans op-50 hover:op-100
        cursor-pointer bg-gray:30 rd p="x1 y0.5" @click="copyCode && copy(copyCode)"
      >
        <i :class="copied ? 'i-carbon-checkmark' : 'i-carbon-bring-forward'" />
        Copy Code
      </div>

      <Transition
        enter-active-class="animate-fade-in animate-duration-150"
        leave-active-class="animate-fade-out animate-duration-150" mode="out-in"
      >
        <div v-if="!highlightCode" animate-pulse>
          <i inline-block i-carbon-assembly-reference animate-spin />
          Computing code...
        </div>
        <div v-else v-html="highlightCode" />
      </Transition>
    </div>
  </div>
</template>
