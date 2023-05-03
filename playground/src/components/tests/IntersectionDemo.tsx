import { $, component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { useIntersectionObserver } from "@qwiky/hooks";
import styles from './styles.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const targetRef = useSignal<HTMLDivElement>()
  const rootRef = useSignal<HTMLDivElement>()
  const entry = useIntersectionObserver(targetRef, {
    root: rootRef,
    threshold: 1,
  })
  return (
    <div>
      <button>
        Pause
      </button>
      <div ref={rootRef} class="root">
        <p class="notice">
          Scroll me down!
        </p>
        <div ref={targetRef} class="target">
          <p>Hello World!</p>
        </div>
      </div>
      <div>
        <p>Is visible: {entry.value?.isIntersecting ? 'yes' : 'no'}</p>
      </div>
    </div>
  )
})
