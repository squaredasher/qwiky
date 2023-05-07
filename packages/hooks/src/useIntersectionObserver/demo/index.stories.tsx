import { component$, useStylesScoped$, useSignal } from "@builder.io/qwik";
import { useIntersectionObserver } from '../index'

import styles from './styles.css?inline';

const Test = component$(() => {
  useStylesScoped$(styles);
  const targetRef = useSignal<HTMLElement>()
  const rootRef = useSignal<HTMLElement>()
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

export default {
  title: "Hooks",
  component: Test,
};

export const UseIntersectionObserver = {
  name: "useIntersectionObserver",
};
