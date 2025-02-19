import { MENU_ITEMS } from './src/data/data.js'

let orderItems = {}

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

document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-add') && event.target.dataset.id) {
    handleMenuItemClick(event)
  }
})

renderMenuItems()

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
}

