import { $, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export function useWindowFocus() {
  const focused = useSignal(false)

  useVisibleTask$(() => {
    focused.value = window.document.hasFocus()
  })

  useOnWindow('blur', $(() => {
    focused.value = false
  }))

  useOnWindow('focus', $(() => {
    focused.value = true
  }))

  return focused
}
