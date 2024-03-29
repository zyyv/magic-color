<script lang='ts' setup>
const alpha = ref(1);



</script>

<template>
  <div>
    <PalettePanel />
    <div flex gap-2 p="2">
      <div w="40px" h="40px" bg-red></div>
      <div fbc flex-col py="2px">
        <PaletteControls :width="168" :height="12" />
        <PaletteAlpha :width="168" :height="12" :color="'#3d0'" v-model="alpha" />
      </div>
    </div>
  </div>

  <div w-10 h-10 bg='#f00' />
  <div w-10 h-10 bg='#ff0' />
  <div w-10 h-10 bg='#0f0' />
  <div w-10 h-10 bg='#0ff' />
  <div w-10 h-10 bg='#00f' />
  <div w-10 h-10 bg='#f0f' />
  <div w-10 h-10 bg='#f00' />

</template>

<style lang='scss' scoped></style>
