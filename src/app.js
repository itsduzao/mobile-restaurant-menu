import { renderMenuItems } from './components/menu.js'
import { addButtonClickHandlers } from './handlers/addButtonClickHandlers.js'
import { addFormListeners } from './handlers/addFormListeners.js'

export function initializeApp() {
  if (!window.hasInitialized) {
    renderMenuItems()
    addButtonClickHandlers()
    addFormListeners()
    window.hasInitialized = true
  }
}

document.addEventListener('DOMContentLoaded', initializeApp, { once: true })

