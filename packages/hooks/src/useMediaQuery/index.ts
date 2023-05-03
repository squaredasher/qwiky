import { useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'

const MEDIA = new Map<string, MediaQueryList>()

function getMediaMatcher(query: string): MediaQueryList {
  const media = MEDIA.get(query)
  if (media)
    return media

  const newMedia = window.matchMedia(query)
  MEDIA.set(query, newMedia)
  return newMedia
}

export function useMediaQuery(query: string) {
  const state = useSignal(false)

  useVisibleTask$(({ cleanup }) => {
    const media = getMediaMatcher(query)
    const callback = () => {
      state.value = media.matches
    }
    callback()
    media.addEventListener('change', callback)
    cleanup(() => media.removeEventListener('change', callback))
  })

  return state
}
