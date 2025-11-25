<script setup lang="ts">
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Extension from './extension/index.vue'

const props = withDefaults(defineProps<{
  name: string
  colors: ThemeMetas
  type?: ColorType
  showArrow?: boolean
  ext?: boolean
}>(), {
  type: 'hex',
  showArrow: false,
  ext: false,
})

function getReadable(v: string) {
  return mc.readable({
    bgColor: v,
    textColor: props.colors[100],
    fallbackTextColor: props.colors[900],
  })
}

const { copy, copied } = useClipboard()
const copiedColor = ref<string | null>(null)
const exportType = ref<ColorType>(props.type)

function formatColor(v: string) {
  return mc(v).to(exportType.value).css().toUpperCase()
}

function copyColor(v: string) {
  copy(formatColor(v))
  copiedColor.value = v
}

function handleExportTypeChange(e: Event) {
  const target = e.target as HTMLInputElement
  exportType.value = target.value as ColorType
}

const shades = computed(() => {
  return Object.keys(props.colors).sort((a, b) => Number(a) - Number(b))
})

const tableData = computed(() => {
  return [
    { ...props.colors, rowType: 'color' },
    { ...props.colors, rowType: 'value' },
  ]
})
</script>

<template>
  <div pt-4 pb-6 px-6 rd-3 transition max-h-min>
    <DataTable
      :value="tableData"
      class="w-full !bg-transparent"
      scrollable
      :pt="{
        root: { style: 'background: transparent' },
        header: { style: 'background: transparent' },
        bodyRow: { style: 'background: transparent' },
        rowGroupHeader: { style: 'background: transparent' },
      }"
    >
      <template #header>
        <div fbc>
          <h3 text-xl fw-700>
            {{ name }}
          </h3>
          <div fsc gap-2>
            <span text-sm>
              Type as:
            </span>
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
        </div>
      </template>
      <Column
        v-for="shade in shades"
        :key="shade"
        :field="String(shade)"
        :header="String(shade)"
        style="min-width: 6rem"
        header-class="[&>div]:w-full [&>div]:justify-center"
      >
        <template #body="{ data }">
          <div flex justify-center>
            <template v-if="data.rowType === 'color'">
              <Button
                class="w-1 h-15 rd fcc relative cursor-pointer group transition hover:scale-110"
                :style="{ backgroundColor: data[shade], color: getReadable(data[shade]) }"
                unstyled
                @click="copyColor(data[shade])"
              >
                <i
                  :class="[
                    copied && copiedColor === data[shade] ? 'i-carbon-checkmark opacity-100' : 'i-carbon-copy opacity-0 group-hover:opacity-100',
                  ]"
                  transition-opacity duration-200
                />
              </Button>
            </template>
            <template v-else>
              <span text-sm uppercase font-mono>{{ formatColor(data[shade]) }}</span>
            </template>
          </div>
        </template>
      </Column>
    </DataTable>
    <KeepAlive>
      <Extension mt-8 :colors :name>
        <slot name="ext" />
      </Extension>
    </KeepAlive>
  </div>
</template>
