<script setup lang="ts">
import { mc } from 'magic-color'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Popover from 'primevue/popover'
import Select from 'primevue/select'
import Extension from './extension/index.vue'

const {
  color,
  alpha,
  exportType,
  colors,
  name,
  getReadable,
  channelHeaders,
  tableData,
  copyColor,
  copied,
  copiedColor,
} = useTheme()

const op = ref()
const {
  onMouseEnter,
  onMouseLeave,
  onContentMouseEnter,
  onContentMouseLeave,
} = usePopoverHover(op)

const options = mc.supports.map(type => ({ label: type.toUpperCase(), value: type }))
</script>

<template>
  <div pt-4 pb-6 px-6 rd-3 transition max-h-min>
    <Popover ref="op">
      <div @mouseenter="onContentMouseEnter" @mouseleave="onContentMouseLeave">
        <Palette v-model:color="color" v-model:alpha="alpha" v-model:type="exportType" />
      </div>
    </Popover>
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
          <h3
            flex items-center gap-2
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
          >
            <div>
              <div
                class="size-6 rounded shadow cursor-pointer border border-gray:10 hover:scale-110 transition"
                :style="{ backgroundColor: color }"
              />
            </div>
            <span class="text-xl fw-700">{{ name }}</span>
          </h3>
          <div fsc gap-2>
            <span text-sm>
              Type as:
            </span>
            <Select
              v-model="exportType"
              :options="options"
              option-label="label"
              option-value="value"
              size="small"
              class="!h-7 flex items-center important:[&>span]:text-12.5px"
              :pt="{
                label: 'py-0',
                option: '!text-xs !py-1',
              }"
            />
          </div>
        </div>
      </template>
      <Column field="shade" header="Shade" style="width: 10%">
        <template #body="{ data }">
          <span font-bold>{{ data.shade }}</span>
        </template>
      </Column>
      <Column header="Color" style="width: 40%">
        <template #body="{ data }">
          <Button
            class="w-full h-10 rd fcc relative cursor-pointer group transition hover:scale-105"
            :style="{ backgroundColor: data.color, color: getReadable(data.color) }"
            unstyled
            @click="copyColor(data.color)"
          >
            <i
              :class="[
                copied && copiedColor === data.color ? 'i-carbon-checkmark opacity-100' : 'i-carbon-copy opacity-0 group-hover:opacity-100',
              ]"
              transition-opacity duration-200
            />
          </Button>
        </template>
      </Column>
      <Column header="Value" style="width: 20%">
        <template #body="{ data }">
          <span text-sm font-mono op-80>{{ data.color }}</span>
        </template>
      </Column>
      <Column
        v-for="(header, index) in channelHeaders"
        :key="header"
        :header="header"
        style="width: 10%"
      >
        <template #body="{ data }">
          <span font-mono text-sm :class="['text-red', 'text-green', 'text-blue'][index]">{{ data.channelValues[index] }}</span>
        </template>
      </Column>
    </DataTable>
    <Extension mt-8 :colors :name :type="exportType" />
  </div>
</template>
