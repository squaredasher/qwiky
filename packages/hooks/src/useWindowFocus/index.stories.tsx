import { component$ } from "@builder.io/qwik";
import { useWindowFocus } from ".";

const Test = component$(() => {
  const focused = useWindowFocus();
  return (
    <div>
      <p>{focused.value ? 'Click somewhere outside of the document to unfocus' : 'Tab is unfocused'}</p>
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseWindowFocus = {
  name: "useWindowFocus",
};
