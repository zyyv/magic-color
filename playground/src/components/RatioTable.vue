<script setup lang="ts">
import type { theme } from 'magic-color'
import { defineProps, ref } from 'vue'
import RatioTableSquare from './RatioTableSquare.vue'

defineProps<{
  colors: ReturnType<typeof theme>
}>()

const bench = ref(1)

const options = [
  { label: 'All', value: 1 },
  { label: '4.5+ AA', value: 4.5 },
  { label: '7+ AAA', value: 7 },
]
</script>

<template>
  <section my-8 c-white fccc ma w-full>
    <div>
      <div fcc mb-4 pr>
        <h2 w-fit text-xl text-transparent bg-clip-text bg-gradient-to-r from-red via-green to-blue>
          Ratio Table
        </h2>
        <ul b="~ #3c3c3c" px2 py1 rd pa top-0 right-0 fcc gap-2>
          <li
            v-for="opt in options" :key="opt.value"
            text-sm px-2 cursor-pointer rd-sm
            :class="bench === opt.value ? 'bg-yellow/10 text-yellow' : ''"
            @click="bench = opt.value"
          >
            {{ opt.label }}
          </li>
        </ul>
      </div>

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
              <RatioTableSquare background-color="#fff" color="#fff" :ratio="bench" />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <RatioTableSquare :background-color="v" color="#fff" :ratio="bench" />
            </td>
            <td>
              <RatioTableSquare background-color="#000" color="#fff" :ratio="bench" />
            </td>
          </tr>

          <tr v-for="(_, k) in colors" :key="k">
            <td fw-bold>
              <div>
                {{ k }}
              </div>
            </td>
            <td>
              <RatioTableSquare background-color="#fff" :color="colors[k]" :ratio="bench" />
            </td>
            <td v-for="(v, j) in colors" :key="`${k}${j}${v}`">
              <RatioTableSquare :background-color="v" :color="colors[k]" :ratio="bench" />
            </td>
            <td>
              <RatioTableSquare background-color="#000" :color="colors[k]" :ratio="bench" />
            </td>
          </tr>

          <tr>
            <td fw-bold>
              <div>
                Black
              </div>
            </td>
            <td>
              <RatioTableSquare background-color="#fff" color="#000" :ratio="bench" />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <RatioTableSquare :background-color="v" color="#000" :ratio="bench" />
            </td>
            <td>
              <RatioTableSquare background-color="#000" color="#000" :ratio="bench" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
table {
  table-layout: fixed;
}

th > div {
  --uno: fcc w-12 h-12 text-size-sm of-hidden rd-md;
}
</style>
