export const cardTemplate = document.querySelector('#element').content;

export const closeButtons = document.querySelectorAll('.popup__close-button');

export const profileHeading = document.querySelector('.profile__heading');
export const profileCaption = document.querySelector('.profile__caption');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

export const popupForms = document.querySelectorAll('.popup__form');
export const submitButton = document.querySelector('.popup__submit-button');
export const formPlace = document.forms.formPlace;
export const formProfile = document.forms.formProfile;

export const nameInput = formProfile.elements.popupInputProfileName;
export const jobInput = formProfile.elements.popupInputProfileAbout;
export const placeInput = formPlace.elements.popupInputPlaceName;
export const imageInput = formPlace.elements.popupInputImageLink;

export const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__error_visible'
};

export const initialCards = [
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
