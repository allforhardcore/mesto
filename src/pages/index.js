import './index.css';
import {cardTemplate,
        closeButtons,
        avatarPicture,
        profileHeading,
        profileCaption,
        editButton,
        addButton,
        pictureEditButton,
        popupImage,
        popupCaption,
        popupForms,
        submitButton,
        formPlace,
        formProfile,
        formAvatar,
        nameInput,
        jobInput,
        placeInput,
        imageInput,
        activeSubmitButton,
        formValidatorConfig,
      } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithPicture from '../components/PopupWithPicture.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/popupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Avatar from '../components/Avatar.js';
import {Api} from '../components/Api.js'

//------------------------------------------------------------------------------------- Апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  authorization: '5cd71d81-2a88-497e-99eb-8405496caa7c',
});

//------------------------------------------------------------------------------------- Получение данных о карточках
const loadCards = () => {
  api.getInitialCards()
  .then((data) => {
    cardsSection.setItems(data.reverse())
    cardsSection.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });
}

//------------------------------------------------------------------------------------- Загрузка страницы
loadCards();

//------------------------------------------------------------------------------------- Аватар
const avatarInput = formAvatar.elements.popupInputAvatarLink;
const avatar = new Avatar(avatarPicture, avatarInput);

//------------------------------------------------------------------------------------- Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__heading',
  aboutSelector: '.profile__caption',
});

const loadUserData = () => {
  api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo( {name: data.name, about: data.about })
    avatar.setAvatar(data.avatar);
  })
  .catch((error) => {
    console.log(error);
  });
}

loadUserData();

//------------------------------------------------------------------------------------- Создание попапов
const popupPic = new PopupWithPicture('.popup_type_image');
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const popupPlace = new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);
const popupConfirmation = new PopupWithConfirmation('.popup_type_confirmation');

//------------------------------------------------------------------------------------- Создание секции и рендер карточек
const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsSection.addItemPreview(cardElement);
  }
}, '.elements');

//------------------------------------------------------------------------------------- Валидация
const profileFormValidator = new FormValidator(formValidatorConfig, document.forms["formProfile"]);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(formValidatorConfig, document.forms["formPlace"]);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formValidatorConfig, document.forms["formAvatar"]);
avatarFormValidator.enableValidation();

//------------------------------------------------------------------------------------- Открытие и закрытие попапов
function showPopup(popup) {
  popup.open();
}

function hidePopup(popup) {
  popup.close();
}

//------------------------------------------------------------------------------------- Создание карточки
function createCard(item) {
  const card = new Card(item, '#element', (cardData) => {
    popupPic.open(cardData);
  }, popupConfirmation,
  (card) => {
    api.removeCard(card._id).then(() => console.log('Deleted'))
  },
  (card) => {
    if(card._canLike) {
      return api.likeCard(card._id)
    } else {
      return api.removeLike(card._id)
    }
  }
  );
  return card.createCard();
}

//------------------------------------------------------------------------------------- Ручка сабмита Аватар
function handleAvatarFormSubmit() {
  document.querySelector(activeSubmitButton).textContent = 'Сохранение...'
  api.setAvatar({avatar: avatarInput.value})
  .then((data) => {
    avatar.setAvatar(data.avatar);
  document.querySelector(activeSubmitButton).textContent = 'Сохранить'
    hidePopup(popupAvatar);
  })
  .catch((error) => {
    console.log('Что-то пошло не так...')
  });
}

//------------------------------------------------------------------------------------- Ручка сабмита Профайл
function handleProfileFormSubmit(inputValues) {
  const newName = inputValues.popupInputProfileName;
  const newJob = inputValues.popupInputProfileAbout;
  document.querySelector(activeSubmitButton).textContent = 'Сохранение...'
  api.editUserInfo({ name: newName, about: newJob })
  .then((data) => {
    userInfo.setUserInfo({ name: data.name, about: data.about });
    document.querySelector(activeSubmitButton).textContent = 'Сохранить'
    hidePopup(popupAvatar);
  })
  .catch((error) => {
    console.log('Что-то пошло не так...')
  });
}

//------------------------------------------------------------------------------------- Ручка сабмита Карточка
function handlePlaceFormSubmit(inputValues) {
  const newCardData = {
    name: inputValues.popupInputPlaceName,
    link: inputValues.popupInputImageLink,
    _id: 'fake'
  };
  const cardElement = createCard(newCardData);
  document.querySelector(activeSubmitButton).textContent = 'Сохранение...'
  api.addCard(newCardData)
  .then(() => {
    loadCards()
    document.querySelector(activeSubmitButton).textContent = 'Сохранить'
    hidePopup(popupPlace);
  })
}

//------------------------------------------------------------------------------------- Добавление слушателя Aватар
pictureEditButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  showPopup(popupAvatar);
});

//------------------------------------------------------------------------------------- Добавление слушателя Профайл
editButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.about;
  showPopup(popupProfile);
});

//------------------------------------------------------------------------------------- Добавление слушателя Карточка
addButton.addEventListener('click', () => {
  placeFormValidator.resetValidation();
  showPopup(popupPlace);
});

popupPlace.setEventListeners();
popupProfile.setEventListeners();
popupPic.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatar.setEventListeners();
