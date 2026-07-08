# 🛒 ShoppyGlobe

Repo Link - https://github.com/alokkumax/react-ecom.git
ShoppyGlobe is a small **online shopping website** built with React. You can
browse products, search for what you want, open a product to read more about it,
add things to a cart, change quantities, and go through a simple checkout.

This project was built as a learning exercise, so the code is kept simple and
has lots of beginner-friendly comments explaining what each part does.

> **Live product data** comes from the free [DummyJSON](https://dummyjson.com/)
> API — no backend or database is needed.
> Live URL - https://react-ecom-five-omega.vercel.app/

---

## ✨ Features

- **Product list** — see all products in a responsive grid.
- **Search** — type in the search box to filter products by name.
- **Category filter & sorting** — narrow down or reorder the products.
- **Infinite scroll** — more products load automatically as you scroll.
- **Product detail page** — click any product to see full details.
- **Shopping cart** — add items, remove items, and change quantities.
- **Live cart count** — the number on the cart icon updates instantly.
- **Checkout page** — fill in your details and place an order.
- **Form validation** — the order won't go through if a field is empty.
- **Order summary** — subtotal, shipping, tax, and total are all shown.
- **404 page** — a friendly message for pages that don't exist.
- **Responsive design** — works on both mobile and desktop.
- **Toast notifications** — small pop-ups confirm actions like "Added to cart".

### ⭐ Extra Features

- **Related products** — the product detail page also shows other items from the
  same category, so you can keep browsing similar things.
- **Mobile-responsive header** — the top bar (logo, search, cart) adjusts nicely
  on small screens so it stays usable on phones.
- **Infinite loader** — instead of "next page" buttons, more products load
  automatically as you scroll down the list.

---

## 🧰 Technologies Used

| Tool | What it does (in plain words) |
| --- | --- |
| **React** | Builds the user interface out of reusable "components". |
| **Vite** | Runs the app while developing and bundles it for production. Very fast. |
| **Redux Toolkit** | Stores shared data (the cart & search term) in one central place. |
| **React Redux** | Connects React components to the Redux store. |
| **React Router** | Handles page navigation (URLs like `/cart`, `/product/5`). |
| **React Toastify** | Shows the little pop-up notification messages. |
| **PropTypes** | Checks that components receive the right kind of data. |

---

## 🚀 Installation

You need **Node.js** installed (version 18 or newer is recommended).

1. **Get the code** (clone the repository):

```bash
git clone <YOUR_GITHUB_REPOSITORY_LINK>
cd react-1
```

2. **Install the dependencies** (this downloads everything the project needs
   into a `node_modules` folder):

```bash
npm install
```

---

## ▶️ Running the Project

**Start the development server** (auto-reloads when you change code):

```bash
npm run dev
```

Then open the address shown in the terminal (usually
`http://localhost:5173`) in your browser.

Other useful commands:

```bash
npm run build     # Create an optimized production build in the "dist" folder
npm run preview   # Preview that production build locally
npm run lint      # Check the code for problems
```

---

## 📁 Folder Structure

Here's how the project is organized. The most important folder is `src`, which
holds all the app's code.

```
react-1/
├── public/                  # Static files served as-is (e.g. the banner image)
├── src/
│   ├── components/          # Reusable UI pieces
│   │   ├── Cart/            # The shopping cart view
│   │   ├── CartItem/        # A single row in the cart
│   │   ├── ErrorMessage/    # Shown when something fails to load
│   │   ├── Footer/          # Page footer
│   │   ├── Header/          # Top bar with logo, search, and cart icon
│   │   ├── Loading/         # "Loading..." message
│   │   ├── ProductItem/     # A single product card
│   │   └── ProductList/     # The grid of product cards + filters
│   │
│   ├── pages/               # Full pages, one per route
│   │   ├── Home/            # Landing page (banner + product list)
│   │   ├── ProductDetail/   # Single product page
│   │   ├── Checkout/        # Checkout form + order summary
│   │   └── NotFound/        # 404 page
│   │
│   ├── redux/               # Central data store (Redux)
│   │   ├── slices/
│   │   │   ├── cartSlice.js     # Cart state + add/remove/quantity actions
│   │   │   └── searchSlice.js   # The current search term
│   │   └── store.js             # Combines the slices into one store
│   │
│   ├── hooks/
│   │   └── useProducts.js   # Custom hook that fetches products from the API
│   │
│   ├── utils/
│   │   └── orderSummary.js  # Shared math for shipping, tax, and total
│   │
│   ├── router/
│   │   └── router.jsx       # All the app's URL routes
│   │
│   ├── index.css            # Global styles
│   └── main.jsx             # The entry point that starts the app
│
├── index.html               # The single HTML page React renders into
├── package.json             # Project info, scripts, and dependencies
└── README.md                # This file
```

**How the data flows (the short version):**

1. `useProducts` fetches products from the DummyJSON API using `useEffect`.
2. Redux keeps track of what's in the cart and the current search term.
3. React Router decides which page to show based on the URL.
4. The Checkout page reads the cart from Redux, validates the form, and on a
   successful order it clears the cart.

---

## 📸 Screenshots

_(Optional — add screenshots of the app here later.)_

---

## 🔗 GitHub Repository

Repository link: `<YOUR_GITHUB_REPOSITORY_LINK>`

_(Replace the placeholder above with your actual GitHub repository URL.)_
