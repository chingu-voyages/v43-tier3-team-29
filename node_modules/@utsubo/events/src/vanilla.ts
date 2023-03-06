import EventEmitter from 'eventemitter3'
import type { EventHandler, EventOptions, EventContext } from './types'

const eventEmitter = /*#__PURE__*/ new EventEmitter()

/**
 * Add a listener for a given event.
 */
export function onEvent(eventName: string, handler: EventHandler, options?: EventOptions): EventContext {
  return options?.once ? eventEmitter.once(eventName, handler) : eventEmitter.on(eventName, handler)
}

/**
 * Remove a listener for a given event.
 */
export function offEvent(eventName: string, handler: EventHandler, options?: EventOptions): void {
  eventEmitter.removeListener(eventName, handler, options?.context ?? null, options?.once)
}

/**
 * Dispatches a payload to listeners for a given event.
 */
export function emitEvent(eventName: string, payload: any): void {
  eventEmitter.emit(eventName, payload)
}
