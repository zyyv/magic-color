---
layout: cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
growSize: 1.5
---

<div mt--2>
<div flex justify-between items-center pr-20>

<h1 flex="~ col">
<div flex gap-3 font-mono>UnoCSS </div>
<div flex="~ gap3" items-center>快速构建页面</div>
<div flex="~ gap3" items-center c="$vp-c-brand">最佳实践</div>
</h1>
<div flex justify-center items-center relative>
  <div id="logo" absolute top='1/2' left='1/2' translate='-1/2'  w-60 h-60  hover-op-0 transition duration-1000
bg-gradient-to-r shape="[-45deg]" from="$vp-c-brand" to="#009ff7" blur-120px rd-full>
  </div>
  <div text-40 i-logos-unocss />
</div>

</div>
<div uppercase tracking-widest op50>
Chris
</div>
</div>

<div abs-bl mx-13 my-12 flex="~ col" text-sm text-left>
  <div>Share Meeting</div>
  <div text-sm opacity-50>June 14th, 2023</div>
</div>

---
layout: intro
growX: 10
growY: 90
style: 'padding-left: 8rem;'
---

# Chris

<div class="leading-10 opacity-80">
Team member of UnoCSS, Elk<sub bottom-0 ml-1>farm</sub>.<br>
Creator of Onu UI.<br>
Vite、Vue、Nuxt etc. ecological contributors.<br>
</div>

<div my-10 w-min flex="~ gap-1" items-center justify-center>
  <div i-ri-user-3-line op50 ma text-xl/>
  <div><a href="https://zyob.top" target="_blank" class="border-none! font-300">zyob.top</a></div>
  <div i-ri-github-line op50 ma text-xl ml4/>
  <div><a href="https://github.com/zyyv" target="_blank" class="border-none! font-300">zyyv</a></div>
  <div i-ri-twitter-line op50 ma text-xl ml4/>
  <div><a href="https://twitter.com/chris_zyyv" target="_blank" class="border-none! font-300">chris_zyyv</a></div>
</div>

<img src="https://avatars.githubusercontent.com/u/42139754?v=4" rounded-full w-35 abs-tr mt-32 mr-40/>

<div flex="~ gap2">

</div>

---
layout: quote
---

# What is UnoCSS ?

<!-- <v-clicks> -->

- [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css-zh)
- [Why UnoCSS](https://unocss.dev/guide/why)

<!-- </v-clicks> -->

---
layout: center
growX: 50
growY: 120
growSize: 1.5
---

# Features

<v-clicks>

- 完全可定制 - 没有核心实用程序，所有功能都是通过预设提供的
- 没有解析，没有 AST，没有扫描，它是即时的（比 Windi CSS 或 Tailwind JIT 快 5 倍）
- ~6kb min+brotli - 零依赖和浏览器友好
- Cli、快捷方式、变体组、基于打包工具的转换器
- 属性模式 - 在属性中对实用程序进行分组
- 纯 CSS 图标- 将任何图标用作单个类
- CSS 指令 - 在 CSS 中使用 @apply、@screen、theme() 指令重用 utils
- 编译模式 — 在构建时将多个类合成一个
- Inspector - 以交互方式检查和调试
- CSS-in-JS Runtime - 使用 UnoCSS 和一行 CDN 导入
- VS Code 扩展

</v-clicks>

---
layout: default
growX: -10
growY: 50
growSize: 0.75
---
# 社区集成

UnoCSS 集成了各种框架/工具：

<Integrations />

<p v-click='2'>

你可以在 [https://unocss.dev/guide/#examples](https://unocss.dev/guide/#examples) 上在线试玩

</p>

---
layout: default
growX: 50
growY: 100
growSize: 1.5
clicks: 5
---

# 如何使用

<div v-show="$slidev.nav.clicks < 1" bg="[url(/howToUse.png)]" w-50 h-50 bg-cover absolute right-10 top-10 animate-pulse />

<div flex children-flex-1 gap-10 v-click='1' v-show="$slidev.nav.clicks === 1" >

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ]
})
```

```ts
// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  PresetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    PresetIcons(),
  ]
})
```

```ts
// main.ts
import "uno.css"

// 样式重置（可选）
import "@unocss/reset/tailwind.css"
```

</div>

<div v-click='2'>
Demo 展示
</div>

<div flex children-flex-1 gap-10>

<div v-click='3'>

```html
<!-- Button Componetent -->
<template>
  <button
    class="
      w-full h-12 rounded transition duration-350
      hover-bg-op-90
      active-bg-op-80 active-scale-105
    "
  >
    <slot />
  </button>
</template>
```

</div>

<div v-click='4'>

```html
<template>
  <div class="flex items-center">
    <Button class="flex-1 bg-#d5001c text-white">
      Button
    </Button>
    <Button class="flex-1 b b-#d5001c text-#d5001c bg-white
      hover-bg-#d5001c hover-text-white"
    >
      Button
    </Button>
  </div>
</template>
```

</div>

</div>

<div v-click='5' mt-10 px-6 py-4 b="~ $vp-c-brand" rd-xl h-fit bg-white bg-op-400>

  <BaseUseDemo />

</div>

---
layout: fact
growX: 0
growY: 50
---

<h1 class="text-4xl!">～ 纵享丝滑 ～ ？</h1>

<div bg="[url(/smooth.png)] cover" w-40 h-40 absolute left='1/2' translate="x--1/2" mt-4></div>

---
layout: two-cols
growX: -10
growY: -10
clicks: 4
---

# Rules
Uno 大多数的工作能力取决于你的规则

<div class="number-bg">R</div>

<v-clicks>

- Static Rules 静态规则
- Dynamic Rules 动态规则
- 规则优先级
- 高级用法

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">

```ts
{
  rules: [
    ['flex', { display: 'flex' }],
    ['inline-flex', { display: 'inline-flex' }],
    ['flex-inline', { display: 'inline-flex' }],
    // ...
  ]
}
```

</div>

<div v-show="$slidev.nav.clicks === 2">

```ts
{
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
  ]
}
```

</div>

<div v-show="$slidev.nav.clicks === 3">
<p mb-4>解析规则时，规则顺序排名靠后的优先级越高！</p>

```ts
{
  rules: [
    [/^m-(.*)$/, ([, d]) => ({ margin: d })],
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    // ...
  ]
}
```

<p font-mono>

-> [Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIC2BaAjABnQD4AoE4AenAlKA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAOQCuWEAxgM6u0BQnqAHpLBQYAhvQA28NJhz5CwIgAoEnOHCjjUrAFxwA2itV6A9AD0QAWgUA6AFQBKACRGANHAW7XyALp24AXgA%2BNyQQYSgibB1kMjsvZwNVXVMLBQAdZABqRxc3DxQffyClOFDwyLgAAwcEaKM4ABZSKFQQCpi4gw7SO04gA&css=Q&options=N4XyA)

</p>

</div>

<div v-show="$slidev.nav.clicks === 4" font-mono>

大多时候你不会用到，除非真的有除非🤣。仅做了解

-> [Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIBmB7b6B8AUFFKJLIihjAK5IAu2AtgLT0CmDBAwnY01ABKNOJ2AB6cBCIky0eMjToAhLQbM2negQCSAOwgI4YEFF7qBw0UglSityESA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHDBAKIDOAxgIZirIDKqANqrRVHAL5x0UCCDgByAK5YItatTEAoBagAekWCgz0J7eGkw58hYEQAUCBXDhQdqagC44AbUtXnrt3AD0APVoTqChAAWlMAOgBqAEoAEi8SDzdTJzIsehBUAF0yJCh6AHc2Tm5oMn8oKFQsGCKuHjIAN3ooYHpqgAk25E4oajIYAAtUDP4ouABeAD5ERM8vLxRgOmbkOBAlkHoYWiHVm05qWbdgdDhTNIyw7Fp2CTRqUzFqEVRB7CIxKLHKmAkoLCUnjmCxOcAAnhAJHB8m0YGQIVCGFhFtR6AAjTjkIZwJotWHUQTQLFLay2I5WUGmXGtDpdHrUMKcLBEQbfV5-AFAty0AiBODUDh1InjchUZZMViCkpQUx5QpSnhRcneBY-Dlwej8mAtZlwbCBVD0VYQU5tOAQNEAKzqyrV-zgAAMFDEEALijwBBYrOgCDBgtRgAAvVCOF2DYaoMI%2B6osIOR6ggPgAbgUfAUXgAVODIXAkXABvQGqg1joYMAwJj9nY4BmvM7XQroHx7PZ6OgYKheF7c76qjBHGI2x2oGIU2moxAIHBpi63UKoJ7XDz2NBHJVkGP01miRlkK04ABHCSd4DV2sKAACu-3pnWWGC%2BWAyEGoYQ4cuaMq9AA1pBsDAGQTPgxm7WdGwXGZPGjP0A2DV930jaDY2DMIgJTKw0zTJ0uT4BJPGyVwCOAhQgA&css=Q&options=N4XyA)

</div>

---
layout: two-cols
growX: 50
growY: 0
---

# Shortcuts
你可以包装使用 Shortcut 来简化你的原子化 CSS<br/>
就像书写 class='xxx' 那么简单

<div class="number-bg">S</div>

<div v-show="$slidev.nav.clicks === 0" pf top="50%" left-20 right-20 translate-y="-1/2">

```ts
// uno.config.ts
{
  shortcuts: {
    'btn': 'w-fit py-2 px-4 font-semibold rounded-lg shadow-md',
  }
}
```

```ts {monaco-diff}
<button class="w-fit py-2 px-4 font-semibold rounded-lg shadow-md bg-red">
  Button
</button>
~~~
<button class="btn bg-red">
  Button
</button>
```

<div w-full grid="~ cols-2" mt-2>
<button w-fit py-2 px-4 font-semibold rounded-lg shadow-md bg-red>
  Button
</button>

<button class="btn bg-red w-fit">
  Button
</button>
</div>

</div>

<v-clicks>

- Static Shortcuts 静态快捷方式
- Dynamic Shortcuts 动态态快捷方式
- Nested Shortcuts 嵌套快捷方式
- ExpandGroup
- Tips

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">

```ts
{
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  }
}
```
<br/>
```html
<button btn btn-green w-fit>Button</button>
```
<br/>
<button btn btn-green w-fit>Button</button>

</div>

<div v-show="$slidev.nav.clicks === 2">

```ts
{
  shortcuts: [
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  ]
}
```

<br/>

```html
<button btn-red w-fit>Button</button>
<button btn-teal w-fit>Button</button>
<button btn-blue w-fit>Button</button>
```

<br/>

<div space-x-2>
<button btn-red w-fit>Button</button>
<button btn-teal w-fit>Button</button>
<button btn-blue w-fit>Button</button>
</div>

</div>

<div v-show="$slidev.nav.clicks === 3">

```ts
{
  shortcuts: [
    ['btn', 'py-2 px-4 font-semibold rounded-lg shadow-md',]
    [/^btn-(.*)$/, ([, c]) => `btn bg-${c}-400 text-${c}-100`],
  ]
}
```

<br/>

```html
<button btn-red w-fit>Button</button>
<button btn-teal w-fit>Button</button>
<button btn-blue w-fit>Button</button>
```

<br/>

<div space-x-2>
<button btn-red w-fit>Button</button>
<button btn-teal w-fit>Button</button>
<button btn-blue w-fit>Button</button>
</div>

</div>

<div v-show="$slidev.nav.clicks === 4">

```ts
{
  shortcuts: [
    ['btn', 'py-2 px-4 font-semibold rounded-lg shadow-md',]
    [/^btn-(.*)$/, ([, c]) => `hover-(bg-black b-(~ ${c}) text-(${c} xl))  btn bg-${c}-400 text-${c}-100`],
  ]
}
```

<br/>

```html
<button btn-red w-fit>Button</button>
<button btn-teal w-fit>Button</button>
<button btn-blue w-fit>Button</button>
```

<br/>

<div space-x-2>
<button btn-expand-red w-fit>Button</button>
<button btn-expand-teal w-fit>Button</button>
<button btn-expand-blue w-fit>Button</button>
</div>

</div>

<div v-show="$slidev.nav.clicks >=  5" max-h-100 of-auto rd>

```ts {all|2-3|5-20|6-11|13-18|23-24|33}
async expandShortcut(input: string, context: RuleContext<Theme>, depth = 5): Promise<[ShortcutValue[], RuleMeta | undefined] | undefined> {
    if (depth === 0)
      return

    for (const s of config.shortcuts) {
      if (isStaticShortcut(s)) {
        if (s[0] === input) {
          result = s[1]
          break
        }
      }
      else {
        const match = input.match(s[0])
        if (match)
          result = s[1](match, context)
        if (result) {
          break
        }
      }
    }

    // expand nested shortcuts
    if (isString(result))
      result = expandVariantGroup(result.trim()).split(/\s+/g)

    if (!result)
      return

    return [
      (await Promise.all(result.map(async r =>
        (
          isString(r)
            ? (await this.expandShortcut(r, context, depth - 1))?.[0]
            : undefined
        ) || [r],
      )))
        .flat(1)
        .filter(Boolean),
    ]
  }
```

</div>

---
layout: two-cols
growX: 50
growY: 0
growSize: 1.5
---

# Variant
你可以使用 Variant 来增强你的规则<br/>
输出你想要的 CSS<br/>
例如：`hover:` `dark:` etc.

<div class="number-bg">V</div>

<v-clicks>

- Normal variant 普通变体
- Nested variant 嵌套变体
- Separator 分割符
- Custom
- [Check All Variants](https://windicss.org/utilities/general/variants.html#theme-variants)

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">

在 Uno 预设中，它内置了多个变体，兼容&对齐 `tailwind` `windi`<br/>
基于其灵活提取能力，它更像是一个 `超集`

##### Usage

```html
<div class="text-red hover-text-blue">Hover Me!</div>
```
```css
/* Output */
.text-red{--un-text-opacity:1;color:rgba(248,113,113,var(--un-text-opacity));}
.hover-text-blue:hover{--un-text-opacity:1;color:rgba(96,165,250,var(--un-text-opacity));}
```

<div class="text-red hover-text-blue">Hover Me!</div>

<br/>

```html
<div class="text-red dark:text-teal">Dark Mode</div>
```

```css
/* Output */
.dark .dark\:text-teal{--un-text-opacity:1;color:rgba(45,212,191,var(--un-text-opacity));}
.text-red{--un-text-opacity:1;color:rgba(248,113,113,var(--un-text-opacity));}
```

<div class="text-red dark:text-teal">Dark Mode</div>

</div>

<div v-show="$slidev.nav.clicks === 2">

Uno 允许你在书写规则是，嵌套变体使用<br/>
`variantA:variantB:···:rules`<br/>

##### Usage

```html
<div class="dark:hover:important:text-teal">Hover Me!</div>
```

```css
/* Output */
.dark .dark\:hover\:important\:text-teal:hover{--un-text-opacity:1 !important;color:rgba(45,212,191,var(--un-text-opacity)) !important;}
```

<div class="dark:hover:important:text-teal">Hover Me!</div>

<div>

<div px-4 py-2 rd b='~ #d97706' mt-6 text-14px c="#d97706">

  <h5 font-bold>Warning</h5>

  <p important-m1>过多 Variant 嵌套的使用，会导致规则的复杂度增加，难以阅读<br/>
  也会增加解析成本，所以不建议使用过多的嵌套<br/></p>
</div>

当你 Variants 超过500个时，便会得到以下警告

<p text-10px>哈哈，应该没有人会这么写吧😅</p>

```ts
if (handlers.length > 500)
        throw new Error(`Too many variants applied to "${raw}"`)
```

</div>

</div>

<div v-show="$slidev.nav.clicks === 3">

Uno 现在对分隔符对方开放，可以自定义<br/>
```ts
/**
   * Variant separator
   *
   * @default [':', '-']
   */
  separators?: Arrayable<string>
```

##### Usage

```html
<input class="hover-text-red focus:text-teal" />
```

##### 自定义分隔符

```ts
// uno.config.ts
import { defineConfig } from 'uno'

export default defineConfig({
  separators: ['_'],
})
```

```html
<input class="hover_text-red focus_text-teal" />
```

<input b b-gray class="hover_text-red focus_text-teal" />

</div>

<div v-show="$slidev.nav.clicks === 4">

简单尝试一下吧～～

- [Variant Docs](https://unocss.dev/config/variants)
- [Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIBmB7b6B8AUFFKJLIihjAK5IAu2AtgFz0CmAHvQLQBO7EAQDCdRkygA1BHzAIAdvWAB6cBCIq1RIA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCqWEcAvnOlBCHAOQCujAYypVuAKFGoAHpFgoMAQ14AbeGkw58hYEQAUCUXDgA3eVGDysMKgC44AbQOHEjp3CzyQqW91AyYFmG4SFycQeRgBAAsdMIjI1CgASmdXVwECKgglVAA6JQhdWKiExJDXYHQ4HQBCIvioHKp-WCoAdWAYaO4BXibOa25E5MoYXigsODqEsqcRsYn9VNSpqFsVxqVgAVQdAHZE4KXXGmyBGGhbHSpkgF4APjgAAwASBCpma0iIIwTHw6PDAAjCDIACel2BYNuD0WAKc6SwmWyeQKOkhoNKcKc6Jy6GgAFF5FEdDojNCUlinBUqkY7ABGAC6yVpjLgAGobjw4NVfNB-JYxJSWJjKXNxnB0TNXMx-gCwKZUJZvAABTzIcxVL4-VZwLUlOAWZBVSDYGAJWzqVCJIJSlgzGUhB2GBn-CjUWg2exumj0Rg6RIu0TMUpAA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)
- [Variant Types](https://github.com/unocss/unocss/blob/1cb4ce12493bd24c63ed0206ae746deae5ba521d/packages/core/src/types.ts#L253-L317)

</div>

---
layout: two-cols
growX: 90
growY: 20
growSize: 1.2
---

# Themes
Uno 对齐 `Tailwind` 的主题支持，但是更加强大

<div class="number-bg">T</div>

<v-clicks>

- 内置主题
- mergeThemes & extendThemes
- 自定义主题

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">

##### 内置主题
Uno 在 `presetMini` 包中内置基本主题<br/>
包括`colors` `font` `breakpoint` ···<br/>

[Link](https://github.com/unocss/unocss/tree/main/packages/preset-mini/src/_theme)

Uno 在 `presetWind` 增加主题系统<br/>
包括`animate` `media` ···

[Link](https://github.com/unocss/unocss/blob/main/packages/preset-wind/src/theme.ts)

##### Export/Import

Uno 将主题系统对外开放，你可以轻松获取主题实例

```bash
pnpm add @unocss/preset-mini
```

```ts
import { theme } from '@unocss/preset-mini'
// OR
import { theme } from '@unocss/preset-wind'
```
</div>

<div v-show="$slidev.nav.clicks === 2">

##### mergeTheme & [Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIAuBTAHpgWiQFt0A%2BAKCh3wuAHpwJK6nZEUMbC4BzcqtzqNIZIA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCqWEcAvnOlBCHAOQCujAYypVuAKFGoAHpFgoMAQ14AbeGkw58hYEQAUCUXHKUaMKgC44AbQOGj1Wgwg6AlCRuH9t21nkhUF7gp7GABadAgIbjcvQxgAC1Q-C08Yw3CsGABlYAAvf0R3VLgQZAtLbgBGADoKgCYAVkoQKJ5qxsTuAF1oosMlIjLKqoamlqH25u7Cr2YembmWBZSvHySeIJMwiKjpuHjE-OWY9Kzcw92vKhBBgAYqgA4Adgmx6rqXqd7Z3e-5mynmM5REA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)
当多个预设中，存在主题时。Uno 会自动 **深度合并** 主题

<div fsc gap-3 un-children="flex-1">
<div>

```ts
// preset-foo
{
  theme: {
    colors: {
      red: 'red',
      blue: 'blue',
    }
  }
}
```

</div>

<div>

```ts
// preset-bar
{
  theme: {
    colors: {
      red: 'pink',
      green: 'green',
    }
  }
}
```

</div>
</div>

<br />

##### extendThemes & [Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIAuBTAHpgWgCdsQCBWABkvQD4d9gB6cCWgKHdElkRQwaEARnACu2OoOasOQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCqWEcAvnOlBCHAOQCujAYypVuAKFGoAHpFgoMAQ14AbeGkw58hYEQAUCUXHKUaMKgC44AbQOGj1Wgwg6AlCRuH9t21nkhUF7gp7GABadAgIbjcvQykYVCxkABUAC1Q-HRg0v2dEdxjKGF4oLDyYmIA6Kqz01Gjy2wEIJWhzMoavSmQLTw6YgFYABkGArqj8juZ6yemY5gmWWambAF16uITk7NRM7dzew0Li0oPbKoqav1nDJpaoNtOvc8vUCtvW69sAIyVef3aOgARACiADEAIJ0AAySQCPz%2B4xmC2WXnmhmWzGcoiAA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

在主题深度合并之后，继承主题系统以扩展其能力

```ts
{
  extendTheme(mergedTheme) {
    return {
      ...mergedTheme,
      colors: {
        red: {
          500: 'red',
        },
      },
    }
  },
}
```

</div>

<div v-show="$slidev.nav.clicks === 3" fccc gap-4 h-full>

### 如何丝滑且优雅的自定义主题呢？

<div w-40 h-40 bg="[url(/customTheme.png)]" bg-cover></div>

[Playground](https://unocss.dev/play/?html=DwEwlgbgBA7gTgQwA5IKZwHwCgpVJKAZyQQGNUBaATwoBZtdd9oAzAG1QA8BeAIgD8opAPZsoAc2QUATLwaMm4aABcuyikjhgAtgjhUoqzus6EMAIwCuy5cIB2UTTr1VgAeiXyFzQ2op3Ua0QxI3VCbQtrWwcA5Utg908cBTwlX2MKQktSckJCdPVzBEJUSJt7ImzcwkTIL0YfUIoYPTswO3ECijZxMujYVvbxWoh6xQIm9DhhOC7ONj6KqZmR%2BtWsZPHWDh4BIVEJKVkxvCtyh3NlO0WHJ119dzPok%2BAnisuLq40te4MPilMN0cPxcjyi9heb0%2B0P8gWUwSg-3CQLuoLcUMh4OhiK%2BWRyqDyOLsFCKJRRIIe6KxmPORKJzUGHXpPXJzkpGM2DShdP%2By1m-3mrN%2BYPOaw8dWS63WQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAJIBjAlT6UaMAKpYIcAL5x0UCCDgByNnOFUqGgFAHUAD0iwUGAIZsANvDSYc%2BQsCIAKBAbhwYAC1QQVAAuRG8fZQIYADErEGBbblCvCIiwNigqYQDQjToAN1QsYCgyAAlUW0LOYSsyOmYrWzIqKywqAFoaZnQNEnCfBX7U9CiAZWAALxCw1J8TKlCAbQ0ARgAmMBM%2BzVWADi2NAF1huaoQZbWAFkOyDXXN7ZOBiJYrGkvVgDZbzXWbp6nVK2IifA7bO7rH6Al7zWyXf6-DQAZkexyBigxols0EWszmFFAVigSU0%2BWJ7g6HWEHUJIGJ3AAlH1YXAcBwoE1cuSoJTqR12UwmsyMT4qGxhMJqHiNDy%2BTTxZLpSLWQB3YnFLCgskUqk09VQTVEFVzOCoKCqKDc3X882Wk0RIYvFgwLATabJVkLS4AdiRqwArIdnqbzpcAJz%2BoMw01vD5wFarAAMSPWKZjcxBnzRkPT6K98IT11TaJDjtOTrFfmgMGEHDxSxeK1VnLAYHNOw0qo6yaT%2BVVcD8PaTfb8ylspjgwBggU6UqwM6gcAAVmwqJweNSiov86kVi6sJ2th0ruRuB11nAWHBVNo0Mg4N3MDBdxFG6aAPQAPQPHXcADoAGpGQAEg-UU4HcJYyGQE5EF8AIgkURk4AAXgAPnxU0uEggB5Fhl1QYQYH-ABrVBuCodx-ECVB-wPd1UEZf9sGEWw2DQKjkEZFCUlNCJKBgDIsDgAADMBzxAhAaKCejXUYpZYKWJMjiUY8pJkuiGKmVBFKOJZVlU0TWUGEyb1oYSxOvFgOik5AlBpOylGrQooD-FgiFshB7LgfU-GnJjjNNSsIjLMt%2BCkBsXgi2hZAgdxGQxGL6EYZh2A3bgEqSyQhFEdpPFZLImhmVZ-3WCDhGQLBcj8RgwEWD8P2oEB-yoPwPxZVIFES8JwsodBbDcWqotSPjgSsbhzVyCg12yVAABVENQTq5iIWhcDGMZQgStD0LMoK5mCVQIHgMa5j1WlmHpElQgAYgAEQDXtcAAbjMi7BU5QtboAUQDH7omiPY3v4uALsVKU9Duv7omRH6fRB-iLoNI07sB6J-oDRHTQuu1oDRugfq%2BIm3ve-kWGgNArTgW7UDp7HzvJynzQ6ZBiVIu7kEldBhHQBnUguimoCp6kIDQTnkGQfmIgutmtSmmnAeRXBVgAIWlnxZbaNa3KsYjgEKO7VYDJNwxHaWyZpDyOj1zhDZp9B1kdx2NbB8nPNqYW7pHH2Ry%2BV3BY9sWZlu32ff9y2OmtmgJ31gg7r2ROscj63kAuB3VlQPZUAj01I5nEwYCj94Q-WVFy4D-kC6L0RxZpr5kSuH0k2ESuaWrroiIINmbvrvYvn74H89MIuaDynvz0Goharu8NVjnueLdBwOo9dVngFaFgJ2QO6rFWPe97bjoO9-ZAN6sLfUB3h30D54fC9XrB1837fWbp9tqdug-99WI%2BT9dO6ZcgHImlgoVkrJ-w91IlhRmNI6QMjuo9Z6R9Ppchpkme6qxcDrCHsvfkENpTe3ummfYR8UbYG1LdKE6xVjfCPnjT%2BZcNh0KMKDRqcB-ycNZGA00ol-xMFAFlF4IVnjdQMEAA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

</div>

---
layout: fact
growX: 50
growY: 120
growSize: 1.5
clicks: 1
---

<h1 transition duration-500 :class="$slidev.nav.clicks === 1 ? 'pa top-0 left-1/2 translate-x--1/2 scale-40 w-100vw op50!' : ''">
<span text-transparent text-8xl bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600>Good Work~!</span>
<br/>
<span text-7xl>UnoCSS so Friendly</span>
</h1>

<p v-click="1">
接下来，让我为你介绍核心功能<br/>
<span text-6xl animate-pulse text='$vp-c-brand'>Presets</span>
</p>

---
layout: cover
growX: 50
growY: 0
growSize: 1.5
---

# Presets

Uno 的灵活强大的工作能力来源于 `Presets`

<div class="number-bg">P</div>

<v-clicks>

- Uno preset - UnoCSS 的默认预设 (集成 Mini * Wind)
- Attributify preset - Enable Attributify mode
- Icon preset - Use any icon with Pure CSS.
- Typography preset - 排版系统
- Web Fonts preset - 使用 Web 字体预设
- etc. 更多预设见 [Official Presets](https://unocss.dev/presets) & [Community Presets](https://unocss.dev/presets/community)

</v-clicks>

---
layout: cover
growX: 50
growY: 100
growSize: 0.8
---

# PresetUno

<div v-click-hide >
PresetUno 是 UnoCSS 的默认预设

它集成 PresetMini & PresetWind 的**所有功能**
</div>
<div v-after>

[Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIDuAnBAHPAU23QD4AoKKUSWRFDAF0IA9GBabQkdgVgAZ%2BZAApckhRlACqAOwD2UACqEkjYAHpwEChq0Vy5IA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCqWEcAvnOlBCHAOQCujAYypVuAKFGoAHpFgoMAQ14AbeGkw58hYEQAUCUXHKUaMKgC44AbQOGj1Wgwh6btuAHo3KeVADWAfgtuASV5YW44AB8eEFRkYHlwqIARbx8AWQg0AGVUJVQBGGgqF1tkVMDg0JESEsNa9095GBgoYAAjXhhgdABPAAUaXmQIALgAIQgIPPkseqaW9s7u-sHhi3R5JRoa1zrdhrgAN294try%2BykxJUaoFrCJ649b5M9QLjGBJQP4AWm4d3b1Dx2K43O5ESJwW6te6WAC6QM8FA%2BXx4v3%2B9URIKU2gAFjBRm1JtNZvtkegcUR8RYWrxUCVmABKAFwgFUXHQGACTrmRAlADuUHkYDAqCggX5PwAjAAGGWHflwXHSuWHXFsPKSODAGCoEBUH4CVBYXVQOAAK14t2WhuNprEhmYoiZoiAA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

</div>

<div class="number-bg">Un</div>

---
layout: cover
growX: 0
growY: 50
growSize: 1.5
---

# PresetAttributify
Attributify Mode

<div v-click="1">

```ts {monaco-diff}
<button class="px-4 py-2 rounded b b-red text-xl text-white">
  Button
</button>
~~~
<button
  p="x-4 y-2" rounded
  b="~ red"
  text="xl white"
>
  Button
</button>
```

</div>

<div v-click="2">

[PLayground](https://unocss.dev/play/?html=DwEwlgbgBA7gTgQwA5IKZwHwCgpVJKAF1QA9CBaAYgDNaoMoAFOVAZ1UKgEFDC4wARgFdCYagE88AenARswGZGxYsQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAJIBjAlT6UaMAKpYIcAL5x0UCCDgByNnOFUqGgFAHUAD0iwUGAIZsANvDSYc%2BQsCIAKBAbhwqAC2gYYQ4qAC5Ebx84AHcoKzAwVChwjWiAWgBGAAYsgDdouD9MnNy-ZVtTOGAYVBAqNOFULBqoOAArNipOHgamlo0SSIVBn34pMLgAbUjRyVpZCHcAShGosdoGJlYOLm5PGaiAekOfACo4AHksW244Iiakqxq4XABlV%2BVoOCet9m7br7CWxWPQHHzHXxbYQwAD84RYEAgFSsWDBcDRELg5wAAo4bPZNNo0oYokcTvxMCY4ZDmFgiGiMScsZdrrcQE9hGV0F8KcATKhkN9GMw-tRGeRKJSBVcbtSEUjUCiGaTwUzzq82AlAnB2UE-NgiHA5Fg0rkrLY2AKhb8OGKVXBMadxcyAGJfUxWcAVZ3nAAG-r8MBAth9cAAPMhgLkdTA0gAmB0APlD-t9PtDuOsdngTEtPsO4uNADVzZbkJsRba5Yjkaj7aG6HBbMAunAIOhrZWalQ4DB5CxUFUiHJKIKVGo4KYmFZoQaAHTitwj1AV7bd6ldWlESYAXSM9ohkw0udQGh3bdaR7P4pPABUIAA5Agli0C6sKpWkhQrSI7wbfgwgA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

</div>

<div v-click="3">

[TypeScript support (JSX/TSX)](https://unocss.dev/presets/attributify#typescript-support-jsx-tsx)

</div>

<div class="number-bg">A</div>

---
layout: cover
growX: 110
growY: -10
---

# PresetIcon
用纯 css 去使用任意图标

<div class="number-bg">Icon</div>

<div v-click="1" v-show="$slidev.nav.clicks === 1"      >

```bash
npm i -D @iconify-json/[the-collection-you-want]
```

```ts
export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```

</div>

<div fsc gap-20 w-full of-hidden v-show="[2,3].includes($slidev.nav.clicks)">

<div v-click="2" :class="$slidev.nav.clicks === 3 ? 'w-400px' : ''">

```html
<div fcc gap-4 text-5xl>
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-fluent-emoji-confused-face" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-unocss text-6xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
</div>
```

</div>

<div v-click="3" fcc gap-4 text-5xl>
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-fluent-emoji-confused-face" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large UnoCSS logo -->
<div class="i-logos-unocss text-6xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
</div>

</div>

---
layout: two-cols
growX: 90
growY: 90
growSize: 1.5
---

# PresetIcon
强大 Icon 使用集成能力

<div class="number-bg">Icon</div>

<v-clicks>

- Render Mode
- 自动引入图标集 (Node env)
- CDN
- Load 本地/网络资源
- [Documentation](https://unocss.dev/presets/icons)

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">
Uno Icon 渲染模式 分为：`mask` `background`, 默认为`mask`

```css
.icon {
  '--un-icon': url,
  '-webkit-mask': 'var(--un-icon) no-repeat',
  'mask': 'var(--un-icon) no-repeat',
  '-webkit-mask-size': '100% 100%',
  'mask-size': '100% 100%',
  'background-color': 'currentColor',
  // for Safari https://github.com/elk-zone/elk/pull/264
  'color': 'inherit',
}
```

你也可以指定 Uno Icon 的生成规则
```html
<div class="i-logos-unocss?mask text-6xl" />
<div class="i-logos-unocss?bg text-6xl" />
```
<div fsc gap-10 mt-2>
<div class="i-logos-unocss?mask text-6xl" />
<div class="i-logos-unocss?bg text-6xl" />
</div>

</div>

<div v-show="$slidev.nav.clicks === 2">

#### Auto import

你在使用 `iconify` 图标集合时，你不必在预设中再次注册图标集合`collection`，而导致图标资源加载失败。

依赖于上流 `iconify` 的能力, `Uno` 在解析规则时，会去自动搜索`已安装`的`iconify dataset`，创建对应集合的 `loader`

```ts {monaco-diff}
presetIcons({
  collections: {
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
    mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
    logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
  }
})
~~~
presetIcons({

})
```

</div>

<div v-show="$slidev.nav.clicks === 3">

#### CDN
如果你更喜欢从 CDN 获取它们，您可以指定选项 `cdn`。

我们推荐 `esm.sh` 作为 CDN 提供商。

```ts
presetIcons({
  cdn: 'https://esm.sh/'
})
```

[Interactive Docs](https://unocss.dev/interactive/)

</div>

<div v-show="$slidev.nav.clicks === 4">

#### 加载本地/网络资源
如果你的本地存在图标资源，你可以通过 Node 将其注册 图标预设的 `collections` 中。

```ts
collections: {
  'my-icons': {
    account: '<svg><!-- ... --></svg>',
    settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
  },
  'my-other-icons': async (iconName) => {
    return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
  },
  'my-yet-other-icons': FileSystemIconLoader(
    './assets/icons',
    svg => svg.replace(/#fff/, 'currentColor')
  )
}
```

##### Usage

```html
<div i-my-icons-account />
<div i-my-icons-settings />
<div i-my-other-icons-[iconName] />
<div i-my-yet-other-icons-[iconName] />
```

</div>

---
layout: cover
---

# PresetTypography
呵护你的 HTMl 排版布局

<v-clicks>

- [内置所有标签样式](https://github.com/unocss/unocss/blob/main/packages/preset-typography/src/preflights/default.ts)
- [丰富的颜色集成](https://github.com/unocss/unocss/blob/main/packages/preset-typography/src/preflights/default.ts)
- cssExtend 样式覆盖
- 兼容性
- [Playground](TODO)

</v-clicks>

<div class="number-bg">TG</div>

---
layout: two-cols
growX: 50
growY: 100
growSize: 1.1
---

# PresetWebFonts
让字体变得更加简单

<div class="number-bg">FT</div>

<v-clicks>

- Usage
- Custom Fetch
- [Playground](https://unocss.dev/play/?html=DwEwlgbgBA7gTgQwA5IKZwHwCgpVJKAMwHsA7AFwFoBbM4jAVVOIGEBlNqAXh6idY7AA9OAjZho7EA&config=JYWwDg9gTgLgBAbwFBzgEwKYDNgDsMDCEuOA5gDQpxhQYDOGMAgjDFMAEYCuMwWAnpVQ16jAJIBjYnSHVaDGAFVcEWSIUB1DBwBixGDKQBfOFigQQcAORcVEunStIkGAB6RY6bAEMuAG3hMHHwiEmBSAApkVDoAC2gYCR46AC5EKlQAdyhvMDAMKDSrTIBaAEYABgqAN0y4WPKq6tjTPzc4YBgMEDoSiQxcLqg4ACsuOl4BPoGhq1kjNXlGVLgAbQy5USUVCIBKWWEl5lZ2bkn%2BPYPNhUlpKI2YiW82tLKAOgAmK9QJNFwi2KsMCpAD0IPoIDecRBcw2Rn2G3UjC0un0dHuqExpjRaWiWMxdG8uBWVgAShAOBAYBBYfjMSBiBA0qsrDpgDk4ERMHNrGyOQBZRkpAAsVXIAHYqlYALrfOALB5wMEdXB%2BPAYMTgBIrLDPBhwhGoWXGXZIIA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

</v-clicks>

::right::

<div v-show="$slidev.nav.clicks === 1">

#### Usage

[Google Fonts](https://fonts.google.com/) & [Font Share](https://www.fontshare.com/) & etc.

```ts
presets: [
  presetWebFonts({
    provider: 'google',
    fonts: {
      sans: 'Roboto',
      mono: ['Fira Code', 'Fira Mono:400,700'],
    }
  })
]
```
<br/>
```html
<div font-mono> Fira Code font display: === -> >= !=  </div>
```
<br/>
<div font-mono> Fira Code font display: === -> >= !=  </div>

</div>

<WhenClickShow :index="2">

#### Custom Fetch

如果你遇到 load `fonts` 被墙的情况，你可以通过自定义 `fetch` 选项来自定义字体资源的获取方式。

```ts
presetWebFonts({
  // use axios with an https proxy
  customFetch: (url: string) => axios.get(url, { httpsAgent: new ProxyAgent('https://localhost:7890') }).then(it => it.data),
  provider: 'google',
  fonts: {
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
  },
}),
```

</WhenClickShow>

---
layout: center
growX: 50
growY: 0
class: text-center
---

<div :class="$slidev.nav.clicks === 3 ? 'children-text-3xl! op-35 pa w-full top-10 left-1/2 translate-x--1/2 transition duration-350 space-y-5' : 'space-y-10'">

<div class="text-7xl lh-18 font-bold">
好耶 <span class="">🎉</span>～
</div>

<div v-click="1"
 class="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red to-purple">
UnoCSS(Hero) + Presets (红 Buff)
<span v-show="[2,3].includes($slidev.nav.clicks)" v-click="2">+ __?__ (蓝 Buff) </span>
</div>

</div>

<h2 v-click="3" font-mono class="!text-7xl !lh-18 font-bold">
? === <span text="$vp-c-brand">Transformer</span>
</h2>

---
layout: center
---

# Transformer 转换器
为你的代码增添一点魔法

<v-clicks depth="2">

- 工作原理
  - Vite Plugin Transform
  - Cli Transform
  - etc.
- Official Transformers
  - [Directives transformer](https://unocss.dev/transformers/directives)
  - [Variant group transformer](https://unocss.dev/transformers/variant-group)
  - [Compile class transformer](https://unocss.dev/transformers/compile-class)
  - etc.

</v-clicks>

---
layout: two-cols
growX: 0
growY: 110
---

# Directives transformer
UnoCSS 指令让 css 变的简单

<div class="number-bg">D</div>

<v-clicks depth="2">

- `@apply`
  - applyVariable
- `@screen`
- `theme()`

</v-clicks>

::right::

<WhenClickShow :index="1">

#### `@apply`
直接在 css 文件中使用 `@apply` 指令，可以将 UnoCSS 的样式应用到你的 css 中。

```css
/* style.css */
.btn {
  @apply px-2 py-1 rounded-md bg-blue-500 text-white;
}
```
在打包后将会被转换为
```css
.btn {
  --un-bg-opacity: 1;
  --un-text-opacity: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 0.375rem;
  background-color: rgba(59, 130, 246, var(--un-bg-opacity));
  color: rgba(255, 255, 255, var(--un-text-opacity));
}
```

</WhenClickShow>

<WhenClickShow :index="2">

#### `@apply`
直接在 css 文件中使用 `@apply` 指令，可以将 UnoCSS 的样式应用到你的 css 中。

```css
/* style.css */
.btn {
  /* some lint error with `@apply` */
  @apply px-2 py-1 rounded-md bg-blue-500 text-white;
}
```

<br />

#### applyVariable

```ts
{
  // ...other options
  applyVariable: ['--at-apply', '--uno-apply', '--uno']
}
```

Then

```css
.btn {
  --uno: px-2 py-1 rounded-md bg-blue-500 text-white;
}
```

</WhenClickShow>

<WhenClickShow :index="3">

#### `@screen`
使用`@screen`轻松书写媒介查询style。

断点名称来自于 `theme.breakpoints`。

```css
/* style.css */
.grid {
  --uno: grid grid-cols-2;
}
@screen xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen sm {
  .grid {
    --uno: grid-cols-3;
  }
}
/* ... */
```

[Documention](https://unocss.dev/transformers/directives#screen)

</WhenClickShow>

---
layout: cover
growX: 90
growY: 10
---

# Variant group transformer

<div class="number-bg">V</div>

<WhenClickShow :index="1">

<div v-show="$slidev.nav.clicks === 1" v-click="1" key='vgt-1'>

```html
<button class="px-4 py-2 text-xl text-red rounded hover-bg-red hover-text-white ···">Button</button>
```

臃肿，不易维护

如何隐式优化？

</div>

</WhenClickShow>

<WhenClickShow :index="2">

<div v-show="$slidev.nav.clicks === 2" v-click="2" key='vgt-2'>

<!-- @unocss-skip-start -->
```html
<button class="p-(x-4 y-2) text-(xl red) rounded hover-(bg-red text-white) ···">Button</button>
```
<!-- @unocss-skip-end -->

清晰阅读，易维护

在 build 阶段，将会被转换为：

```html
<button class="p-(x-4 y-2) text-(xl red) rounded hover-(bg-red text-white) ···">Button</button>
```

将「关注点」放在书写逻辑上，而不是样式上

</div>

</WhenClickShow>

---
layout: cover
growX: 20
growY: 40
growSize: 0.8
---

# Compile class transformer
编译组合多个类名到一个类名，化繁为简

<div class="number-bg">C</div>

<div v-show="$slidev.nav.clicks < 4">

<div  v-click="1"  key='cct-1'>

```html
<button class="px-4 py-2 text-xl text-red rounded hover-bg-red hover-text-white ···">Button</button>
```

太多的类名，难以阅读

</div>

<div v-click="2">如何优化？</div>

<div v-click="3" key='cct-2'>

你只需要在类名前加上 `:uno:` 即可

```html {monaco-diff}
<button class="px-4 py-2 text-xl text-red rounded hover-bg-red hover-text-white ···">Button</button>
~~~
<button class=":uno: px-4 py-2 text-xl text-red rounded hover-bg-red hover-text-white ···">Button</button>
```

在 build 阶段，将会被转换为：

```html
<button class="uno-qlmcrp">Button</button>
```

</div>

</div>

<div v-click="4">

你还可以自定义 `trigger`、`prefix`、`hash` ...

[Options](https://github.com/unocss/unocss/blob/main/packages/transformer-compile-class/src/index.ts#L4)

</div>

---
layout: intro
growX: 50
growY: 50
class: text-center
---

# Congrats！ 🎉

---
layout: two-cols
growX: 50
growY: 120
---

# Issues / Discussions
实践是检验真理的唯一标准

<div class="number-bg">I/D</div>

<v-clicks>

- [Dynamic Class](https://github.com/unocss/unocss/issues?q=dynamic+class)
- Differences from tailwind
- Single File Configration
- Magic comment
- AutoComplete
- Preset Useful
- Preset for your Team
- etc.

</v-clicks>

::right::

<WhenClickShow :index="1">

### Dynamic Class

错误用例

```vue
<script setup lang="ts">
const foo = `bg-${Math.random() > 0.5 ? 'red' : 'blue'}`
</script>
<template>
  <div :class="foo">
    Dynamic class in Vue template
  </div>
</template>
```

Uno 是静态模板提取，如何处理动态类名？

Workaround

```ts
{
  safelist: ['bg-red', 'bg-blue']
}
```

```ts
const foo = Math.random() > 0.5 ? `bg-red' : 'bg-blue'
```

</WhenClickShow>

<WhenClickShow :index="2">

# ~~Tailwindcss~~
我故意保留了一部分 Tailwind 的味道，但比它更香

由于 UnoCSS 与 Tailwind 有着相似的行为逻辑。但保证框架的唯一性，所以在设计上有着一些不同。

包括但不限于：

```html {monaco-diff}
<div class="grid-cols-[200px,minmax(90px,1fr),auto]">
  With bracket in Tailwind
</div>
~~~
<div class="grid-cols-[200px_minmax(90px,1fr)_auto]">
  With bracket in UnoCSS
</div>
```

```ts {monaco-diff}
extend: {
  spacing: {
    test: '200px',
  },
},
~~~
spacing: {
  test: '200px',
},
```

```ts
{
  presets: [presetUno({ prefix: 'tw-' })]
}
```

</WhenClickShow>

<WhenClickShow :index="3">

### uno.config.ts
停止懒惰，拥抱单文件配置

`UnoCSS` 通过 `unconfig` 尽可能读取你的 `Uno` 配置。

但为了结合 `VsCode extension` 的智能提示有更好的体验，请单独创建配置文件。

<br/><br/><br/><br/><br/><br/><br/>

> 别问为什么，用就完事儿了 🤣

</WhenClickShow>

<WhenClickShow :index="4">

### Magic Comment

Uno 默认从 `.jsx`, `.tsx`, `.vue`, `.md`, `.html`, `.svelte`, `.astro` 和一些被按需引入的`.js` `.ts` 中提取 `utilities`。

但有时候我们需要在其他文件中使用 `utilities`，这时候就需要使用 `magic comment` 标记该文件。

### `@unocss-include` `@unocss-ignore`

```css
/* other.style.css */

/* @unocss-include */ 标记此文件会被提取 utilities
/* @unocss-ignore */ 忽略此文件，不会被提取 utilities
.btn {
  @apply px-2 py-1 rounded-md bg-blue-500 text-white;
}
```

[New Feature](https://github.com/unocss/unocss/issues/2761)

</WhenClickShow>

<WhenClickShow :index="5">

### 自动填充

Uno 内置 `utilities` 智能补全、自动填充。

- Rules
- Variants
- Shortcuts
- ...

当你在自定义它们的时候，可以在 `uno.config.ts` 中配置 `autoComplete` 选项。

[Playground](https://unocss.dev/play/?html=DwEwlgbgBA7gTgQwA5IKZwHwCgpVJKAF1QGdCBaBAIwGMjSKBGADgwFUA7AewGEBlPsAD04CNmGjsQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAJIBjAlT6UaMAKpYIcAL5x0UCCDgByNnOFUqGgFAHUAD0iwUGAIZsANvDSYc%2BQsCIAKBAbhwqAC2gYYQ4qAC5Ebx84AHcoKzAwVChwjWiAWgBGAAYsgDdouD9MnNy-ZVtTOGAYVBAqNOFULBqoOAArNipOHgamlo0SSIVBnyg7anCAbUifSY0arrSrFmEBxDhRW2gUymQNRQBdEajJgHoAPQWYNPcAHWQAagBKABJTsndJsmQDp7gAXgAfHBPJp0ARrlRgAAvVAacIAAxeCGQCjAJgRiieZC8USiNhgEFE4AqNRSVzSAB4sGwQIDDHiFEdIsyfPwpGE4NM8ezaLIIO5sTNyJJaAwmKwOFxuILjmzRTARGJPMKfFRhFYKuEMgA6ABMcqiwmQWBSfkYYDCp1O1BAOv8pwGwoUQp8zJdBiAA&css=Q&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwF8g)

</WhenClickShow>

<WhenClickShow :index="6">

### Preset Useful

✨ [My own preset](https://github.com/zyyv/unocss-preset-useful) ✨

提取你实用的 `utilities` 到 any project

```bash
pnpm add -D [yourname]/unocss-preset-useful
```

```ts
import { defineConfig } from 'unocss'
import { presetUseful } from '[yourname]/unocss-preset-useful'

export default defineConfig({
  presets: [
    // ...
    presetUseful(),
  ],
})
```

<div text="$vp-c-brand" mt-10>
如果你也和我一样，那么我觉得这件事情 __ __ __ !
</div>

</WhenClickShow>

<WhenClickShow :index="7">

### Preset for your `team`/`company`/`framework`

为自己团队打造良好的 `CSS` 开发体验

- Theme
- Rules
- Shortcuts
- Variant

[一个不太成熟的Demo: Onu UI](https://github.com/onu-ui/onu-ui/tree/main/packages/preset)

</WhenClickShow>

---
layout: center
growX: 50
growY: 0
---

<h1 font-mono text="6xl!" text-transparent text-8xl bg-clip-text bg-gradient-to-br from-blue-500 to-pink-600>One More Thing</h1>

<v-clicks>

- [Interactive Docs](https://unocss.dev/interactive/) - 交互式文档
- [Playground](https://unocss.dev/interactive/) - 在线 Playground
- Inspector - UnoCSS 检查器

</v-clicks>

---
layout: intro
class: text-center pb-5
growX: 50
growY: 120
---

# Thank You!

特别感谢 [@antfu](https://github.com/antfu)、 [@slidev](https://github.com/slidevjs/slidev)、 [@unocss](https://github.com/unocss/unocss)

Slides on [talks.zyob.top](https://talks.zyob.top/)
