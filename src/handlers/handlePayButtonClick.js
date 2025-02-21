import { renderOrderSuccessMessage } from '../components/order.js'
import { resetForm } from '../state/form.js'
import { resetOrderItems } from '../state/orderState.js'
import { hideElement } from '../utils/hideElement.js'
import { showElement } from '../utils/showElement.js'
import { validateForm } from '../utils/validateForm.js'

export function handlePayButtonClick(event) {
  event.preventDefault()
  const cardNameInput = document.getElementById('customer-name')
  const cardNumberInput = document.getElementById('customer-card-number')
  const cardSecurityCodeInput = document.getElementById('customer-card-cvv')
  const orderCheckoutContainer = document.getElementById('order-checkout')
  const orderSuccessMessage = document.getElementById('order-success')
  const paymentModal = document.getElementById('payment-modal')
  const paymentForm = document.getElementById('payment-details-form')

  const isFormValid = validateForm({
    cardOwnerName: cardNameInput,
    cardNumber: cardNumberInput,
    billingCardSecurityCode: cardSecurityCodeInput,
  })

  if (!isFormValid) return paymentForm.reportValidity()

  hideElement(paymentModal)

  const formData = new FormData(paymentForm)
  renderOrderSuccessMessage(formData)

  hideElement(orderCheckoutContainer)
  showElement(orderSuccessMessage)

  resetOrderItems()
  resetForm(paymentForm)
}

