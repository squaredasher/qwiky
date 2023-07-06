import type { Signal } from '@builder.io/qwik'
import { useSignal, } from '@builder.io/qwik'
import type { AnyFn, MaybeSignal, MaybeSignalOrGetter } from './type'

export function isSignal<T>(r: Signal<T> | unknown): r is Signal<T>
export function isSignal(r: any): r is Signal {
  return !!(r && typeof r === 'object' && hasOwn(r, 'untrackedValue'))
}

export function isDef<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function notNullish<T = any>(val?: T | null | undefined): val is T {
  return val != null
}

export function assert(condition: boolean, ...infos: any[]) {
  if (!condition)
    console.warn(...infos)
}

const toString = Object.prototype.toString

export function isObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}

export function now() {
  return Date.now()
}

export function timestamp() {
  return +Date.now()
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function noop() {}

export function rand(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function hasOwn<T extends object, K extends keyof T>(val: T, key: K): key is K {
  return Object.prototype.hasOwnProperty.call(val, key)
}

export function toSignal<T>(
  signal: Signal<T> | T,
): Signal<T> {
  if (isSignal(signal))
    return signal

  // eslint-disable-next-line qwik/use-method-usage
  return useSignal<T>(signal)
}

export function unSignal<T>(sig: MaybeSignal<T>): T {
  return isSignal(sig)
    ? sig.value
    : sig
}

export function toValue<T>(r: MaybeSignalOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unSignal(r)
}
