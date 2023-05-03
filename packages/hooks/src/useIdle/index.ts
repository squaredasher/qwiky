import { $, Signal, useOnDocument, useSignal } from "@builder.io/qwik";
import { timestamp } from "../utils";

const defaultEvents: (keyof DocumentEventMap)[] = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
];
const oneMinute = 60_000;

export interface UseIdleOptions {
  /**
   * Event names that listen to for detected user activity
   *
   * @default ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
   */
  events?: (keyof DocumentEventMap)[];
  /**
   * Listen for document visibility change
   *
   * @default true
   */
  listenForVisibilityChange?: boolean;
  /**
   * Initial state of the ref idle
   *
   * @default false
   */
  initialState?: boolean;
}

export interface UseIdleReturn {
  idle: Signal<boolean>;
  lastActive: Signal<number>;
  reset: () => void;
}

export function useIdle(
  timeout: number = oneMinute,
  options: UseIdleOptions = {}
) {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents,
  } = options;
  const isIdle = useSignal(initialState);
  const lastActive = useSignal(timestamp());
  const timer = useSignal<any>();

  const reset = $(() => {
    isIdle.value = false;
    clearTimeout(timer.value);
    timer.value = setTimeout(() => (isIdle.value = true), timeout);
  });

  const onEvent = $(async () => {
    lastActive.value = timestamp();
    await reset();
  });
  events.forEach((event) => useOnDocument(event, onEvent));

  if (listenForVisibilityChange) {
    useOnDocument(
      "visibilitychange",
      $(async () => {
        if (!document.hidden) {
          await onEvent();
        }
      })
    );
  }

  return {
    isIdle,
    lastActive,
    reset,
  };
}
