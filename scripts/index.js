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

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  showPopup(popupPic);
}

function createCard(item) {
  const card = new Card(item, '#element', handleCardClick);
  return card.createCard();
}

function addCardToContainer(cardElement, cardsContainer) {
  cardsContainer.appendChild(cardElement);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  addCardToContainer(cardElement, cardsContainer);
});

const profileFormValidator = new FormValidator(formValidatorConfig, document.forms["formProfile"]);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(formValidatorConfig, document.forms["formPlace"]);
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

  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);
  hidePopup(popupPlace);
}

addButton.addEventListener('click', () => {
  formPlace.reset();
  placeFormValidator.resetValidation();
  showPopup(popupPlace);
});

editButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  nameInput.value = profileHeading.textContent;
  jobInput.value = profileCaption.textContent;
  showPopup(popupProfile);
});


formPlace.addEventListener('submit', handlePlaceFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});

