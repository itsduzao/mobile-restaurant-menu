import { orderItems } from '../state/orderState.js'

function getOrderCheckoutHtml() {
  const orderItemsHtml = orderItems
    .map(item => {
      const { name, id, price, quantity } = item
      return `<div class="order-item">
                  <div class="order-item-name">${name}</div>
                  <div class="order-item-quantity">x${quantity}</div>
                  <button class="btn-remove" type="button" data-id="${id}">remove</button>
                  <div class="order-item-price">$${price * quantity}</div>
              </div>`
    })
    .join('')

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  return `<div class="order-checkout-container">
            <div class="order-title">Your order</div>
            <div class="order-details">${orderItemsHtml}</div>
            <div class="divider"></div>
            <div class="order-total-price-container">
              <div class="order-total-price-title">Total price:</div>
              <div class="order-total-price">$${totalPrice}</div>
            </div>
            <button id="btn-complete-order" class="btn-complete-order" type="button">Complete order</button>
          </div>`
}

export function renderOrderCheckout() {
  document.getElementById('order-checkout').innerHTML = getOrderCheckoutHtml()
}
function getOrderSuccessHtml(formData) {
  const customerName = formData.get('customer-name')

  return `<div class="order-status">
            Thanks, ${customerName}! Your order is on its way!
          </div>`
}

export function renderOrderSuccessMessage(formData) {
  document.getElementById('order-success').innerHTML =
    getOrderSuccessHtml(formData)
}

