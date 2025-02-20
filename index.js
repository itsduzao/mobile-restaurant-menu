import { MENU_ITEMS } from './src/data/data.js'

const orderItems = []

function addButtonClickHandlers() {
  document.addEventListener('click', event => {
    const hasDataId = event.target.dataset.id
    const isBtnAdd = event.target.classList.contains('btn-add')
    const isBtnRemove = event.target.classList.contains('btn-remove')
    const isBtnCompleteOrder = event.target.id === 'btn-complete-order'

    if (isBtnAdd && hasDataId) {
      handleMenuItemClick(event)
    }

    if (isBtnRemove && hasDataId) {
      handleRemoveItemClick(event)
    }

    if (isBtnCompleteOrder) {
      handleCompleteOrderClick(event)
    }
  })
}

function addFormListeners() {
  const paymentForm = document.getElementById('payment-details-form')
  const cardNameInput = document.getElementById('customer-name')
  const cardNumberInput = document.getElementById('customer-card-number')
  const cardPwInput = document.getElementById('customer-card-pw')

  cardNameInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '')
  })

  cardNumberInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 16)
    this.value = this.value.replace(/(\d{4})(?=\d)/g, '$1-')
  })

  cardPwInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '')
  })

  paymentForm.addEventListener('submit', event => {
    event.preventDefault()
    const isFormValid = validateForm({
      paymentForm,
      cardNameInput,
      cardNumberInput,
      cardPwInput,
    })

    if (!isFormValid) return paymentForm.reportValidity()

    const paymentModal = document.getElementById('payment-modal')
    paymentModal.classList.add('hidden')

    const formData = new FormData(paymentForm)
    renderCompleteOrderStatus(formData)
  })
}

function validateForm(formElements) {
  const { paymentForm, cardNameInput, cardNumberInput, cardPwInput } =
    formElements

  const validations = [
    {
      input: cardNameInput,
      validities: [
        {
          isValid: () => cardNameInput.value.trim() !== '',
          message: 'Name must not be blank.',
        },
        {
          isValid: () => cardNameInput.value.length >= 4,
          message: 'Please enter your name (at least 4 characters).',
        },
      ],
    },
    {
      input: cardNumberInput,
      validities: [
        {
          isValid: () => cardNumberInput.value.length === 19,
          message:
            'Please enter a valid card number in the format xxxx-xxxx-xxxx-xxxx.',
        },
      ],
    },
    {
      input: cardPwInput,
      validities: [
        {
          isValid: () => cardPwInput.value.length === 3,
          message: 'Please enter a valid 3-digit CVV.',
        },
      ],
    },
  ]

  const isFormValid = !validations.some(({ input, validities }) => {
    input.setCustomValidity('')
    const isInputValid = validities.some(({ isValid, message }) => {
      if (!isValid()) {
        input.setCustomValidity(message)
        return true
      }
      return false
    })
    return isInputValid
  })

  return isFormValid
}

function resetForm(form) {
  form.reset()
}

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
  const completedOrderContainer = document.getElementById('order-complete')

  if (!completedOrderContainer.classList.contains('hidden')) {
    completedOrderContainer.classList.add('hidden')
  }

  const targetItem = MENU_ITEMS.filter(item => {
    return item.id === Number(event.target.dataset.id)
  })[0]

  const orderedItem = orderItems.find(item => item.id === targetItem.id)

  orderedItem
    ? (orderedItem.quantity += 1)
    : orderItems.push({ ...targetItem, quantity: 1 })

  const orderCheckoutElement = document.querySelector('#order-checkout')

  if (orderCheckoutElement.classList.contains('hidden')) {
    orderCheckoutElement.classList.remove('hidden')
  }

  renderOrderCheckout()
}

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

function renderOrderCheckout() {
  document.getElementById('order-checkout').innerHTML = getOrderCheckoutHtml()
}

function handleRemoveItemClick(event) {
  const itemId = Number(event.target.dataset.id)
  const itemIndex = orderItems.findIndex(item => item.id === itemId)

  if (itemIndex !== -1) {
    orderItems.splice(itemIndex, 1)
  }

  renderOrderCheckout()
}

function handleCompleteOrderClick(event) {
  event.stopPropagation()

  const paymentModal = document.querySelector('#payment-modal')
  if (paymentModal.classList.contains('hidden')) {
    paymentModal.classList.remove('hidden')
  }
  addModalCloseHandler()
}

function addModalCloseHandler() {
  const paymentModal = document.querySelector('#payment-modal')
  const modalContainer = document.querySelector('.modal-container')

  function closeModal(event) {
    const isTargetNotModalDescendant = !modalContainer.contains(event.target)
    const isPaymentModalVisible = !paymentModal.classList.contains('hidden')

    if (isTargetNotModalDescendant && isPaymentModalVisible) {
      paymentModal.classList.add('hidden')
    }
  }

  document.addEventListener('click', closeModal, { once: true })
}

function getCompleteOrderStatusHtml(name) {
  return `<div class="order-status">
            Thanks, ${name}! Your order is on its way!
          </div>`
}

function renderCompleteOrderStatus(formData) {
  const customerName = formData.get('customer-name')
  const orderStatusMessage = getCompleteOrderStatusHtml(customerName)
  const orderStatusContainer = document.getElementById('order-complete')
  const orderCheckoutContainer = document.getElementById('order-checkout')

  orderCheckoutContainer.classList.add('hidden')

  orderStatusContainer.innerHTML = orderStatusMessage
  orderStatusContainer.classList.remove('hidden')

  orderItems.length = 0

  const paymentForm = document.getElementById('payment-details-form')
  resetForm(paymentForm)
}

function initializeApp() {
  if (!window.hasInitialized) {
    renderMenuItems()
    addButtonClickHandlers()
    addFormListeners()
    window.hasInitialized = true
  }
}

document.addEventListener('DOMContentLoaded', initializeApp, { once: true })

