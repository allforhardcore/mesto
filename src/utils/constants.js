export const cardTemplate = document.querySelector('#element').content;

export const closeButtons = document.querySelectorAll('.popup__close-button');

export const avatarPicture = document.querySelector('.profile__picture');
export const profileHeading = document.querySelector('.profile__heading');
export const profileCaption = document.querySelector('.profile__caption');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const pictureEditButton = document.querySelector('.profile__picture-edit-button');

export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

export const popupForms = document.querySelectorAll('.popup__form');
export const submitButton = document.querySelector('.popup__submit-button');
export const activeSubmitButton = '.popup_state_show .popup__submit-button';
export const formPlace = document.forms.formPlace;
export const formProfile = document.forms.formProfile;
export const formAvatar = document.forms.formAvatar;

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

export const myId = '3bbb76c95a23d91133e55a38';
