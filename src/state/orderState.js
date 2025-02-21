export let orderItems = []

export function addOrderItem(item) {
  const existingItem = orderItems.find(orderItem => orderItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    orderItems.push({ ...item, quantity: 1 })
  }
}

export function removeOrderItem(itemId) {
  const itemIndex = orderItems.findIndex(item => item.id === itemId)

  if (itemIndex !== -1) {
    orderItems.splice(itemIndex, 1)
  }
}

export function resetOrderItems() {
  orderItems.length = 0
}

