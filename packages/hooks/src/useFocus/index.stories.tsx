import { useFocus } from "./index";
import { component$, useSignal } from "@builder.io/qwik";

const Test = component$(() => {
  const focusableRef = useSignal<HTMLInputElement>();
  const { focused } = useFocus(focusableRef);
  return (
    <div>
      <input class="border px-4 py-2 rounded-md " ref={focusableRef} type="email"/>

      {focused.value && <div>Focused</div>}
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseFocus = {
  name: "useFocus",
};
