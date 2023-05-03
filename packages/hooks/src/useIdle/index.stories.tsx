import { useIdle } from "./index";
import { component$ } from "@builder.io/qwik";

const Test = component$(() => {
  const { isIdle } = useIdle(2000);
  return (
    <div>
      <note>
        For demonstration purpose, the idle timeout is set to <b>5s</b> in this
        demo (default 1min).
      </note>
      <div class="mt-2">Idle: <strong>{isIdle.value ? 'true' : 'false'}</strong></div>
    </div>
  );
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseIdle = {
  name: "useIdle",
};
