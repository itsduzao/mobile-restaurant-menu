export function validateForm({
  cardOwnerName,
  cardNumber,
  billingCardSecurityCode,
}) {
  const inputValidations = [
    {
      input: cardOwnerName,
      validations: [
        {
          isValid: () => cardOwnerName.value.trim() !== '',
          message: 'Name must not be blank.',
        },
        {
          isValid: () => cardOwnerName.value.length >= 4,
          message: 'Please enter your name (at least 4 characters).',
        },
      ],
    },
    {
      input: cardNumber,
      validations: [
        {
          isValid: () => cardNumber.value.length === 19,
          message:
            'Please enter a valid card number in the format xxxx-xxxx-xxxx-xxxx.',
        },
      ],
    },
    {
      input: billingCardSecurityCode,
      validations: [
        {
          isValid: () => billingCardSecurityCode.value.length === 3,
          message: 'Please enter a valid 3-digit CVV.',
        },
      ],
    },
  ]

  const isFormValid = !inputValidations.some(({ input, validations }) => {
    input.setCustomValidity('')
    const isInputValid = validations.some(({ isValid, message }) => {
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

