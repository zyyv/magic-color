---
# try also 'default' to start simple
theme: default
title: '魔法色彩: 探索颜色空间'
info: |
  ## Magic Color Space.

  Learn more at [Magic Color](https://github.com/zyyv/magic-color)
class: text-center
highlighter: shiki
drawings:
  persist: true
transition: slide-left
mdc: true
gradCursor: false
---

<div fbc pr-20>

<h1 flex="~ col">
  <div flex gap-3 font-ubuntu grad-p-r>Magic Color</div>
  <div flex="~ gap3" items-center>魔法色彩</div>
  <div flex="~ gap3" items-center>探索颜色空间</div>
</h1>

<div flex justify-center items-center relative>
  <div id="logo" absolute top='1/2' left='1/2' translate='-1/2'  w-60 h-60  hover-op-0 transition duration-1000
bg-gradient-to-r shape="[-45deg]" from="$vp-c-brand" to="#009ff7" blur-120px rd-full>
  </div>
  <img w-50 src='/logo.svg' />
</div>

</div>

<div abs-bl mx-13 my-12 flex="~ col" text-sm text-left>
  <div grad-color tracking-widest op50>
    Chris
  </div>
  <div>Share Meeting</div>
  <div text-sm opacity-50>April 17th, 2024</div>
</div>

---
transition: fade-out
layout: intro
growX: 10
growY: 90
style: 'padding-left: 8rem;'
---

<Avatar />

<div prose>
  <p>
  <i i-fluent-emoji-sparkles mr-1 />
  Team member of
  <IconsUnoCSS />
  ,
  <IconsElk />
  , Creator of
  <IconsOnuUI />
  ,
  <IconsUnPreset />
  <i i-fluent-emoji-sparkles ml-1 />
  </p>
  <p>
  In the community, I am also a ecological contributors of the
  <IconsVite />
  、
  <IconsVue />
  、
  <IconsNuxt /> & etc.
  </p>
</div>

<div mt-10 fsc gap-4>
  <div fsc gap-2>
    <div i-carbon-user-sponsor op50 text-xl/>
    <div><a href="https://zyob.top" target="_blank" class="border-none! font-300">zyob.top</a></div>
  </div>
  <div fsc gap-2>
    <div i-carbon-logo-github op50 text-xl/>
  <div><a href="https://github.com/zyyv" target="_blank" class="border-none! font-300">zyyv</a></div>
  </div>
  <div fsc gap-2>
    <div i-carbon-logo-twitter op50 ma text-xl/>
    <div><a href="https://twitter.com/chris_zyyv" target="_blank" class="border-none! font-300">chris_zyyv</a></div>
  </div>
</div>

---
transition: slide-up
gradCursor: false
---

# 回顾「颜色」

你所认识的颜色？

<v-clicks>

- **光学三原色**：<span inline-block w-4 h-4 mr-1 class="bg-[red]" ></span> 红、<span inline-block w-4 h-4 mr-1 class="bg-#0f0"></span> 绿、<span inline-block w-4 h-4 mr-1 class="bg-#00f"></span> 蓝。通常作用于 `RGB模式` 应用于生活的方方面面。

- **美术三原色**：<span inline-block w-4 h-4 mr-1 class="bg-[cyan]" ></span> 青、<span inline-block w-4 h-4 mr-1 class="bg-[magenta]"></span> 品红、<span inline-block w-4 h-4 mr-1 class="bg-[yellow]"></span> 黄。通常作用于 `CMYK模式` 在艺术、设计和绘画中都有广泛的使用场景 。

- **七彩光谱**：
<span inline-block w-2 h-2 mr-1 rd-full class="bg-[red]"></span><span op-40>红外线(>700nm)</span>、
<span v-mark.red="{ at: 3 }"  >
<span inline-block w-4 h-4 mr-1 class="bg-[red]"></span>红（赤）、
<span inline-block w-4 h-4 mr-1 class="bg-[orange]"></span>橙、
<span inline-block w-4 h-4 mr-1 class="bg-[yellow]"></span>黄、
<span inline-block w-4 h-4 mr-1 class="bg-[green]"></span>绿、
<span inline-block w-4 h-4 mr-1 class="bg-[cyan]"></span>青、
<span inline-block w-4 h-4 mr-1 class="bg-[blue]"></span>蓝、
<span inline-block w-4 h-4 mr-1 class="bg-[purple]"></span>紫、
</span>
<span inline-block w-2 h-2 mr-1 rd-full class="bg-[purple]"></span><span op-40>紫外线（<400nm）</span>

- **12/24 色相环**：

</v-clicks>

<div pcc pf v-show="$slidev.nav.clicks === 1">
  <img rd src='/meta/rgb-mode.webp' />
</div>

<div pcc pf mt-14 v-show="$slidev.nav.clicks === 2">
  <div fcc gap-5>
  <div>

  **自身可以发光** vs **自身不能发光**

  <img class="max-w-100!" rd src='/meta/cmy-001.webp' />

  </div>

  <img class="w-50%" rd src='/meta/cmy-001.png' />

  </div>
</div>

<div pcc pf mt-14 v-show="$slidev.nav.clicks === 3">
  光是电磁波
</div>

<div pcc pf mt-14 v-show="$slidev.nav.clicks === 4 ">
  <div fcc gap-5>
  <div>
    <img class="max-w-100!" rd src='/meta/circle-12.webp' />
  </div>
    <!-- <img rd src='/meta/circle-24.png' /> -->
  </div>
</div>

---
transition: fade-out
---

# CSS颜色值

在 CSS（层叠样式表）中，颜色用于定义网页元素的外观。

在 CSS 中，可以使用以下几种方法来指定颜色：

<v-clicks>

- **关键词颜色值（Keyword）**：一些常见的颜色名称，比如"red"（红色）、"blue"（蓝色）等。

- **十六进制颜色值（Hexadecimal）**：使用六位十六进制数字来表示颜色，如"#FF0000"代表红色，其中每两位代表红、绿、蓝色的分量。

- **RGB颜色值（RGB）**：使用红（Red）、绿（Green）、蓝（Blue）三个通道的数值来定义颜色，例如 ~~`rgb(255, 0, 0)`~~ `rgb(255 0 0)` 表示红色。-> **`rgb(R G B[ / A])`**

- **HSL颜色值（HSL）**：使用色相（Hue）、饱和度（Saturation）、亮度（Lightness）来定义颜色，例如"hsl(0, 100%, 50%)"表示红色。

- **HSB颜色值（HSB）**：HSB颜色模型中，色相（Hue）、饱和度（Saturation）、亮度（Brightness）分别表示颜色的类型、纯度和明度。

</v-clicks>

---
transition: slide-right
level: 2
clicks: 3
---

# KeyWord

关键词可以直接用于设置元素的文本颜色、背景颜色等。

<div v-show="$slidev.nav.clicks < 3">

````md magic-move
```css
/* css */
div {
  color: red;
  background-color: lightblue;
}
```
```html
<!-- html -->
<div style="color: red; background-color: lightblue;">KeyWord Color</div>
```
```ts
// typescript
div.style.color = 'red';
div.style.backgroundColor = 'lightblue';
```
````

</div>

<div  v-show="$slidev.nav.clicks === 3">

#### 预定义颜色（第三方）

<div max-h-80 of-auto rd-md>

```ts {monaco-run}
import { KeywordColors, UnoColors } from 'magic-color'

console.log('built-in keyword color: ', KeywordColors)
// console.log('UnoCSS colors: ', UnoColors)
```

</div>

</div>

---
transition: slide-left
level: 2
layout: two-cols
layoutClass: gap-16
gradCursor: false
---

# RBG Color

RGB（红绿蓝）是一种常用的颜色表示方法，它基于光的加色混合原理

在RGB模型中，每种颜色都是通过不同比例的红、绿、蓝三种颜色的混合而得到的。每种颜色的取值范围为0到255，其中0表示没有颜色，255表示颜色的最大强度。

![RGB](/meta/rgb-mode-squrae.png)

::right::

<div fccc h-full>
<Rgb />
</div>

---
transition: slide-left
level: 2
gradCursor: false
---

# Hexadecimal Color

十六进制颜色值是最常用的颜色表示方法之一。

十六进制颜色值由六位十六进制数字组成，每两位代表红、绿、蓝色的分量。

```css
/* css */
div {
  color: #FF0000;
  background-color: #00FF00;
}
```

<Rgb v-show="$slidev.nav.clicks < 1" hex />

<v-click>
<br>

#### 颜色透明度

带有透明度通道的十六进制表示法中，通常使用8个字符表示颜色，前6个字符表示红、绿、蓝三个通道的亮度值，而最后两个字符表示透明度

<code c-red>#FF0000</code> <code c-red op-100>FF</code> 表示红色，透明度为100%

<p op-50>
<code c-green>#00FF00</code> <code c-green>80</code> 表示绿色，透明度为50%
</p>

<p op-10>
<code c-blue>#0000FF</code> <code c-blue>1A</code> 表示蓝色，透明度为10%
</p>

</v-click>

---
transition: slide-down
level: 2
gradCursor: false
---

# HSB Color

一种直观的方法来表示颜色的色调、饱和度和亮度

<div v-show="$slidev.nav.clicks <= 3">

```css
/* css */
div {
  /* invalid: not support */
  color: hsb(0, 100%, 50%);
  background-color: hsb(120, 100%, 50%);
}
```

</div>

<v-clicks>

- **色调（Hue）**：表示颜色的类型，如红色、绿色、蓝色等。
- **饱和度（Saturation）**：表示颜色的纯度，饱和度越高，颜色越鲜艳。
- **亮度（Brightness）**：表示颜色的亮度，亮度越高，颜色越明亮。

</v-clicks>

<v-click>
<Hsb />
</v-click>

---
transition: slide-down
level: 2
gradCursor: false
---

# HSL Color

通过色相、饱和度和亮度来描述颜色

<div v-show="$slidev.nav.clicks <= 3">

```css
/* css */
div {
  color: hsl(0, 100%, 50%);
  background-color: hsl(120, 100%, 50%);
}
```

</div>

<v-clicks>

- **色调（Hue）**：表示颜色在色轮上的位置。
- **饱和度（Saturation）**：颜色中灰度的百分比，当饱和度为0%时，颜色是灰色的，即没有彩色成分；当饱和度为100%时，颜色是最纯净的，没有灰度的混合。
- **亮度（Brightness）**：表示颜色的亮度，亮度越高，颜色越明亮。

</v-clicks>

<br v-show="$slidev.nav.clicks <= 3">

<div v-show="$slidev.nav.clicks > 3">
<v-click>
<div fcc gap-10>
<Hsl />
</div>
</v-click>
</div>

---
transition: fade-out
---

# HSL vs HSB

`hsl` 和 `hsb` 都是一种直观的颜色表示方法，但是它们之间有一些区别。

<div grid="~ cols-2 gap-4">
<div>

  相同点：

<v-clicks>

- <span c-bilibili>都是**符合视观直觉**通过色相、饱和度和亮度来描述颜色。</span>
- <span c-bilibili>H: 色相区间为0-360度，S: 饱和度区间为0-100%，L/B: 亮度/明度区间为0-100%。</span>
- <span c-bilibili>S: 饱和度为0%时，颜色是**灰色**的，即没有彩色成分；当饱和度为100%时，颜色是最纯净的，没有灰度的混合。</span>

</v-clicks>

</div>
<div>

不同点：

<v-clicks>

- 亮/明度区别：
  - HSL: <span c-purple>HSL模型中的亮度更接近于颜色的明暗程度</span>
  - HSB: <span c-teal>HSB模型中的亮度更接近于颜色的明度或亮度</span>

</v-clicks>

</div>
</div>

---
transition: fade-out
gradCursor: false
---

# HSL vs HSB

`hsl` 和 `hsb` 都是一种直观的颜色表示方法，但是它们之间有一些区别。

<div grid="~ cols-2 gap-4">
<div>

HSL：

<img h-320px src='/meta/hsl-mode.png' />

</div>
<div>

HSB：

<img w-full src='/meta/hsb-mode.png' />

</div>
</div>

---
class: px-20
gradCursor: false
---

# 冷暖色系

天气有冷暖，色彩，也有。

<div v-show="$slidev.nav.clicks < 1">

- 冷色： 通常给人一种凉爽、清新、安静的感觉···
- 暖色： 通常给人一种温暖、活泼、充满活力的感觉···

<br />

</div>

<div flex gap-10>

<img w-50 v-drag="[131,137,193,186,90]" src='/meta/warm-cool-001.webp' />
<img ml-60 h-50 src='/meta/warm-cool-002.webp' />

</div>

<br />

<v-clicks>

- 互补色：色相环上180°相差的颜色，如红和绿。
- 对比色：色相环上120° - 180°之间相差的颜色，相对接近但有对比度，如粉色和绿色。
- 同类色：色相环上相差约30°的颜色，非常相近，如柠檬黄和中黄。
- 近似色：色相环上相差约60°之内的颜色，比同类色范围更广，如柠檬黄和橘黄。

</v-clicks>

<v-click>

<div fixed pcc bg='#222' class="w-80% h-50% rd-xl p-4">

通过 `magic-color`, 可以轻松判断是否为冷暖色系。

```ts {monaco-run}
import { isWarmColor } from 'magic-color'

const color = '#ff0000'
console.log(isWarmColor(color))
```

</div>

</v-click>

---
class: fccc of-scroll
gradCursor: false
---
# 配色黄金比

应用于设计中的黄金比例，也可以应用于颜色的搭配中。（**60：30：10**）

<div flex rd of-hidden w-full>
  <div class="bg-red w-60% fcc p-10 text-4xl">
    60% 主色相
  </div>
  <div class="bg-green w-30% fcc p-10 text-2xl">
    30% 辅助色相
  </div>
  <div class="bg-blue w-10% fcc py-10 text-xl">
    10% 强调色相
  </div>
</div>

<img v-click v-show="$slidev.nav.clicks === 1" mt-10 w-100 src='/meta/gold-design-001.jpeg' />
<img v-click v-show="$slidev.nav.clicks === 2" mt-10 w-100 src='/meta/gold-design-002.jpeg' />
<img v-click v-show="$slidev.nav.clicks === 3" mt-10 w-100 src='/meta/gold-design-003.jpeg' />

---
gradCursor: false
---
# 色彩对比度
无障碍色彩对比度

<div grid="~ cols-2 gap-4">
<div>

<v-clicks>

- <span text-red>什么是对比度 ？</span>
  - <span text-green>对比度是两种颜色之间的亮度或颜色差异。对比度的比值越低，它们之间的差异越小。</span>
- <a href="https://www.w3.org/TR/WCAG20/" traget="_blank"> WCAG </a> 的 AA级 与 AAA级 标准 ？
  - 为了确保尽可能多的人可以使用您的产品，对比度需要符合 <span c-purple>WCAG</span> 的 <span c-teal fw-600>AA级</span> 与 <span c-teal fw-600>AAA级</span> 标准。

</v-clicks>

</div>
<div fccc v-click gap-10 bg-white rd>

<div bg='#D5100C' class="w-80% py-4 text-center rd-md font-mono">
色彩对比度检测 -> <span text-xl>5.37</span> : 1
</div>

<div bg='#010205' class="w-80% py-4 text-center rd-md font-mono">
色彩对比度检测 -> <span text-xl>20.75</span> : 1
</div>

</div>
</div>

<div mt-10 v-show="$slidev.nav.clicks === 2">

> WCAG 的 AA级 要求小文本与背景的对比度至少为 <span c-teal fw-600>4.5：1</span>，大文本与背景的对比度至少为 <span c-teal fw-600>3：1</span>。 WCAG 的 AAA级 要求小文本与背景的对比度至少为 <span c-teal fw-600>7：1</span>，大文本与背景的对比度为<span c-teal fw-600> 4.5：1</span>。

</div>

---
gradCursor: false
---
# 色彩对比度
无障碍色彩对比度

如何计算颜色对比度？

<div grid='~ gap-10' :class="$slidev.nav.clicks === 3 ? 'grid-cols-2' : ''">

<div trans>

<v-click>

```ts {monaco-run}
import { getContrastRatio } from 'magic-color'

const color = '#ffffff'
const bgColor = '#010205' // #D5100C
const ratio = getContrastRatio(color, bgColor)

console.log(ratio)
```

</v-click>

<v-click>

```ts {monaco-run}
import { getReadableTextColor } from 'magic-color'

const bgColor = '#010205' // #D5100C
const color = getReadableTextColor(bgColor)

console.log(color)
```

</v-click>

</div>

<v-click>

<div v-show='$slidev.nav.clicks === 3'>

 <h3 mb-4 class="contrastText">

  ~~color-contrast 函数~~

 </h3>

 `color-list`: 至少两个颜色值的逗号分隔列表，用于与第一个值进行比较。

 ```css
p {
    --bg: #010205;
    background: var(--bg);
    color: color-contrast(var(--bg) vs #fff, #000);  /** 基于背景色，自动选择对比度更高的颜色 **/
}
 ```

</div>

</v-click>

</div>

<style>
  .contrastText{
     --bg: #010205;
    background: var(--bg);
    color: color-contrast(var(--bg) vs red, green);  /** 基于背景色，自动选择对比度更高的颜色 **/
  }
</style>

---
transition: fade-out
gradCursor: false
dragPos:
  square: 56,1609,345,345
---

# Color Theme
智能推算主题颜色搭配方案。（WIP）

<div flex gap-4>

<ThemeIntro />

<div flex-1>

合理的算法可以帮助我们更好的选择颜色搭配方案。

<div v-show="$slidev.nav.clicks >= 1 || $slidev.nav.clicks <= 5" :class="$slidev.nav.clicks < 1 || $slidev.nav.clicks > 5 ? 'hidden!' : ''">

<v-click>

```ts {all|7|2-6|8-12|all}
const variants = {
  50: withTint(0.95),
  100: withTint(0.9),
  200: withTint(0.75),
  300: withTint(0.6),
  400: withTint(0.3),
  500: (c: RgbColor) => c,
  600: withShade(0.9),
  700: withShade(0.6),
  800: withShade(0.45),
  900: withShade(0.3),
  950: withShade(0.2),
}
```

</v-click>

</div>

<v-click>

<div v-show="$slidev.nav.clicks >= 6" class='h-315px of-auto'>

##### 自定义主题输出

```ts {monaco-run}
import { theme } from 'magic-color'

const colors = theme('#c084fc', {
  // type: 'rgb',
  // render: (meta) => {
  //   return [
  //     `--color-primary-${meta[0]}`,
  //     meta[1].replace(/rgb\((.*)\)/, '$1').replace(/,/g, ''),
  //   ]
  // },
})

console.log(colors)
```

</div>

</v-click>

</div>

</div>

---
transition: fade-out
---

# Color Picker
基于 `Canvas` 的颜色选择器

<div fcc class="h-70% grad-color">

See [Example](https://color.zyob.top)

</div>

---
transition: fade-in
class: fccc
---

# Magic Color
🪄 让颜色充满魔法

<v-clicks>

- 💫 Support `multi-color model` conversion.
- 📦 Built-in color related components.
- 🚀 Provides utility toolset functions
- 🦄 Theme color generator and fully customizable.
- 🔥 esm only & 0 dependencies & bundle size ~2.9kb.
- 🥳 etc...

</v-clicks>

---
transition: fade-out
---

# Magic Color Playground

提供基本的颜色转换、颜色搭配、颜色生成等功能。

```ts {monaco-run}
import { createMagicColor } from 'magic-color'

const colorString = 'rgb(255, 0, 0)'
const color = createMagicColor(colorString)

console.log(color.toString())
```

---
layout: center
class: text-center
---

# Thanks

[Playground](https://color.zyob.top) · [GitHub](https://github.com/zyyv/magic-color)
