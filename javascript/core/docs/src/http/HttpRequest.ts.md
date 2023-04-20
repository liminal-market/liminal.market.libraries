# HttpRequest.ts

HttpRequest.ts is a TypeScript file that provides a class for handling HTTP requests in the LiminalMarket application. This class includes methods for sending authenticated and unauthenticated GET and POST requests, as well as listening for real-time updates using the EventSource API.

## Usage Examples

```javascript
import HttpRequest from './HttpRequest';

const httpRequest = new HttpRequest();

// Sending an authenticated POST request
httpRequest.postAuth('/api/endpoint', { key: 'value' })
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Sending an unauthenticated GET request
httpRequest.get('/api/endpoint')
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Listening for real-time updates
httpRequest.listen('eventName', async (event) => {
    console.log('Received event:', event);
});
```

## Methods

### postAuth(path: string, data?: any)

Sends an authenticated POST request to the specified path with the optional data object. Throws an error if the user is not logged in.

- `path`: The API endpoint to send the request to.
- `data`: An optional object containing the data to be sent in the request body.

### post(path: string, data?: any)

Sends an unauthenticated POST request to the specified path with the optional data object.

- `path`: The API endpoint to send the request to.
- `data`: An optional object containing the data to be sent in the request body.

### getAuth(path: string, data?: any): Promise<any>

Sends an authenticated GET request to the specified path with the optional data object. Throws an error if the user is not logged in.

- `path`: The API endpoint to send the request to.
- `data`: An optional object containing the data to be sent as query parameters.

### get(path: string, data?: any): Promise<any>

Sends an unauthenticated GET request to the specified path with the optional data object.

- `path`: The API endpoint to send the request to.
- `data`: An optional object containing the data to be sent as query parameters.

### listen(method: string, action: (event: any) => Promise<void>)

Listens for real-time updates using the EventSource API. Throws an error if the user is not logged in.

- `method`: The event name to listen for.
- `action`: A callback function that will be executed when the specified event is received.

## Private Methods

### getUrl(path: string)

Returns the full URL for the specified path, including the server URL from the LiminalMarket.Network configuration.

- `path`: The API endpoint to generate the full URL for.

### runActions(e: any)

Runs the registered action for the specified event.

- `e`: The event object received from the EventSource API.

### getEventSourceObject(e: any)

Parses the event data received from the EventSource API and returns the corresponding object.

- `e`: The event object received from the EventSource API.