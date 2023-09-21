import './index.css';
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
      } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PicturePopup from '../components/PicturePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupPic = new PicturePopup('.popup_type_image');
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
  const card = new Card(item, '#element', (cardData) => {
    popupPic.open(cardData);
  });
  return card.createCard();
}

function handleProfileFormSubmit(inputValues) {
  const newName = inputValues.popupInputProfileName;
  const newJob = inputValues.popupInputProfileAbout;

  userInfo.setUserInfo({ name: newName, about: newJob });

  hidePopup(popupProfile);
}

function handlePlaceFormSubmit(inputValues) {
  const newCardData = {
    name: inputValues.popupInputPlaceName,
    link: inputValues.popupInputImageLink
  };

  const cardElement = createCard(newCardData);
  cardsSection.addItem(cardElement);
  hidePopup(popupPlace);
}

addButton.addEventListener('click', () => {
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

popupPlace.setEventListeners();
popupProfile.setEventListeners();

