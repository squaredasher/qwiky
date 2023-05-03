import { useDocumentVisibility } from "./index";
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

const Test = component$(() => {
  const visibility = useDocumentVisibility();
  const events = useSignal<any[]>([]);
  const computedEvents = useComputed$(() => events.value);
  const cameBack = useComputed$(() => events.value[events.value.length - 2] === "hidden");

  useTask$(({ track }) => {
    track(() => visibility.value)
    events.value = [...events.value, visibility.value];
  })

  return (
    <div class="px-4">
      <div>{cameBack.value ? '🎉 Welcome back!' : '💡 Minimize the page or switch tab then return' }</div>
      <ul class="py-2 list-disc">
        {computedEvents.value.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseDocumentVisibility = {
  name: "useDocumentVisibility",
};
