// router.jsx — Defines all URL paths for ShoppyGlobe.
// createBrowserRouter maps each path to a page/component.

import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../components/Cart'
import Checkout from '../pages/Checkout'
import NotFound from '../pages/NotFound'

// Each route object has:
//   path  — the URL in the browser
//   element — the React component to show for that URL
const router = createBrowserRouter([
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
])

export default router
