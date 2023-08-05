const showPopup = popup => {
  popup.classList.add("popup_state_show");
}

const hidePopup = popup=> {
  popup.classList.remove('popup_state_show');
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#element').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__picture');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const cardHeading = cardElement.querySelector('.element__heading');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardHeading.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => {
    previewImage(cardData);
    showPopup(popupPic);
  });

  function previewImage({link, name}) {
    const popupCaption = document.querySelector('.popup__caption');
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = cardImage.link;
    popupImage.alt = cardImage.name;
    popupCaption.textContent = name;
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

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newName = placeInput.value;
  const newImageLink = imageInput.value;
  const newCardData = {
    name: newName,
    link: newImageLink
  };

  const newCard = createCard(newCardData);
  cardsContainer.prepend(newCard);
  formPlace.reset();
  newCard.querySelector('.element__picture').addEventListener('click', previewImage);

  hidePopup(evt);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileHeading.textContent = newName;
  profileCaption.textContent = newJob;

  hidePopup(evt);
}

addButton.addEventListener('click', () => showPopup(popupPlace));
editButton.addEventListener('click', () => showPopup(popupProfile));

placeForm.addEventListener('submit', handlePlaceFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});
