<script setup lang="ts">
import type { theme } from 'magic-color'
import { computed, defineProps, ref, watch } from 'vue'
import RatioTableSquare from './RatioTableSquare.vue'

defineProps<{
  colors: ReturnType<typeof theme>
}>()

const contrasts = ['WCAG', 'APCA']
const WCAG_Options = [
  { label: 'All', value: 1 },
  { label: '4.5+ AA', value: 4.5 },
  { label: '7+ AAA', value: 7 },
]
const APCA_Options = [
  { label: 'All', value: 0 },
  { label: '50%+', value: 0.5 },
  { label: '70%+', value: 0.7 },
  { label: '90%+', value: 0.9 },
]

const ratio = ref(1)
const type = ref('WCAG')
const options = computed(() => type.value === 'WCAG' ? WCAG_Options : APCA_Options)

watch(type, () => ratio.value = options.value[0].value)
</script>

<template>
  <section my-8 c-white fccc ma w-full>
    <div>
      <div fcc mb-4 pr>
        <ul b="~ #3c3c3c" p1 rd pa top-0 left-0 fcc gap-2>
          <li
            v-for="c in contrasts" :key="c"
            text-sm px-2 cursor-pointer rd-sm
            :class="type === c ? 'bg-purple/10 text-purple' : ''"
            @click="type = c"
          >
            {{ c }}
          </li>
        </ul>
        <h2 w-fit text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple to-yellow>
          Ratio Table
        </h2>
        <ul b="~ #3c3c3c" px2 py1 rd pa top-0 right-0 fcc gap-2>
          <li
            v-for="opt in options" :key="opt.value"
            text-sm px-2 cursor-pointer rd-sm
            :class="ratio === opt.value ? 'bg-yellow/10 text-yellow' : ''"
            @click="ratio = opt.value"
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
              <RatioTableSquare :type background-color="#fff" color="#fff" :ratio />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <RatioTableSquare :type :background-color="v" color="#fff" :ratio />
            </td>
            <td>
              <RatioTableSquare :type background-color="#000" color="#fff" :ratio />
            </td>
          </tr>

          <tr v-for="(_, k) in colors" :key="k">
            <td fw-bold>
              <div>
                {{ k }}
              </div>
            </td>
            <td>
              <RatioTableSquare :type background-color="#fff" :color="colors[k]" :ratio />
            </td>
            <td v-for="(v, j) in colors" :key="`${k}${j}${v}`">
              <RatioTableSquare :type :background-color="v" :color="colors[k]" :ratio />
            </td>
            <td>
              <RatioTableSquare :type background-color="#000" :color="colors[k]" :ratio />
            </td>
          </tr>

          <tr>
            <td fw-bold>
              <div>
                Black
              </div>
            </td>
            <td>
              <RatioTableSquare :type background-color="#fff" color="#000" :ratio />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`">
              <RatioTableSquare :type :background-color="v" color="#000" :ratio />
            </td>
            <td>
              <RatioTableSquare :type background-color="#000" color="#000" :ratio />
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
