<script lang='ts' setup>
import { getReadableTextColor, theme } from 'magic-color'

const color = '#c084fc'

const themeColor = theme(color)
</script>

<template>
  <div class="justify-start!">
    UnoCSS
    <div
      bg="#faf5ff" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#faf5ff') }"
    >
      #faf5ff
    </div>
    <div
      bg="#f3e8ff" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#f3e8ff') }"
    >
      #f3e8ff
    </div>
    <div
      bg="#e9d5ff" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#e9d5ff') }"
    >
      #e9d5ff
    </div>
    <div
      bg="#d8b4fe" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#d8b4fe') }"
    >
      #d8b4fe
    </div>
    <div
      bg="#c084fc" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#c084fc') }"
    >
      #c084fc
    </div>
    <div
      bg="#a855f7" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#a855f7') }"
    >
      #a855f7
    </div>
    <div
      bg="#9333ea" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#9333ea') }"
    >
      #9333ea
    </div>
    <div
      bg="#7e22ce" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#7e22ce') }"
    >
      #7e22ce
    </div>
    <div
      bg="#6b21a8" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#6b21a8') }"
    >
      #6b21a8
    </div>
    <div
      bg="#581c87" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#581c87') }"
    >
      #581c87
    </div>
    <div
      bg="#3b0764" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#3b0764') }"
    >
      #3b0764
    </div>
  </div>

  <div fccc class="justify-start!">
    Arco Design
    <div
      bg="#F7E8FF" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#F7E8FF') }"
    >
      #F7E8FF
    </div>
    <div
      bg="#EFD4FE" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#EFD4FE') }"
    >
      #EFD4FE
    </div>
    <div
      bg="#E5C0FE" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#E5C0FE') }"
    >
      #E5C0FE
    </div>
    <div
      bg="#DAACFD" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#DAACFD') }"
    >
      #DAACFD
    </div>
    <div
      bg="#CE98FD" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#CE98FD') }"
    >
      #CE98FD
    </div>
    <div
      bg="#C084FC" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#C084FC') }"
    >
      #C084FC
    </div>
    <div
      bg="#8D52D0" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#8D52D0') }"
    >
      #8D52D0
    </div>
    <div
      bg="#602BA4" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#602BA4') }"
    >
      #602BA4
    </div>
    <div
      bg="#3A1078" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#3A1078') }"
    >
      #3A1078
    </div>
    <div
      bg="#1C004D" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor('#1C004D') }"
    >
      #1C004D
    </div>
  </div>

  <div fccc class="justify-start!">
    unjs/theme
    <div
      v-for="c in themeColor"
      :key="c"
      bg="#F7E8FF" w-20 h-8 fcc text-10px text-op-0 hover-text-op-100
      :style="{ color: getReadableTextColor(c), backgroundColor: c }"
    >
      {{ c }}
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
