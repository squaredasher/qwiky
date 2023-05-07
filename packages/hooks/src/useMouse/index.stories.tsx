import { component$, useSignal } from "@builder.io/qwik";
import { useMouse } from ".";

const Test = component$(() => {
  const boundRef = useSignal<HTMLElement>();
  const { x, y } = useMouse(boundRef);
  return (
    <div class="flex gap-x-4">
      <div class="h-96 w-96 bg-slate-300" ref={boundRef}></div>
      <div>
        <p>x: {x.value}</p>
        <p>y: {y.value}</p>
      </div>
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseMouse = {
  name: "useMouse",
};
