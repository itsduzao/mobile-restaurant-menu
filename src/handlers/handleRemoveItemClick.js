import { renderOrderCheckout } from '../components/order.js'
import { orderItems } from '../state/orderState.js'

export function handleRemoveItemClick(event) {
  const itemId = Number(event.target.dataset.id)
  const itemIndex = orderItems.findIndex(item => item.id === itemId)

  if (itemIndex !== -1) {
    orderItems.splice(itemIndex, 1)
  }

  renderOrderCheckout()
}

