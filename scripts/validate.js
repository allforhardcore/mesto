const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

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

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const submitButton = formElement.querySelector('.popup__submit-button');
    submitButton.setAttribute('disabled', true);

    setEventListeners(formElement, submitButton);
  });
}

function toggleButtonState(buttonElement, inputList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__submit-button_disabled');
  }
}

function setEventListeners(formElement, submitButton) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-item'));

  const initialValues = inputList.map(inputElement => inputElement.value);

  toggleButtonState(submitButton, inputList, initialValues);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(submitButton, inputList, initialValues);
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



// не могу понять почему не срабатывает блокировка кнопки сабмита после добавления карточки... в инспекторе кода как будто видно что этот класс что то снимает..
