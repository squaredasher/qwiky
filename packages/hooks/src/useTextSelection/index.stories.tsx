import { component$ } from "@builder.io/qwik";
import { useTextSelection } from ".";

const Test = component$(() => {
  const { rects, text } = useTextSelection();
  return (
    <div class="w-1/4">
      <p>
        Qwik is a new kind of web framework that can deliver instant loading web
        applications at any size or complexity. Your sites and apps can boot
        with about 1kb of JS (regardless of application complexity), and achieve
        consistent performance at scale.
      </p>

      <div class="mt-4">
        <p>You can select any text on the page.</p>
        <p>
          <strong>Selected Text:</strong>
        </p>
        <em class="whitespace-pre h-44 overflow-y-auto block">
          {text.value || "No selected"}
        </em>

        <p>
          <strong>Selected rects:</strong>
          <pre class="h-72" lang="json">
            { JSON.stringify(rects.value, null, 2) }
          </pre>
        </p>
      </div>
    </div>
  );
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseTextSelection = {
  name: "useTextSelection",
};
