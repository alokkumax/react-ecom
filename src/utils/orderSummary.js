// orderSummary.js — shared order math so the Cart and Checkout pages
// always agree on shipping, tax, and the final total.

export const FREE_SHIPPING_THRESHOLD = 100 // spend this much for free shipping
export const SHIPPING_FEE = 7.99
export const TAX_RATE = 0.08 // 8%

// Given a subtotal, work out shipping, tax, and the grand total.
export function getOrderSummary(subtotal) {
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  // No shipping charge on an empty cart or once the free-shipping goal is met
  const shipping = subtotal === 0 || hasFreeShipping ? 0 : SHIPPING_FEE
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  return {
    subtotal,
    shipping,
    tax,
    total,
    hasFreeShipping,
    remainingForFree: FREE_SHIPPING_THRESHOLD - subtotal,
  }
}
