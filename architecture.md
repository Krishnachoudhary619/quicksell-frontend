# QuickShare Frontend Architecture

This document defines the **folder structure, coding standards, response types, and API handling** for the QuickShare frontend application.

The goal is to ensure:

- Consistent code structure
- Type-safe API communication
- Predictable state management
- Easy scalability

---

# Tech Stack

The frontend application uses the following technologies:

Next.js 14 (App Router)
TypeScript
React Query (Server State)
Axios (API Client)
Zustand (Auth State)
TailwindCSS
Shadcn UI (Component Library)

---

# Project Folder Structure

src/
│
├── app/ # Next.js routes
│ ├── login/
│ │ └── page.tsx
│ │
│ ├── verify-otp/
│ │ └── page.tsx
│ │
│ ├── dashboard/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │
│ │ ├── products/
│ │ │ ├── page.tsx
│ │ │ └── create/page.tsx
│ │ │
│ │ ├── catalogs/
│ │ │ ├── page.tsx
│ │ │ └── [id]/page.tsx
│ │ │
│ │ ├── orders/
│ │ │ ├── page.tsx
│ │ │ └── [id]/page.tsx
│ │ │
│ │ └── settings/page.tsx
│ │
│ └── catalog/
│ └── [slug]/page.tsx # Public catalog
│
├── components/ # Reusable UI components
│ ├── ui/
│ ├── layout/
│ ├── product/
│ ├── catalog/
│ └── order/
│
├── services/ # API service layer
│ ├── api.ts
│ ├── auth.service.ts
│ ├── product.service.ts
│ ├── catalog.service.ts
│ ├── order.service.ts
│ └── upload.service.ts
│
├── types/ # Global TypeScript types
│ ├── api.types.ts
│ ├── product.types.ts
│ ├── catalog.types.ts
│ ├── order.types.ts
│ └── user.types.ts
│
├── store/ # Zustand state
│ └── auth.store.ts
│
├── hooks/ # Custom hooks
│ ├── useProducts.ts
│ ├── useCatalogs.ts
│ └── useOrders.ts
│
├── utils/
│ ├── constants.ts
│ └── helpers.ts
│
└── config/
└── env.ts
