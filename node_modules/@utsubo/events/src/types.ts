import type EventEmitter from 'eventemitter3'

/**
 * An event handler callback.
 */
export type EventHandler = (...args: any[]) => any

/**
 * An {@link EventEmitter} instance to dispatch events from.
 */
export type EventContext = EventEmitter

/**
 * Options for creating or configuring an event handler.
 */
export interface EventOptions {
  /** Whether to subscribe as a one-off listener. Default is `false`. */
  once?: boolean
  /** An optional {@link EventContext} to dispatch from. */
  context?: EventContext
}
