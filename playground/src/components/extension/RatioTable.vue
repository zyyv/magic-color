<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import { computed, ref, watch } from 'vue'
import RatioTableSquare from './RatioTableSquare.vue'

defineProps<{
  colors: ThemeMetas
}>()

type ContrastType = 'WCAG' | 'APCA'

const contrasts: ContrastType[] = ['APCA', 'WCAG']
const WCAG_Options = [
  { label: 'All', value: 1 },
  { label: '4.5+ (AA)', value: 4.5 },
  { label: '7+ (AAA)', value: 7 },
]
const APCA_Options = [
  { label: 'All', value: 0 },
  { label: '75%+', value: 75 },
  { label: '90%+', value: 90 },
]

const ratio = ref(APCA_Options[0].value)
const type = ref<ContrastType>('APCA')
const options = computed(() => type.value === 'WCAG' ? WCAG_Options : APCA_Options)

watch(type, () => ratio.value = options.value[0].value)
</script>

<template>
  <section mt-8 w-700px>
    <section c-white>
      <div fcc mb-4 pr>
        <ul b="~ #ccc dark:#3c3c3c" p1 rd pa top-0 left-0 fcc gap-2>
          <li
            v-for="c in contrasts" :key="c"
            text-sm px-2 cursor-pointer rd-sm
            :class="type === c ? 'bg-purple/10 text-purple' : 'text-#666 dark:text-#999'"
            @click="type = c"
          >
            {{ c }}
          </li>
        </ul>
        <h2 fcc gap-1 w-fit text-xl text-transparent bg-clip-text bg-linear-to-r from-purple to-yellow>
          Ratio
          <i class="c-yellow/90" i-carbon-table-alias />
          Table
        </h2>
        <ul b="~ #ccc dark:#3c3c3c" p1 rd pa top-0 right-0 fcc gap-2>
          <li
            v-for="opt in options" :key="opt.value"
            text-sm px-2 cursor-pointer rd-sm
            :class="ratio === opt.value ? 'bg-yellow/10 text-yellow' : 'text-#666 dark:text-#999'"
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
              <div text-basecolor text-op-80>
                White
              </div>
            </th>
            <th v-for="(_, k) in colors" :key="k" p0 text-basecolor text-op-80>
              <div>{{ k }}</div>
            </th>
            <th>
              <div text-basecolor text-op-80>
                Black
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td fw-bold text-sm>
              <div text-basecolor text-op-80>
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
            <td fw-bold text-sm>
              <div text-basecolor text-op-80>
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
            <td fw-bold text-sm>
              <div text-basecolor text-op-80>
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
    </section>
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
