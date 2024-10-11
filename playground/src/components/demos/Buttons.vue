<template>
  <div>
    <h3 mb-1>
      Buttons
    </h3>
    <div grid="~ cols-3 gap-4">
      <div space-y-3 rd-md b="~ #ccc:40 dark:#3c3c3c:40" p2>
        <button btn bg="$color-500 hover:$color-600 active:$color-700" text="$color-50">
          Default
        </button>
        <button btn bg="$color-600" text="$color-50">
          Hover
        </button>
        <button btn bg="$color-700" text="$color-50">
          Active
        </button>
        <button btn bg="$color-950" text="$color-700">
          Disabled
        </button>
      </div>
      <div space-y-3 rd-md b="~ #ccc:40 dark:#3c3c3c:40" p2>
        <button btn-outline b="~ $color-500 hover:$color-600 active:$color-700" text="$color-500 hover:$color-600 active:$color-700">
          Outline
        </button>
        <button btn-outline b="~ $color-600" text="$color-600">
          Hover
        </button>
        <button btn-outline b="~ $color-700" text="$color-700">
          Active
        </button>
        <button btn-outline b="~ $color-900" text="$color-900">
          Disabled
        </button>
      </div>
      <div space-y-3 rd-md b="~ #ccc:40 dark:#3c3c3c:40" p2>
        <button btn-ghost bg="hover:$color-600 active:$color-700" text="$color-500 hover:$color-50 active:$color-50">
          Ghost
        </button>
        <button btn-ghost bg="$color-600" text="$color-50">
          Hover
        </button>
        <button btn-ghost bg="$color-700" text="$color-50">
          Active
        </button>
        <button btn-ghost text="$color-900">
          Disabled
        </button>
      </div>
    </div>
  </div>
</template>
