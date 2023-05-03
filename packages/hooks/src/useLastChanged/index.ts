import type { Signal } from '@builder.io/qwik'
import { useSignal, useTask$ } from '@builder.io/qwik'
import { timestamp } from '../utils'

export function useLastChanged(source: Signal) {
  const ms = useSignal<number | null>(null)

  useTask$(({ track }) => {
    track(() => source.value)

    ms.value = timestamp()
  })

  return ms
}
