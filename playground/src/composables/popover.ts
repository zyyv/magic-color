export function usePopoverHover(popover: Ref<any>) {
  let timer: any

  function onMouseEnter(event: Event) {
    if (timer)
      clearTimeout(timer)
    popover.value?.show(event)
  }

  function onMouseLeave() {
    timer = setTimeout(() => {
      popover.value?.hide()
    }, 100)
  }

  function onContentMouseEnter() {
    if (timer)
      clearTimeout(timer)
  }

  function onContentMouseLeave() {
    timer = setTimeout(() => {
      popover.value?.hide()
    }, 100)
  }

  return {
    onMouseEnter,
    onMouseLeave,
    onContentMouseEnter,
    onContentMouseLeave,
  }
}
