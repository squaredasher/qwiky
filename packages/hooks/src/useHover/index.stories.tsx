import { useHover } from "./index";
import { component$, useSignal } from "@builder.io/qwik";

const Test = component$(() => {
  const hoverableRef = useSignal<HTMLElement>();
  const hovered = useHover(hoverableRef);
  return (
    <div>
      <button class="bg-sky-500 px-4 py-2 rounded-md text-white " ref={hoverableRef}>
        {!hovered.value ? "Hover me" : "Thank you!"}
      </button>
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseHover = {
  name: "useHover",
};
