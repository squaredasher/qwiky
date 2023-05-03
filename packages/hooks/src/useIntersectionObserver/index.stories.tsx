import { component$ } from "@builder.io/qwik";

const Test = component$(() => {
  return <>Hello</>
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseIntersectionObserver = {
  name: "useIntersectionObserver",
};
