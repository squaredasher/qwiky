import type { Signal } from '@builder.io/qwik'
import { $, useSignal, useVisibleTask$ } from '@builder.io/qwik'

interface UseFocusOptions {
  initialValue?: boolean
}

export function useFocus<T extends HTMLElement = HTMLDivElement>(
  ref: Signal<T | undefined>,
  options: UseFocusOptions = {},
) {
  const { initialValue = false } = options
  const focused = useSignal(initialValue)

  const onFocus = $(() => focused.value = true)
  const onBlur = $(() => focused.value = false)

  useVisibleTask$(({ cleanup }) => {
    if (ref.value) {
      ref.value.addEventListener('focus', onFocus)
      ref.value.addEventListener('blur', onBlur)

      cleanup(() => {
        ref.value?.removeEventListener('focus', onFocus)
        ref.value?.removeEventListener('blur', onBlur)
      })
    }
  })

  return {
    focused,
  }
}
