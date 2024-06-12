<script setup lang="ts">
import type { theme } from 'magic-color'
import { getContrastRatio, getReadableTextColor } from 'magic-color'
import { defineProps } from 'vue'

defineProps<{
  colors: ReturnType<typeof theme>
}>()

const { copy } = useClipboard()
</script>

<template>
  <div>
    <ul fcc gap-1>
      <li
        v-for="(v, k) in colors"
        :key="k"
        important-duration-100
        hover-scale-105 trans fccc
        p-4 rd-md h-14 md:h-24 text-sm
        font-mono cursor-pointer :style="{ backgroundColor: v, color: getReadableTextColor({ bgColor: v, textColor: colors[100], fallbackTextColor: colors[900] }) }"
        @click="copy(v)"
      >
        <span>{{ k }}</span>
        <span>{{ v }}</span>
      </li>
    </ul>

    <section my-8 c-white fccc ma>
      <h2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-red via-green to-blue>
        Ratio Table
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <div>
                <!-- <span>text</span> -->
                <div h-1px class="rotate-z-45deg w-60%" bg=" gray/80" />
                <!-- <span>bg</span> -->
              </div>
            </th>
            <th>
              <div>White</div>
            </th>
            <th v-for="(_, k) in colors" :key="k" p0>
              <div>{{ k }}</div>
            </th>
            <th>
              <div>Black</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td fw-bold>
              <div>
                White
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#fff', color: '#fff' }">
                {{ getContrastRatio('#fff', '#fff') }}
              </div>
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <div :style="{ backgroundColor: v, color: '#fff' }">
                {{ getContrastRatio(v, '#fff') }}
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#000', color: '#fff' }">
                {{ getContrastRatio('#000', '#fff') }}
              </div>
            </td>
          </tr>

          <tr v-for="(_, k) in colors" :key="k">
            <td fw-bold>
              <div>
                {{ k }}
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#fff', color: colors[k] }">
                {{ getContrastRatio('#fff', colors[k]) }}
              </div>
            </td>
            <td v-for="(v, j) in colors" :key="`${k}${j}${v}`">
              <div :style="{ backgroundColor: v, color: colors[k] }">
                {{ getContrastRatio(v, colors[k]) }}
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#000', color: colors[k] }">
                {{ getContrastRatio('#000', colors[k]) }}
              </div>
            </td>
          </tr>

          <tr>
            <td fw-bold>
              <div>
                Black
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#fff', color: '#000' }">
                {{ getContrastRatio('#fff', '#000') }}
              </div>
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <div :style="{ backgroundColor: v, color: '#000' }">
                {{ getContrastRatio(v, '#000') }}
              </div>
            </td>
            <td>
              <div :style="{ backgroundColor: '#000', color: '#000' }">
                {{ getContrastRatio('#000', '#000') }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
}

th > div {
  --uno: fcc w-12 h-12 text-size-sm of-hidden rd-md;
}

td > div {
  --uno: fcc w-12 h-12 text-size-sm rd;
}
</style>
