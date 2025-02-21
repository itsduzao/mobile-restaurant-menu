import { showElement } from '../utils/showElement.js'
import { addModalCloseHandler } from './addModalCloseHandler.js'

export function handleCompleteOrderClick(event) {
  const paymentModal = document.querySelector('#payment-modal')
  const isModalClosed = paymentModal.classList.contains('hidden')

  if (isModalClosed) {
    showElement(paymentModal)
    addModalCloseHandler(event)
  }
}

