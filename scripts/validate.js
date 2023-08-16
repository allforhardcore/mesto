function checkInputValidity(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__input-item_type_error');
    errorElement.classList.add('popup__input-error_active');
  } else {
    errorElement.textContent = '';
    inputElement.classList.remove('popup__input-item_type_error');
    errorElement.classList.remove('popup__input-error_active');
  }
}


function toggleButtonState(inputList, buttonElement) {
  const isValid = inputList.every(input => input.validity.valid);

  if (isValid) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__submit-button_disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__submit-button_disabled');
  }
};

function setEventListeners(formElement, validation) {
  const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));
  const submitButton = formElement.querySelector(validation.submitButtonSelector);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, validation);
      toggleButtonState(inputList, submitButton, validation);
    });
  });

  toggleButtonState(inputList, submitButton, validation);
}

function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__error_visible'
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};


