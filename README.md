## Simple Todo Rest Api

```bash

# This is a simple todo REST API in Node.js that uses NestJs and Prisma ORM.
# It also uses jwt authentication and password hashing.

Following Routes are implemented:

# POST /register
Body: { email: "user@domain.com", password: "password" }
Returns: { user: { id: 1, email: "user@domain.com" } }

# POST /login
Body: { email: "user@domain.com", password: "password" }
Returns: { jwt: "JWT" }

# GET /user
Headers: Authorization: Bearer <JWT>
Returns: { user: { id: 1, email: "user@domain.com" } }

# POST /create-task
Headers: Authorization: Bearer <JWT>
Body: { name: "Task name" }
Returns: { task: { id: 1, name: "Task name" } }

# GET /list-tasks
Headers: Authorization: Bearer <JWT>
Returns: { tasks: [{ id: 1, name: "Task name" }, { id: 2, name: "Second task" }] }

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
