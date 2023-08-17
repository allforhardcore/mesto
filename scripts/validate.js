const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

function checkInputValidity(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
  } else {
    errorElement.textContent = '';
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
  }
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    submitButton.setAttribute('disabled', true);

    setEventListeners(formElement, submitButton, settings);
  });
}

function toggleButtonState(buttonElement, inputList, initialValues, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(formElement, submitButton, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  const initialValues = inputList.map(inputElement => inputElement.value);

  toggleButtonState(submitButton, inputList, initialValues, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(submitButton, inputList, initialValues, settings);
    });
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


