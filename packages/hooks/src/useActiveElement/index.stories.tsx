import { useActiveElement } from "./index";
import { component$, useComputed$ } from "@builder.io/qwik";

const Test = component$(() => {
  const activeElement = useActiveElement();
  const key = useComputed$(() => activeElement.value?.dataset?.id || "null");
  return (
    <div class="max-w-md">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-2">
        {Array(4)
          .fill(1)
          .map((_, index) => (
            <input data-id={index} type="text" key={index} class="rounded" placeholder={`Input ${index}`} />
          ))}
      </div>
      <div class="mt-2">
        Current Active Element:
        <span class="text-green-500"> {key}</span>
      </div>
    </div>
  );
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseActiveElement = {
  name: "useActiveElement",
};
