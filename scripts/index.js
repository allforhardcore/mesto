import Card from './Card.js';
import FormValidator from './FormValidator.js';

const showPopup = (popup) => {
  popup.classList.add('popup_state_show');
  document.addEventListener('keydown', hidePopupOnEsc);
  document.addEventListener('click', hidePopupOnOverlayClick);
};

const hidePopup = (popup) => {
  popup.classList.remove('popup_state_show');
  document.removeEventListener('keydown', hidePopupOnEsc);
  document.removeEventListener('click', hidePopupOnOverlayClick);
};

const hidePopupOnEsc = (event) => {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_state_show');
      hidePopup(popupActive);
  }
};

const hidePopupOnOverlayClick = (event) => {
  if (event.target.classList.contains('popup_state_show')) {
    hidePopup(event.target);
  }
};

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#element', showPopup);
  const cardElement = card.createCard();
  cardsContainer.appendChild(cardElement);
});

const profileFormValidator = new FormValidator({
  formSelector: '.popup__form_type_profile',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__error_visible'
}, document.querySelector('.popup_type_profile'));

profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator({
  formSelector: '.popup__form_type_place',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__error_visible'
}, document.querySelector('.popup_type_place'));

placeFormValidator.enableValidation();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileHeading.textContent = newName;
  profileCaption.textContent = newJob;

  hidePopup(popupProfile);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeInput.value,
    link: imageInput.value
  };

  const newCard = new Card(newCardData, '#element', showPopup);
  const cardElement = newCard.createCard();
  cardsContainer.prepend(cardElement);

  hidePopup(popupPlace);
  formPlace.reset();
}

const inputErrorReset = (popupForm) => {
  const inputErrorElements = popupForm.querySelectorAll('.popup__input-error');
  inputErrorElements.forEach(errorElement => {
    errorElement.textContent = '';
  });
};

addButton.addEventListener('click', () => {
  placeInput.value = '';
  imageInput.value = '';

  const submitButton = popupPlace.querySelector('.popup__submit-button');
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_disabled');

  formProfile.reset();
  showPopup(popupPlace);

});

editButton.addEventListener('click', () => {
  nameInput.value = profileHeading.textContent;
  jobInput.value = profileCaption.textContent;
  inputErrorReset(formProfile);
  showPopup(popupProfile);
});


formPlace.addEventListener('submit', handlePlaceFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});

