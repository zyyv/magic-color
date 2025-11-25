<template>
  <header pt-2 sticky fcc top-0 z-1>
    <hgroup w="75%" nav-bg fcc py-6>
      <h1 text-4xl fw-600 text-transparent bg-clip-text bg-linear-to-r from-purple to-red fcc gap-2>
        <img inline-block w-10 src="/logo.svg" alt="logo">
        <span>
          Magicolor
        </span>
      </h1>

      <div pa right-10 fcc gap-6>
        <button
          i-carbon-light
          dark:i-carbon-moon
          icon-btn
          title="Toggle Color Mode"
          @click="toggleDark"
        />
        <a
          i-carbon-logo-github icon-btn
          href="https://github.com/zyyv/magic-color"
          target="_blank"
          title="GitHub"
        />
      </div>
    </hgroup>
  </header>
</template>
