
const showPopup = popup => popup.classList.add('popup_state_show');
const hidePopup = popup => popup.classList.remove('popup_state_show');

const hidePopupOnEsc = (event) => {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_state_show');
    if (popupActive) {
      hidePopup(popupActive);
    }
  }
};

const hidePopupOnOverlayClick = (event) => {
  if (event.target.classList.contains('popup_state_show')) {
    hidePopup(event.target);

  }
};

function createCard(cardData) {
  const cardTemplate = document.querySelector('#element').content;
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
    showPopup(popupPic);
});

  function previewImage({link, name}) {
    const popupCaption = document.querySelector('.popup__caption');
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
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
  checkInputValidity(formPlace, placeInput);
  checkInputValidity(formPlace, imageInput);

  const newCardData = {
    name: placeInput.value,
    link: imageInput.value
  };

  const newCard = createCard(newCardData);
  cardsContainer.prepend(newCard);
  formPlace.reset();
  hidePopup(popupPlace);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  checkInputValidity(formProfile, nameInput);
  checkInputValidity(formProfile, jobInput);

  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileHeading.textContent = newName;
  profileCaption.textContent = newJob;

  hidePopup(popupProfile);

  // две строки ниже коммента в этой функции я написал,
  // потому что когда пользователь открывает форму первый раз,
  // она уже предзаполнена (Жак иф кусто иследователь океана)
  // но кнопка submit задизейблена (что логично, типа мы не даем
  // сохранить уже сохраненные данные), но если пользователь изменил текст
  // и засабмитил изменения, а после еще раз открыл модалку, то поля заполненны
  // уже обновленными данными (сохраненными первым сабмитом)
  // но кнопка сабмит теперь не задизеблена, хотя тут ситуация такая же исходный
  // текст уже сохранен. В таком случае toggleButtonState не работает,
  // потому что валидация фактически проходит ее условия и дизейбл в такой функции
  // не срабатывает. Я не нашел более изящного решения, кроме как руками тут снимать классы..

formProfile.querySelector('.popup__submit-button').setAttribute('disabled', true);
formProfile.querySelector('.popup__submit-button').classList.add('popup__submit-button_disabled');
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
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-item'));
  const submitButton = formElement.querySelector('.popup__submit-button');

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputList, submitButton);
    });
  });
}

setEventListeners(formPlace);
setEventListeners(formProfile);

addButton.addEventListener('click', () => showPopup(popupPlace));
editButton.addEventListener('click', () => showPopup(popupProfile));

formPlace.addEventListener('submit', handlePlaceFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);

document.addEventListener('keydown', hidePopupOnEsc);
document.addEventListener('click', hidePopupOnOverlayClick);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});
