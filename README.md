# Sentrix.js

Sentrix.js is a TypeScript utility library for interacting with the Sentrix API. It provides modular access to various API endpoints, such as `User`, `Stats`, `Purchases`, `Public`, `Product`, and `Hub`, with an easy way to configure authentication.

## Installation

Install the package via npm:

```sh
npm install sentrix-js
```

Or install the package via pnpm:

```sh
pnpm install sentrix-js
```

## Usage

### Importing and Setting Up

```ts
import { User, Stats, Api } from "sentrix-js";

// Set up authentication
Api.setHubToken("your-hub-token");
```

### Fetching a User by ID

```ts
const user = await User.GetUserById(1234);
console.log(user);
```

## API Modules

- `User` - Lorem ipsum dolor sit amet.
- `Stats` - Lorem ipsum dolor sit amet.
- `Purchases` - Lorem ipsum dolor sit amet.
- `Public` - Lorem ipsum dolor sit amet.
- `Product` - Lorem ipsum dolor sit amet.
- `Hub` - Lorem ipsum dolor sit amet.

## Authentication

Before making any API requests, you must set the hub token using:

```ts
Api.setHubToken("your-hub-token");
```

## Credits

Developed by Emil & Xenox0003. Thanks to contributors.
