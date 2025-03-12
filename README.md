# Sentrix.js

Sentrix.js is a TypeScript utility library for interacting with the Sentrix API. It provides modular access to various API endpoints with an easy way to configure authentication.

## Installation

TODO: Publish to GitHub packages rather than NPM --> https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages

I dont want that stuff to be public.

## Usage

The API client can either be instantiated normally ore used as a global instance.

When instantiating the API client a optional ``baseUrl`` parameter is available.
Additionally the Client will listen for the ``SENTRIX_CLIENT_BASE_URL`` env var, which can be used to configure the global instance as well.

### Authentication

All three Authentication types provided by the Sentrix API are available:
```ts
import { apiClient } from "sentrix-js"

apiClient
    .authenticateUser("ACCES_TOKEN")
    .get("/v1/mock/endpoint")

apiClient
    .authenticateHub("ACCESS_TOKEN")
    .post("/v1/hub/endpoint")

apiClient
    .authenticateBot("ACCESS_TOKEN")
```

Authentication tokens are stored in the API Client instance so unless you change them, you can set them once and forget about it

### Errors

The API Client will throw an ``SentrixApiError`` for each Request which did not succeed with code 200

### Sending a Auth Request

```ts
import { apiClient } from "sentrix-js"

const { access_token } = await apiClient.authentication.loginDiscord("TOKEN");
```

## Credits

Developed by Emil & Xenox0003. Thanks to contributors.
