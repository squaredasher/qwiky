import type { Signal } from '@builder.io/qwik'
import { $, useOnDocument, useSignal } from '@builder.io/qwik'

export function useDocumentVisibility(): Signal<DocumentVisibilityState> {
  const visibility = useSignal<DocumentVisibilityState>('visible')

  useOnDocument('visibilitychange', $(() => {
    visibility.value = document.visibilityState
  }))

  return visibility
}
