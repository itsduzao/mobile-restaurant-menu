import { hideElement } from '../utils/hideElement.js'

let currentCloseHandler = null

export function addModalCloseHandler(event) {
  const paymentModal = document.querySelector('#payment-modal')
  const modalContainer = document.querySelector('.modal-container')

  if (currentCloseHandler) {
    document.removeEventListener('click', currentCloseHandler)
  }

  function closeModal(event) {
    const isPaymentModalVisible = !paymentModal.classList.contains('hidden')
    const isTargetNotModalDescendant = !modalContainer.contains(event.target)

    if (isTargetNotModalDescendant && isPaymentModalVisible) {
      hideElement(paymentModal)
      document.removeEventListener('click', currentCloseHandler)
      currentCloseHandler = null
    }
  }

  currentCloseHandler = closeModal
  document.addEventListener('click', closeModal)
}

