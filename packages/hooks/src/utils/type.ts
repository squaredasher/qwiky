import type { QRL, Signal } from '@builder.io/qwik'

/**
 * Void function
 */
export type Fn = QRL<() => void>

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

/**
 * A signal that allow to set null or undefined
 */
export type RemovableSignal<T> = Omit<Signal<T>, 'value'> & {
  get value(): T
  set value(value: T | null | undefined)
}

/**
 * Maybe it's a signal, or a plain value
 *
 * ```ts
 * type MaybeSignal<T> = T | Signal<T>
 * ```
 */
export type MaybeSignal<T> = T | Signal<T>

/**
 * Maybe it's a signal, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeSignalOrGetter<T> = (() => T) | T | Signal<T> | ComputedRef<T>
 * ```
 */
export type MaybeSignalOrGetter<T> = MaybeSignal<T> | (() => T)
