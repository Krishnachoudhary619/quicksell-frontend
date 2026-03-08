All features in this project must follow the same architecture pattern.

Frontend architecture:

Page → Hook → Service → API

Rules:

1. Pages must not call API directly.
2. Hooks contain business logic.
3. Services only perform HTTP requests.
4. UI components must remain pure presentation.
5. Types must be defined in module types files.

Folder structure:

modules/{module-name}

modules/{module-name}/types
modules/{module-name}/hooks
modules/{module-name}/services

Global infrastructure exists in:

services/api.ts
services/endpoints.ts
config
store

All API calls must use the axios client defined in api.ts.

This architecture must be used for every module including:

auth
users
products
catalogs
orders
