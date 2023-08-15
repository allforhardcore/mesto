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
