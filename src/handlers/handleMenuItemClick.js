import { renderOrderCheckout } from '../components/order.js'
import { MENU_ITEMS } from '../data/data.js'
import { orderItems } from '../state/orderState.js'
import { hideElement } from '../utils/hideElement.js'
import { showElement } from '../utils/showElement.js'

export function handleMenuItemClick(event) {
  const completedOrderContainer = document.getElementById('order-success')
  const isCompletedOrderContainerVisible =
    !completedOrderContainer.classList.contains('hidden')
  const orderCheckoutElement = document.querySelector('#order-checkout')

  if (isCompletedOrderContainerVisible) {
    hideElement(completedOrderContainer)
  }

  const targetItem = MENU_ITEMS.filter(item => {
    return item.id === Number(event.target.dataset.id)
  })[0]

  const orderedItem = orderItems.find(item => item.id === targetItem.id)

  orderedItem
    ? (orderedItem.quantity += 1)
    : orderItems.push({ ...targetItem, quantity: 1 })

  showElement(orderCheckoutElement)

  renderOrderCheckout()
}

