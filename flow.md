API Base URL
https://quicksell-backend.onrender.com

Development:

https://3000-firebase-quick-share-backend-1767762112097.cluster-a6zx3cwnb5hnuwbgyxmofxpkfe.cloudworkstations.dev
Standard API Response Type

All APIs follow a unified structure.

{
success: boolean
data: object | null
message: string
}
TypeScript Definition
export interface ApiResponse<T> {
success: boolean
data: T
message: string
}
Product Types
export interface Product {
id: string
product_name: string
description?: string
price: number
currency?: string
stock_quantity: number
is_active: boolean
thumbnail_url?: string
image_urls?: string[]
category?: string
}
Catalog Types
export interface CatalogSummary {
id: string
catalog_name: string
catalog_slug: string
is_active: boolean
product_count: number
}
Public Catalog
export interface PublicCatalog {
catalog_name: string
products: PublicProduct[]
}

export interface PublicProduct {
id: string
product_name: string
price: number
thumbnail_url?: string
}
Order Types
export interface OrderSummary {
id: string
total_items: number
created_at: string
}
export interface OrderItem {
product_id: string
product_name: string
price: number
quantity: number
}
export interface OrderDetail {
id: string
total_items: number
created_at: string
order_items: OrderItem[]
}
API Client

All API calls must go through the shared API client.

services/api.ts

import axios from "axios"

export const api = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use((config) => {
const token = localStorage.getItem("access_token")

if (token) {
config.headers.Authorization = `Bearer ${token}`
}

return config
})
Authentication Flow

User enters phone number

Call /auth/send-otp

User enters OTP

Call /auth/verify-otp

Store:

access_token
refresh_token
user

in Zustand store.

Token Refresh Strategy

When 401 Unauthorized occurs:

Call /auth/refresh-token

Update access_token

Retry original request

Image Upload Flow

Uploads use S3 presigned URLs.

Flow:

Request presigned URL

POST /uploads/presigned-urls

Upload file directly to S3

Save returned file_url in product API

React Query Usage Rules

All server state must use React Query.

Example:

const { data, isLoading } = useQuery({
queryKey: ["products"],
queryFn: getProducts
})

Mutations:

const mutation = useMutation({
mutationFn: createProduct
})
State Management Rules

Use Zustand only for global state

Allowed:

auth
user
tokens

Not allowed:

products
catalogs
orders

These must use React Query.

Naming Conventions

Variables

camelCase

Components

PascalCase

Files

kebab-case

Example

product-card.tsx
catalog-list.tsx
order-table.tsx
Component Guidelines

Components must be:

Reusable
Typed
Small

Example:

components/product/product-card.tsx
Public Catalog Page

Route

/catalog/[slug]

Fetch API

GET /catalog/{slug}

Display:

Catalog Name
Product List
Quantity selector
Order button
Order Placement

API

POST /orders

Response

{
whatsapp_url
}

Frontend must redirect to:

window.location.href = whatsapp_url
Error Handling

All API errors must display:

toast.error(message)

Use react-hot-toast.

Environment Variables

.env.local

NEXT_PUBLIC_API_URL=https://quicksell-backend.onrender.com
Code Rules

Do not call APIs directly inside components.

Always use:

services
hooks

Example:

components -> hooks -> services -> api
Future Modules

The architecture supports future features:

analytics
pdf catalog export
whatsapp share
inventory alerts
