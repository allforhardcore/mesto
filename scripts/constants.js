const cardTemplate = document.querySelector('#element').content;

const closeButtons = document.querySelectorAll('.popup__close-button');
const popup = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.elements');
const cardImages = document.querySelectorAll('.element__picture');

const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupPic = document.querySelector('.popup_type_image');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupForm = document.querySelectorAll('.popup__form');
const submitButton = document.querySelector('.popup__submit-button');
const formPlace = document.forms.formPlace;
const formProfile = document.forms.formProfile;

const nameInput = formProfile.elements.popupInputProfileName;
const jobInput = formProfile.elements.popupInputProfileAbout;
const placeInput = formPlace.elements.popupInputPlaceName;
const imageInput = formPlace.elements.popupInputImageLink;


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
