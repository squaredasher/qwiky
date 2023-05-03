import { $, useOnWindow, useSignal } from '@builder.io/qwik'

export function useActiveElement<T extends HTMLElement>() {
  const activeElement = useSignal<T | null>(null)

  useOnWindow('focusin', $(() => {
    activeElement.value = document?.activeElement as T | null
  }))

  useOnWindow('focusout', $(() => {
    activeElement.value = null
  }))

  return activeElement
}
