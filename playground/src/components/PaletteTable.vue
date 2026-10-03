<script setup lang="ts">
import { mc } from 'magic-color'

interface PaletteRow { shade: string, color: string, channelValues: number[] }

defineProps<{ rows: PaletteRow[], headers: string[], copiedColor: string | null, activeShade: string | null }>()
const emit = defineEmits<{ copy: [value: string] }>()
</script>

<template>
  <div class="palette-table-scroll">
    <table class="palette-table">
      <colgroup><col class="shade-column"><col class="color-column"><col class="value-column"><col v-for="header in headers" :key="header" class="channel-column"></colgroup>
      <thead>
        <tr>
          <th scope="col">
            Shade
          </th><th scope="col">
            Color
          </th><th scope="col">
            Value
          </th><th v-for="header in headers" :key="header" scope="col" class="channel-heading">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.shade" :class="{ 'is-active': row.shade === activeShade }">
          <th scope="row" class="shade-value">
            {{ row.shade }} <span v-if="row.shade === activeShade" class="base-indicator">Base</span>
          </th>
          <td class="swatch-cell">
            <button class="row-swatch" type="button" :style="{ backgroundColor: row.color, color: mc.readable(row.color) }" :aria-label="`Copy ${row.shade} color ${row.color}`" @click="emit('copy', row.color)">
              <span :class="copiedColor === row.color ? 'i-carbon-checkmark' : 'i-carbon-copy'" aria-hidden="true" />
            </button>
          </td>
          <td>
            <button class="value-copy" type="button" :aria-label="`Copy ${row.color}`" @click="emit('copy', row.color)">
              {{ row.color }} <span aria-hidden="true">↗</span>
            </button>
          </td>
          <td v-for="(channel, index) in row.channelValues" :key="index" class="channel-value">
            {{ channel }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!rows.length" class="table-empty">
      Choose a valid base color to generate a palette.
    </p>
  </div>
</template>
