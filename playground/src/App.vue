<script setup lang="ts">

const color = ref('#6e329c')
const type = ref('hex')
const alpha = ref(1)

watchEffect(() => {
  console.log('Palette color: ',color.value)
  console.log(  'Palette type: ', type.value)
  console.log(  'Palette alpha: ', alpha.value)
})

</script>

<template>
  <Palette v-model:color="color" v-model:alpha="alpha" />
  <div h="20px"></div>
  <Picker />
</template>
