#  CaterSearch — Catering Search Platform

A full-stack catering search platform built with **Node.js + Express** (backend) and **Next.js 14 + Tailwind CSS** (frontend).

---

##  Project Structure

```
catering-platform/
├── backend/               # Node.js + Express REST API
│   ├── data/
│   │   └── caterers.json  # JSON data store (pre-seeded with 12 caterers)
│   ├── src/
│   │   ├── index.js       # App entry point
│   │   ├── routes/
│   │   │   └── caterers.js
│   │   ├── middleware/
│   │   │   └── validate.js
│   │   └── utils/
│   │       └── dataStore.js
│   ├── .env.example
│   └── package.json
│
└── frontend/              # Next.js 14 + Tailwind CSS
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx           # Home / landing page
    │   │   ├── caterers/
    │   │   │   └── page.tsx       # /caterers route
    │   │   └── not-found.tsx
    │   ├── components/
    │   │   ├── ui/                # Reusable primitive components
    │   │   ├── CatererCard.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── AddCatererModal.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorBanner.tsx
    │   │   └── Navbar.tsx
    │   ├── hooks/
    │   │   ├── useCaterers.ts     # Data-fetching hook with filter state
    │   │   └── useDebounce.ts     # Generic debounce hook
    │   ├── lib/
    │   │   ├── api.ts             # API service layer
    │   │   └── utils.ts           # cn() utility
    │   └── types/
    │       └── index.ts
    ├── .env.local.example
    └── package.json
```

---

##  Getting Started

### Prerequisites

- **Node.js** v18 or above
- **npm** v9 or above

---

### 1. Clone / Extract the project

```bash
# If from zip
unzip catering-platform.zip
cd catering-platform
```

---

### 2. Start the Backend

```bash
cd backend

# Install dependencies
npm install

# (Optional) Copy env and configure
cp .env.example .env

# Start in development mode (auto-restart on changes)
npm run dev

# OR start in production mode
npm start
```

The API will be available at **http://localhost:5000**

---

### 3. Start the Frontend

Open a **new terminal tab/window**:

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.local.example .env.local
# The default value (http://localhost:5000) is correct for local development

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:3000**

---

##  API Endpoints

Base URL: `http://localhost:5000`

### `GET /api/caterers`

Returns all caterers. Supports optional query parameters:

| Query Param | Type   | Description                              |
|-------------|--------|------------------------------------------|
| `search`    | string | Filter by caterer name (case-insensitive)|
| `minPrice`  | number | Minimum price per plate                  |
| `maxPrice`  | number | Maximum price per plate                  |
| `cuisine`   | string | Filter by cuisine type                   |
| `sortBy`    | string | `pricePerPlate`, `rating`, or `name`     |
| `order`     | string | `asc` (default) or `desc`               |

**Example:**
```
GET /api/caterers?search=royal&minPrice=500&maxPrice=1000&sortBy=rating&order=desc
```

---

### `GET /api/caterers/:id`

Returns a single caterer by ID.

**Example:**
```
GET /api/caterers/c1a2b3c4-d5e6-7890-abcd-ef1234567890
```

---

### `POST /api/caterers`

Creates a new caterer. Requires `Content-Type: application/json`.

**Request body:**
```json
{
  "name": "My Catering Co.",
  "location": "Mumbai, Maharashtra",
  "pricePerPlate": 750,
  "cuisines": ["North Indian", "Chinese"],
  "rating": 4.3
}
```

**Validation rules:**
- `name` — string, minimum 2 characters, required
- `location` — string, minimum 2 characters, required
- `pricePerPlate` — positive number, required
- `cuisines` — non-empty array of strings, required
- `rating` — number between 0 and 5, required

---



##  Features

- **Live debounced search** — 400ms debounce on text inputs to avoid excessive API calls
- **Price range filter** — Min/max price per plate
- **Cuisine filter** — Partial-match cuisine search
- **Sort & order** — Sort by price, rating, or name in ascending/descending order
- **Add caterer** — POST form with full client-side + server-side validation
- **Skeleton loading** — Shimmer placeholders while fetching
- **Empty + error states** — Friendly messaging with retry/reset actions
- **Responsive grid** — 1 → 2 → 3 → 4 columns based on viewport
- **Keyboard accessible** — Modal closes on Escape, focus management
