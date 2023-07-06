import { $, noSerialize, useComputed$, useOnDocument, useSignal, useVisibleTask$ } from '@builder.io/qwik'
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
  const ranges = useComputed$<Range[]>(() => selection.value ? getRangesFromSelection(selection.value) : [])
  // eslint-disable-next-line qwik/valid-lexical-scope
  const rects = useComputed$(() => ranges?.value.map(range => range.getBoundingClientRect()))

  useOnDocument('selectionchange', $(() => {
    selection.value = noSerialize(undefined)
    if (window)
      selection.value = noSerialize(window.getSelection() || undefined)
  }))

  return {
    text,
    ranges,
    rects,
    selection,
  }
}
