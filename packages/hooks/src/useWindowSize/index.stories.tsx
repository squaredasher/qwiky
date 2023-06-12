import { component$ } from "@builder.io/qwik";
import { useWindowSize } from ".";

const Test = component$(() => {
  const {width, height} = useWindowSize();
  return (
    <div>
      <span>This does not seems to work in Storybook</span>

      Window Height: {width.value} x {height.value}
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseWindowSize = {
  name: "useWindowSize",
};
