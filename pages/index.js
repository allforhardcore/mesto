import '../pages/index.css';
import {cardTemplate,
        closeButtons,
        profileHeading,
        profileCaption,
        editButton,
        addButton,
        popupImage,
        popupCaption,
        popupForms,
        submitButton,
        formPlace,
        formProfile,
        nameInput,
        jobInput,
        placeInput,
        imageInput,
        formValidatorConfig,
        initialCards
      } from '../scripts/constants.js';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PicturePopup.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';


const popupPic = new PopupWithImage('.popup_type_image');
const userInfo = new UserInfo({
  nameSelector: '.profile__heading',
  aboutSelector: '.profile__caption'
});

const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const popupPlace = new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsSection.addItem(cardElement);
  }
}, '.elements');

const profileFormValidator = new FormValidator(formValidatorConfig, document.forms["formProfile"]);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(formValidatorConfig, document.forms["formPlace"]);
placeFormValidator.enableValidation();

cardsSection.renderItems();

function showPopup(popup) {
  popup.open();
}

function hidePopup(popup) {
  popup.close();
}

function createCard(item) {
  const card = new Card(item, '#element', ({ src, alt }) => {
    popupPic.open({ src, alt });
  });
  return card.createCard();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  userInfo.setUserInfo({ name: newName, about: newJob });

  hidePopup(popupProfile);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeInput.value,
    link: imageInput.value
  };

  const cardElement = createCard(newCardData);
  cardsSection.addItem(cardElement);
  hidePopup(popupPlace);
}

addButton.addEventListener('click', () => {
  formPlace.reset();
  placeFormValidator.resetValidation();
  showPopup(popupPlace);
});

editButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.about;
  showPopup(popupProfile);
});

formPlace.addEventListener('submit', handlePlaceFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);

popupProfile.setCloseButtonClickHandler(() => popupProfile.close());
popupPlace.setCloseButtonClickHandler(() => popupPlace.close());
popupPic.setCloseButtonClickHandler(() => popupPic.close());
