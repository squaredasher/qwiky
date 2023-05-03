import { Signal, untrack } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  useNetwork,
  useIdle,
  useHover,
  useLastChanged,
  useTitle,
  useTextSelection,
  useMediaQuery,
  useMouse,
} from "@qwiky/hooks";

function usePrevious<T>(value: Signal<T>): Signal<T | undefined> {
  const ref = useSignal<T>();

  untrack

  useTask$(({ track }) => {
    track(() => {
      ref.value = value.value;
      return value.value;
    });
  });

  return ref;
}

export default component$(() => {
  const test = useSignal("test");
  const previous = usePrevious(test);
  const hoverableRef = useSignal<HTMLButtonElement>();
  const boundRef = useSignal<HTMLElement>();
  const network = useNetwork();
  const isIdle = useIdle(1000);
  const hovered = useHover(hoverableRef);
  const lastChanged = useLastChanged(test);
  const selectedText = useTextSelection();
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isLight = useMediaQuery("(prefers-color-scheme: light)");
  const { x, y } = useMouse(boundRef);
  useTitle(test);

  return (
    <>
      <textarea>{JSON.stringify(network)}</textarea>
      <div>{isIdle.value ? "" : "not"} idle</div>

      <button ref={hoverableRef}>Hover over me</button>
      <div>button {hovered.value ? "hovered" : "not hovered"}</div>

      <input type="text" bind:value={test} />
      <div>
        {lastChanged.value} {test.value} {previous.value}
      </div>

      <div>Selected: {selectedText.text.value || "nothing"}</div>

      <div>{isDark.value ? "dark" : "not dark"}</div>
      <div>{isLight.value ? "light" : "not light"}</div>

      {/* <IntersectionDemo></IntersectionDemo> */}

      <div class="h-96 w-96 bg-slate-300" ref={boundRef}></div>
      <div>
        {x.value} x {y.value}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
