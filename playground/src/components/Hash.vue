<script lang='ts' setup>
import { hash, mc } from 'magic-color'

const hashInput = ref('')
const hashMc = computed(() => {
  if (hashInput.value)
    return mc(hash(hashInput.value))
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
        :class="hashMc ? '' : 'font-mono text-transparent bg-clip-text bg-gradient-to-r from-red to-purple'"
        :style="{ color: hashMc?.hex() }"
      >
        {{ hashMc?.hex() ?? '👈 Hash' }}
      </p>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashMc?.toRgb().value()[0] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#f87171dd"
      />
      <span text-red>{{ hashMc?.toRgb().value()[0] || 'Red' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashMc?.toRgb().value()[1] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#4ade80dd"
      />
      <span text-green>{{ hashMc?.toRgb().value()[1] || 'Green' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashMc?.toRgb().value()[2] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#60a5fadd"
      />
      <span text-blue>{{ hashMc?.toRgb().value()[2] || 'Blue' }}</span>
    </div>
  </div>
</template>
