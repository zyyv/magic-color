<script lang='ts' setup>
import ThemeColors from './ThemeColors.vue'
</script>

<template>
  <div>
    <Transition
      enter-active-class="animate-fade-in animate-duration-150"
      leave-active-class="animate-fade-out animate-duration-150"
      mode="out-in"
    >
      <ThemeColors m-auto />
    </Transition>
  </div>
</template>
