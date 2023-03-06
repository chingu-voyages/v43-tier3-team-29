# @utsubo/events

Minimalist library to emit and receive custom events.

```bash
yarn add @utsubo/events
```

## Example

```ts
import { onEvent, offEvent, emitEvent, useEvent } from '@utsubo/events'

// Create an event listener
const handler = (e) => console.log('event', e)
onEvent('event', handler, { once: false })

// Dispatch a payload to event listeners
emitEvent('event', 'event data')

// Remove the event listener
offEvent('event', handler, { once: false })

// React hook bindings to create reactive handlers.
function Component() {
  useEvent('event', (e) => console.log('event', e), [key], { once: false })
}
```
