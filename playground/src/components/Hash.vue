<script lang='ts' setup>
import { mc } from 'magic-color'

const hashInput = ref('')
const hashMc = computed(() => {
  if (hashInput.value)
    return mc(mc.hash(hashInput.value))
  return null
})
const hashRgb = computed(() => hashMc.value?.rgb())
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
        :class="hashMc ? '' : 'text-transparent bg-clip-text bg-gradient-to-r from-red to-purple'"
        :style="{ color: hashMc?.hex() }"
      >
        {{ hashMc?.hex() ?? '👈 Hash' }}
      </p>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashRgb?.[0] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#f87171dd"
      />
      <span text-red>{{ hashRgb?.[0] ?? 'Red' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashRgb?.[1] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#4ade80dd"
      />
      <span text-green>{{ hashRgb?.[1] ?? 'Green' }}</span>
    </div>
    <div c-white fbc text-sm lh-20px>
      <PaletteControls
        disable type="normal" :model-value="(hashRgb?.[2] ?? 0) / 255" bar-color="transparent"
        wrapper-color="#60a5fadd"
      />
      <span text-blue>{{ hashRgb?.[2] ?? 'Blue' }}</span>
    </div>
  </div>
</template>
