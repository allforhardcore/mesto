
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

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__picture');
  const cardHeading = cardElement.querySelector('.element__heading');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardHeading.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => {
    previewImage(cardData);
});

  function previewImage({link, name}) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    showPopup(popupPic);
  }

  return cardElement;
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardsContainer.appendChild(card);
});

function likeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('element__like-button_state_activated');
};

function deleteCard(event) {
  const card = event.target.closest('.element');
    card.remove();
}

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
  const newCard = createCard(newCardData);
  cardsContainer.prepend(newCard);

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

  formProfile.reset();
  inputErrorReset(formPlace);
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


