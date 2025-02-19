import { MENU_ITEMS } from './src/data/data.js'

function getMenuItemsHTML(dataArr) {
  const htmlContent = []

  dataArr.map(item => {
    const { name, ingredients, id, price, emoji } = item
    htmlContent.push(`<div class="item-container" role="listitem" data-id="${id}">
  <div class="item-img" role="img" aria-label="${name}">${emoji}</div>
  <div class="item-info" role="group">
    <div class="item-title">${name}</div>
    <div class="item-description">${ingredients.join(', ')}</div>
    <div class="item-price">$${price}</div>
  </div>
  <button class="btn-add" type="button">
    +
  </button>
</div>`)
  })

  return htmlContent.join('')
}

function renderMenuItems() {
  document.getElementById('app-menu').innerHTML = getMenuItemsHTML(MENU_ITEMS)
}

renderMenuItems()
