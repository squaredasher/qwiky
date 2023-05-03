import type { Signal } from '@builder.io/qwik'
import { useSignal, useVisibleTask$ } from '@builder.io/qwik'

export type NetworkType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown'

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

export function useNetwork() {
  const isOnline = useSignal(true)
  const isSupported = useSignal(true)
  const saveData = useSignal(false)
  const offlineAt: Signal<number | undefined> = useSignal(undefined)
  const onlineAt: Signal<number | undefined> = useSignal(undefined)
  const downlink: Signal<number | undefined> = useSignal(undefined)
  const downlinkMax: Signal<number | undefined> = useSignal(undefined)
  const rtt: Signal<number | undefined> = useSignal(undefined)
  const effectiveType: Signal<NetworkEffectiveType> = useSignal(undefined)
  const type: Signal<NetworkType> = useSignal<NetworkType>('unknown')

  useVisibleTask$(
    ({ cleanup }) => {
      const navigator = window?.navigator
      isSupported.value = navigator && 'connection' in navigator
      const connection = isSupported.value && (navigator as any).connection

      function updateNetworkInformation() {
        if (!navigator)
          return

        isOnline.value = navigator.onLine
        offlineAt.value = isOnline.value ? undefined : Date.now()
        onlineAt.value = isOnline.value ? Date.now() : undefined

        if (connection) {
          downlink.value = connection.downlink
          downlinkMax.value = connection.downlinkMax
          effectiveType.value = connection.effectiveType
          rtt.value = connection.rtt
          saveData.value = connection.saveData
          type.value = connection.type
        }
      }

      window.addEventListener('online', () => {
        isOnline.value = true
        onlineAt.value = Date.now()
      })

      window.addEventListener('offline', () => {
        isOnline.value = false
        offlineAt.value = Date.now()
      })

      if (connection)
        connection.addEventListener('change', updateNetworkInformation)

      updateNetworkInformation()

      cleanup(() => {
        connection.removeEventListener('change', updateNetworkInformation)
      })
    },
    {
      strategy: 'document-ready',
    },
  )

  return {
    isSupported,
    isOnline,
    saveData,
    offlineAt,
    onlineAt,
    downlink,
    downlinkMax,
    rtt,
    effectiveType,
    type,
  }
}
