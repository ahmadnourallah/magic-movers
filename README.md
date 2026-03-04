## Magic Movers API

### Overview

**Magic Movers** is a small REST API for managing magical couriers (Movers), the items they carry, and the missions they complete. You can register Movers with a weight limit, create Items with a magical weight, load items onto Movers, start and end missions that move cargo around, and track all of these actions through activity logs. The missions and activity history make it easy to see which Movers have completed the most work over time.

### Technologies Used

-   **Runtime / Language**
    -   **Node.js** (TypeScript)
    -   **Express 5** for HTTP routing and middleware.
-   **Database & ORM**
    -   **MongoDB** with **Mongoose**.
-   **Architecture & Patterns**
    -   **Dependency Injection** with `typedi` and `reflect-metadata`.
    -   **Layered architecture**: routers → controllers → services → models.
-   **Validation & Error Handling**
    -   **Zod** for request validation.
    -   Centralized error handlers for client and server errors.
-   **API Documentation**
    -   **Swagger (OpenAPI 3)** via `swagger-jsdoc` and `swagger-ui-express`.
    -   JSDoc-style Swagger definitions under `src/specs/*.yaml`.

### Getting Started

#### Prerequisites

-   **Node.js** (v18+ recommended).
-   **npm** (comes with Node).
-   **MongoDB** instance (local or remote).

#### Environment Variables

Create a `.env` file in the project root:

```bash
PORT=3000 # Optional. Defaults to 3000.
DB_URL=mongodb://localhost:27017/magic-movers # Or your Mongo connection string.
```

`src/config/env.config.ts` reads these values to configure the server.

#### Installation

```bash
npm install
```

### Build and Run

#### Development (watch mode)

Runs the TypeScript source directly using `tsx` and watches for changes:

```bash
npm run dev
```

This starts the server from `src/server.ts` on `PORT` (default `3000`).

#### Production Build

1. **Build the TypeScript sources**:

    ```bash
    npm run build
    ```

    This compiles the `.ts` files into the `dist/` directory.

2. **Start the compiled server**:

    ```bash
    npm start
    ```

    This runs `dist/src/server.js`.

Once running, the API is available at:

-   **Base URL**: `http://localhost:<PORT>` (default `http://localhost:3000`).
-   **Swagger UI**: `GET /` — interactive API docs and testing console.

### API Endpoints

For full request/response schemas and examples, see the **Swagger UI** at `/`.

| **Method** | **Endpoint**              | **Description**                                            |
| ---------- | ------------------------- | ---------------------------------------------------------- |
| GET        | `/movers`                 | List all Magic Movers.                                     |
| POST       | `/movers`                 | Create a new Magic Mover.                                  |
| PUT        | `/movers/{moverId}/items` | Load a Mover with existing items.                          |
| GET        | `/items`                  | List all Magic Items.                                      |
| POST       | `/items`                  | Create a new Magic Item.                                   |
| POST       | `/missions`               | Start a mission for a specific Mover.                      |
| DELETE     | `/missions`               | End an active mission and unload all items from a Mover.   |
| GET        | `/activities`             | Retrieve activity logs for all loading and mission events. |

### Architectural Features

-   **Modular Design**

    -   Clear separation of concerns between **routers**, **controllers**, **services**, **models**, and **middleware**.
    -   Each domain concept (Mover, Item, Mission, Activity) has its own router, controller, service, and model for easier navigation and maintenance.

-   **Dependency Injection**

    -   Uses **`typedi`** and **`reflect-metadata`** to inject dependencies into services and controllers.
    -   Encourages testability and reusability by decoupling modules from concrete implementations.

-   **Validation with Zod**

    -   Request payloads are validated using **Zod** schemas (e.g. `MoverSchema`, `ItemSchema`).
    -   The `validateRequest` middleware enforces schema constraints and returns consistent validation errors.

-   **Swagger Docs & JSDoc Integration**

    -   OpenAPI 3 specs are defined in YAML under `src/specs/*.yaml` and combined using `swagger-jsdoc`.
    -   **`src/config/swagger.config.ts`** wires the definitions into a Swagger spec served at the root path (`/`) via `swagger-ui-express`.
    -   This provides interactive documentation for all endpoints, request bodies, and responses.

-   **Centralized Error Handling**
    -   Custom `ClientError` and error-handling middleware distinguish between client and server errors.
    -   Ensures that consumers receive consistent, well-structured error responses.

### Development Notes

-   **Scripts** (from `package.json`):

    -   **`npm run dev`**: Run the server in development mode with live reload.
    -   **`npm run build`**: Compile TypeScript to JavaScript into `dist/`.
    -   **`npm start`**: Start the compiled server from `dist/src/server.js`.

-   **API Exploration**:
    -   After starting the server, open `http://localhost:3000/` (or your configured `PORT`) in a browser to explore and test endpoints using the Swagger UI.
