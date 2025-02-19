import { MENU_ITEMS } from './src/data/data.js'

let orderItems = {}

document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-add') && event.target.dataset.id) {
    handleMenuItemClick(event)
  }
})

function getMenuItemsHTML(dataArr) {
  const htmlContent = []

  dataArr.map(item => {
    const { name, ingredients, id, price, emoji } = item
    htmlContent.push(`<div class="item-container" role="listitem">
  <div class="item-img" role="img" aria-label="${name}">${emoji}</div>
  <div class="item-info" role="group">
    <div class="item-title">${name}</div>
    <div class="item-description">${ingredients.join(', ')}</div>
    <div class="item-price">$${price}</div>
  </div>
  <button class="btn-add" type="button" data-id="${id}">
    +
  </button>
</div>`)
  })

  return htmlContent.join('')
}

function renderMenuItems() {
  document.getElementById('app-menu').innerHTML = getMenuItemsHTML(MENU_ITEMS)
}

function handleMenuItemClick(event) {
  const targetItem = MENU_ITEMS.filter(item => {
    return item.id === Number(event.target.dataset.id)
  })[0]

  !orderItems[`${targetItem.id}`]
    ? (orderItems[`${targetItem.id}`] = 1)
    : (orderItems[`${targetItem.id}`] += 1)

  const orderCheckoutElement = document.querySelector('#order-checkout')

  if (orderCheckoutElement.classList.contains('hidden')) {
    orderCheckoutElement.classList.remove('hidden')
  }

  renderOrderCheckout()
}

function getOrderCheckoutHtml() {
  const orderItemsHtml = Object.keys(orderItems)
    .map(id => {
      const item = MENU_ITEMS.find(menuItem => {
        return menuItem.id === Number(id)
      })
      return `<div class="order-item">
                  <div class="order-item-name">${item.name}</div>
                  <div class="order-item-quantity">x${orderItems[id]}</div>
                  <button class="btn-remove" type="button" data-id="${id}">remove</button>
                  <div class="order-item-price">$${
                    item.price * orderItems[id]
                  }</div>
              </div>`
    })
    .join('')

  const totalPrice = Object.keys(orderItems).reduce((total, id) => {
    const item = MENU_ITEMS.find(menuItem => menuItem.id === Number(id))
    return total + item.price * orderItems[id]
  }, 0)

  return `<div class="order-checkout-container">
            <div class="order-title">Your order</div>
            <div class="order-details">${orderItemsHtml}</div>
            <div class="divider"></div>
            <div class="order-total-price-container">
              <div class="order-total-price-title">Total price:</div>
              <div class="order-total-price">$${totalPrice}</div>
            </div>
            <button class="btn-complete-order" type="button">Complete order</button>
          </div>`
}

function renderOrderCheckout() {
  document.getElementById('order-checkout').innerHTML = getOrderCheckoutHtml()
}

renderMenuItems()

