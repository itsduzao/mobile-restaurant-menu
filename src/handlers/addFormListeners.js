import { handlePayButtonClick } from './handlePayButtonClick.js'

export function addFormListeners() {
  const paymentForm = document.getElementById('payment-details-form')
  const cardNameInput = document.getElementById('customer-name')
  const cardNumberInput = document.getElementById('customer-card-number')
  const cardSecurityCodeInput = document.getElementById('customer-card-cvv')

  cardNameInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '')
  })

  cardNumberInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 16)
    this.value = this.value.replace(/(\d{4})(?=\d)/g, '$1-')
  })

  cardSecurityCodeInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '')
  })

  paymentForm.addEventListener('submit', handlePayButtonClick)
}

