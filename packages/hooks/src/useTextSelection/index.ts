import { $, noSerialize, useComputed$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import type { NoSerialize } from '@builder.io/qwik'

function getRangesFromSelection(selection: Selection) {
  const rangeCount = selection.rangeCount ?? 0
  const ranges = new Array(rangeCount)
  for (let i = 0; i < rangeCount; i++) {
    const range = selection.getRangeAt(i)
    ranges[i] = range
  }
  return ranges
}

export function useTextSelection() {
  const selection = useSignal<NoSerialize<Selection>>()
  const text = useComputed$(() => selection.value?.toString() ?? '')
  const ranges = noSerialize(useComputed$<Range[]>(() => selection.value ? getRangesFromSelection(selection.value) : []))
  const rects = useComputed$(() => ranges?.value.map(range => range.getBoundingClientRect()))

  const onSelectionChange = $(() => {
    selection.value = noSerialize(undefined)
    if (window)
      selection.value = noSerialize(window.getSelection() || undefined)
  })

  useVisibleTask$(({ track, cleanup }) => {
    track(() => selection.value)

    document.addEventListener('selectionchange', onSelectionChange)

    cleanup(() => document.removeEventListener('selectionchange', onSelectionChange))
  })

  return {
    text,
    ranges,
    rects,
    selection,
  }
}
