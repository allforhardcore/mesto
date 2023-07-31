const closeButtons = document.querySelectorAll('.popup__close-button');
const popupForm = document.querySelectorAll('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupContentProfile = document.querySelector('.popup__container_type_profile');
const popupContentPlace = document.querySelector('.popup__container_type_place');
const popupContentImage = document.querySelector('.popup__container_type_image');

const nameInput = document.querySelector('.popup__input-item_el_name');
const jobInput = document.querySelector('.popup__input-item_el_about');
const placeInput = document.querySelector('.popup__input-item_el_place');
const imageInput = document.querySelector('.popup__input-item_el_image');
const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');

const cardsContainer = document.querySelector('.elements');


const initialCards = [
  {
    name: 'Vossebanen, Fjeldport ved Bolstad Dato',
    link: 'https://images.unsplash.com/photo-1689714321677-a914620d6b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2200&q=80'
  },
  {
    name: 'Austria',
    link: 'https://images.unsplash.com/photo-1690205074022-560b3587cbc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80'
  },
  {
    name: 'Italy',
    link: 'https://images.unsplash.com/photo-1690184432960-ea288727b9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(cardData) {
  const cardElement = document.createElement('article');
  cardElement.classList.add('element');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('element__delete-button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('aria-label', 'удалить');
  deleteButton.addEventListener('click', deleteCard);


  const cardImage = document.createElement('img');
  cardImage.classList.add('element__picture');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', showPopup);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('element__content-wrapper');

  const cardHeading = document.createElement('h2');
  cardHeading.classList.add('element__heading');
  cardHeading.textContent = cardData.name;

  const likeButton = document.createElement('button');
  likeButton.classList.add('element__like-button');
  likeButton.setAttribute('type', 'button');
  likeButton.setAttribute('aria-label', 'лайк');

  contentWrapper.appendChild(cardHeading);
  contentWrapper.appendChild(likeButton);

  cardElement.appendChild(cardImage);
  cardElement.appendChild(deleteButton);
  cardElement.appendChild(contentWrapper);

  return cardElement;
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardsContainer.appendChild(card);
});

const likeButtons = document.querySelectorAll('.element__like-button');
function likeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('element__like-button_state_activated');
};


const deleteButtons = document.querySelectorAll('.element__delete-button');
function deleteCard(event) {
  const deleteButton = event.target;
  const cardElement = deleteButton.parentElement;
  cardElement.remove();
}

function showPopup() {
  popup.classList.add("popup_state_show");

  if (this === addButton) {
    popupContentPlace.classList.add('popup__container_state_show');
  } else if (this === editButton) {
    popupContentProfile.classList.add('popup__container_state_show');
    let headingContent = profileHeading.textContent;
    nameInput.value = headingContent;
    let captionContent = profileCaption.textContent;
    jobInput.value = captionContent;
  } else if (this.classList.contains('element__picture')) {
    const cardElement = this.parentElement;
    const cardHeading = cardElement.querySelector('.element__heading');
    const cardImage = cardElement.querySelector('.element__picture');
    const popupCaption = document.querySelector('.popup__caption');
    popupContentImage.classList.add('popup__container_state_show');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popup.classList.add('popup_background_dark');
    popupCaption.textContent = cardHeading.textContent;
  }
}

function hidePopup() {
  popup.classList.remove('popup_state_show');
  popupContentPlace.classList.remove('popup__container_state_show');
  popupContentProfile.classList.remove('popup__container_state_show');
  popupContentImage.classList.remove('popup__container_state_show');
  popup.classList.remove('popup_state_image-click');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (popupContentPlace.classList.contains('popup__container_state_show')) {

    const newName = placeInput.value;
    const newImageLink = imageInput.value;
    const newCardData = {
      name: newName,
      link: newImageLink
    };
    const newCard = createCard(newCardData);
    cardsContainer.prepend(newCard);
    popupForm.forEach(form => form.reset());

} else if (popupContentProfile.classList.contains('popup__container_state_show')) {
    let newName = nameInput.value;
    let newJob = jobInput.value;
    profileHeading.textContent = newName;
    profileCaption.textContent = newJob;
  }

    hidePopup();
}

deleteButtons.forEach((remove) => {
  remove.addEventListener('click', deleteCard);
})

likeButtons.forEach((like) => {
  like.addEventListener('click', likeCard);
});
closeButtons.forEach((button) => {
  button.addEventListener('click', hidePopup);
});
popupForm.forEach((submit) => {
  submit.addEventListener('submit', handleFormSubmit);
})
addButton.addEventListener('click', showPopup);
editButton.addEventListener('click', showPopup);


