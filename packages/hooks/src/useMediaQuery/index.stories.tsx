import { component$ } from "@builder.io/qwik";
import { useMediaQuery } from ".";

const Test = component$(() => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
  return (
    <>
      <p>isLargeScreen: {isLargeScreen.value ? 'true' : 'false'}</p>
      <p>prefersDark: {isPreferredDark.value ? 'true' : 'false'}</p>
    </>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseMediaQuery = {
  name: "useMediaQuery",
};
