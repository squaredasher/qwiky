import type { NoSerialize, Signal } from '@builder.io/qwik'
import { noSerialize, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { unSignal } from '../utils'

export interface UseIntersectionObserverOptions {
  /**
   * Start the IntersectionObserver immediately on creation
   *
   * @default true
   */
  immediate?: boolean

  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   */
  root?: Signal<HTMLElement | undefined>

  /**
   * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
   */
  rootMargin?: string

  /**
   * Either a single number or an array of numbers between 0.0 and 1.
   */
  threshold?: number | number[]
}

export function useIntersectionObserver<T extends HTMLElement = any>(
  ref: Signal<T | undefined>,
  options: UseIntersectionObserverOptions = {},
) {
  const {
    root,
    rootMargin = '0px',
    threshold = 0.1,
    immediate = true,
  } = options
  const entry = useSignal<NoSerialize<IntersectionObserverEntry>>()
  const isActive = useSignal(immediate)

  useVisibleTask$(({ cleanup, track }) => {
    track(() => [ref.value, root?.value])
    let observer: IntersectionObserver | undefined

    if (!isActive.value) {
      observer && observer.disconnect()
      observer = undefined
      return
    }

    if (observer) {
      observer.disconnect()
      observer = undefined
    }

    observer = new IntersectionObserver(([_entry]) => {
      entry.value = noSerialize(_entry)
    }, {
      root: unSignal(root),
      rootMargin,
      threshold,
    })

    ref.value && observer.observe(ref.value)

    cleanup(() => {
      observer && observer.disconnect()
      observer = undefined
    })
  })

  return entry
}
