<script lang='ts' setup>
import { hash } from 'magic-color'

const hashInput = ref('')
const hashValue = computed(() => {
  if (hashInput.value)
    return hash(hashInput.value)
  return null
})
</script>

<template>
  <div text-center space-y-2>
    <div fbc gap-4>
      <input
        v-model="hashInput" text-sm w-40 px-2 py-1 rd b="~ #3c3c3c" bg-transparent c-white outline-none
        type="text" placeholder="Enter a string to hash" placeholder-text="gray op-60"
      >
      <p
        text-sm
        :class="hashValue?.hex ? '' : 'font-mono text-transparent bg-clip-text bg-gradient-to-r from-red to-purple'"
        :style="{ color: hashValue?.hex }"
      >
        {{ hashValue?.hex ?? '👈 Hash' }}
      </p>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashValue?.r ?? 0) / 255" bar-color="transparent"
        wrapper-color="#f87171dd"
      />
      <span text-red>{{ hashValue?.r || 'Red' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashValue?.g ?? 0) / 255" bar-color="transparent"
        wrapper-color="#4ade80dd"
      />
      <span text-green>{{ hashValue?.g || 'Green' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashValue?.b ?? 0) / 255" bar-color="transparent"
        wrapper-color="#60a5fadd"
      />
      <span text-blue>{{ hashValue?.b || 'Blue' }}</span>
    </div>
  </div>
</template>
