import { component$, useSignal } from "@builder.io/qwik";
import { useLastChanged } from ".";

const Test = component$(() => {
  const test = useSignal("Hello");
  const lastChanged = useLastChanged(test);
  return (
    <>
      <div class="">
        <input type="text" class="rounded" placeholder='Type something' bind:value={test} />

        <div class="mt-2">
          Last changed: <strong>{lastChanged.value}</strong>
        </div>
      </div>
    </>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseLastChanged = {
  name: "useLastChanged",
};
