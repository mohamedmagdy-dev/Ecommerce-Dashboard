## Ecommerce Dashboard (React + Vite)

Modern, responsive admin dashboard UI for managing customers. Built with React, Vite, Tailwind CSS, React Hook Form, and Redux Toolkit. Includes form modals, validation, status controls, and basic error handling using friendly UI feedback.

---

## Features

- **Admin Dashboard UI**: Manage customers from a clean, responsive interface.
- **Customer Form (Add/Edit)**: Built with **react-hook-form** for efficient, performant validation.
- **Modal Dialogs**: Open/close form dialogs to add or edit customer details.
- **Status Dropdown**: Required status selector with validation rules.
- **Success/Close Buttons**: Styled actions with consistent UX.
- **Basic Error Handling**: Inline validation errors and user-friendly messages.
- **Reusable UI Components**: Buttons, tables, pagination, date picker, ratings, and more.

---

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Hook Form 7**
- **Redux Toolkit** + **React Redux**
- **React Router DOM 7**
- **Material UI Icons** with **@emotion/react** and **@emotion/styled**
- **Axios**, **clsx**

---

## Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** (or **pnpm/yarn**)

### Installation
```bash
# 1) Clone the repository
git clone <your-repo-url> ecommerce-dashboard
cd ecommerce-dashboard

# 2) Install dependencies
npm install

# 3) Start the development server
npm run dev
```

Open the app in your browser at `http://localhost:5173` (default Vite port).

### Build & Preview
```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

### Lint
```bash
npm run lint
```

---

## Usage

- **Start the dev server**: `npm run dev` and open `http://localhost:5173`.
- **Open Customers**: Navigate to the Customers section/table.
- **Add Customer**: Click Add, fill out the form (name, contact, status, etc.), and submit.
- **Edit Customer**: Use the edit action on an existing row to update details.
- **Validation**: Required fields and status are validated using `react-hook-form`.
- **Feedback**: Success/close actions show confirmation and dismiss modals.

Note: The app currently reads mock data from `public/Api/*.json`. See Roadmap for planned API integrations.

---

## Project Structure

```text
Ecommerce Dashboard/
├─ public/
│  └─ Api/
│     ├─ BestSellingProducts.json
│     ├─ countryProgress.json
│     ├─ customers.json
│     ├─ Orders.json
│     ├─ Products.json
│     ├─ ProductsReviews.json
│     ├─ RecentActivity.json
│     ├─ revenueChart.json
│     ├─ reviewsSummary.json
│     ├─ Sellers.json
│     ├─ summaryStats.json
│     ├─ TopCategories.json
│     └─ TrafficSource.json
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ ui/ (Buttons, DatePicker, Rate, Titles)
│  │  └─ (ApplicationBar, ConfirmDialog, Pagination, Tables, etc.)
│  ├─ features/
│  │  ├─ theme/ (themeSlicer.js)
│  │  └─ user/ (userSlicer.js)
│  ├─ pages/
│  │  └─ (Dashboard, Customers, Products, Orders, etc.)
│  ├─ style/ (App.css)
│  ├─ store.js
│  ├─ App.jsx
│  └─ main.jsx
├─ vite.config.js
├─ package.json
└─ README.md
```

---

## Roadmap / To‑Do

- **Authentication & Authorization**
  - Sign in/out, protected routes, role-based access control (admin/staff)
- **API Integration**
  - Replace mock JSON with REST/GraphQL backend; loading and error states
- **Realtime Updates**
  - WebSockets/SSE for live customer and order updates
- **Data Management Enhancements**
  - Server-side pagination, sorting, filtering, and search
  - Normalized state and caching strategies
- **Forms & Validation**
  - Schema-based validation (Yup/Zod) and form-level error summaries
- **Testing & Quality**
  - Unit tests (Vitest + React Testing Library)
  - E2E tests (Playwright or Cypress)
  - Linting/formatting and pre-commit hooks
- **UX & Accessibility**
  - A11y improvements, keyboard navigation, focus management
  - i18n (internationalization) and RTL support
  - Dark mode persistence and theme refinements
- **Performance & DX**
  - Code-splitting, route-based lazy loading, bundle analysis
  - CI/CD pipeline and deployments

---

## License

This project is licensed under the **MIT License**. You are free to use, copy, modify, merge, publish, and distribute the software. See the `LICENSE` file (or the MIT license text below) for details.

```
MIT License

Copyright (c) <year> <your-name>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

