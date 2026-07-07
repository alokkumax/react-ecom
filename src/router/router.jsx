// router.jsx — Defines all URL paths for ShoppyGlobe.
// createBrowserRouter maps each path to a page/component.

import { lazy } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

// lazy() only loads each page's code when the user actually visits it.
// This keeps the first page load small and fast.
const Home = lazy(() => import('../pages/Home'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Cart = lazy(() => import('../components/Cart'))
const Checkout = lazy(() => import('../pages/Checkout'))
const NotFound = lazy(() => import('../pages/NotFound'))

// Layout wraps every page — each page adds its own Header where needed
function AppLayout() {
  return (
    <main className="page-content">
      <Outlet />
    </main>
  )
}

// Each route object has:
//   path  — the URL in the browser
//   element — the React component to show for that URL
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // :id is a dynamic segment — e.g. /product/42 passes "42" to ProductDetail
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        // "*" catches any URL that does not match the routes above (404 page)
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
