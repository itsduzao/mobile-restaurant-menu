import { handleCompleteOrderClick } from './handleCompleteOrderClick.js'
import { handleMenuItemClick } from './handleMenuItemClick.js'
import { handleRemoveItemClick } from './handleRemoveItemClick.js'

export function addButtonClickHandlers() {
  document.addEventListener('click', event => {
    const hasDataId = event.target.dataset.id
    const isBtnAdd = event.target.classList.contains('btn-add')
    const isBtnRemove = event.target.classList.contains('btn-remove')
    const isBtnCompleteOrder = event.target.id === 'btn-complete-order'

    if (isBtnAdd && hasDataId) handleMenuItemClick(event)

    if (isBtnRemove && hasDataId) handleRemoveItemClick(event)

    if (isBtnCompleteOrder) handleCompleteOrderClick(event)
  })
}

