import { component$ } from "@builder.io/qwik";
import { useOnline } from ".";

const Test = component$(() => {
  const online = useOnline();
  return (
    <>
      <p>Status: {online.value ? 'Online' : 'Offline'}</p>
    </>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseOnline = {
  name: "useOnline",
};
