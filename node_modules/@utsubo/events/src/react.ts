import { useRef, useEffect } from 'react'
import { onEvent, offEvent } from './vanilla'
import type { EventHandler, EventOptions } from './types'

/**
 * React hook for creating a listener for a given event.
 */
export function useEvent(eventName: string, handler: EventHandler, deps: any[] = [], options?: EventOptions): void {
  const handlerRef = useRef<EventHandler>(handler)
  useEffect(() => void (handlerRef.current = handler), [handler])

  useEffect(() => {
    const handler = (event: any) => handlerRef.current?.(event)
    const context = onEvent(eventName, handler, options)

    return () => offEvent(eventName, handler, { ...options, context })
  }, [eventName, options?.once, ...deps])
}
