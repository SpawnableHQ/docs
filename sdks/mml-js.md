# MML for Javascript

# MML SDK for Javascript

The MML SDK for JavaScript offers simple event tracking for your applications. There are two primary ways to use the SDK: in plain MML and within a React project.

## 1. Installation

### a. Plain MML:

Since NetworkedDOM does not allow the embedding of remote resources, you must embed the SDK directly within your MML using a `<script>` tag.

```html
<script>
  // Copy and paste the SDK code here
</script>
```

### b. React Project:

Install the SDK via npm:

```bash
npm install @spawnable/sdk-js
```

## 2. Initialization

Here’s how you can initialize the SDK:

```js
import { Client } from '@spawnable/sdk-js'

const client = new Client({
  apiKey: 'YOUR_API_KEY',
  objectId: 'OPTIONAL_OBJECT_ID',
  debug: true, // Optional
  cooldown: 5, // Optional
})
```

::: tip
Note: If the MML is deployed with Spawnable.io, Spawnable will automatically inject the necessary configuration.
:::

## 3. Usage

### a. Set Object ID:

Note: The Object ID is automatically injected when you deploy your code with Spawnable.

```js
client.setObjectId('YOUR_OBJECT_ID')
```

### b. Track General Events:

```js
client.track(mmlEvent, 'eventIcon', 'eventName', {
  property1: 'value1',
  property2: 'value2',
})
```

### c. Track Chat Events:

```js
client.trackChat(radius: number, message = 'Chat Received')
```

### d. Track Location Events:

```js
client.trackLocation(range: number, message = 'Location Entered')
```
