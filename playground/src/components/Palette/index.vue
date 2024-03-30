<script lang='ts' setup>
const alpha = ref(1);
const hue = ref(0.5);

</script>

<template>
  <div style="width: 240px;">
    <PalettePanel :width="240" :height="240" :color="'#0ff'" />
    <div flex justify-around py="2">
      <div w="40px" h="40px" bg-red></div>
      <div fbc flex-col py="2px">
        <PaletteControls :width="168" :height="12" :color="'#0ff'" type="hue" v-model="hue" />
        <PaletteControls :width="168" :height="12" :color="'#3d0'" type="alpha" v-model="alpha" />
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
