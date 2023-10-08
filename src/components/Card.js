import { myId } from "../utils/constants";

class Card {
  constructor(data, templateSelector, handleCardClick, popupWithConfirmation, deleteHandler, likeHandler) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardImage = null;
    this._popupWithConfirmation = popupWithConfirmation;
    this._canDelete = data.owner ? data.owner._id === myId : false;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick = (event) => {
    this._cardLikesCounter = this._card.querySelector('.element__like-counter');
    this._cardLikesBtn = this._card.querySelector('.element__like-button');
    this._likeHandler(this).then((data) => {
      this._likes = data.likes;
      this._canLike = data.likes.find((userLikes) => userLikes._id === myId) ? false : true;
      if(this._canLike) {
        this._cardLikesBtn.classList.remove('element__like-button_state_activated')
      }else{
        this._cardLikesBtn.classList.add('element__like-button_state_activated')
      }

      this._cardLikesCounter.textContent = this._likes.length
    });
  }

  _handleDeleteClick = () => {
    this._popupWithConfirmation.setCardToDelete(this);
    this._popupWithConfirmation._setDeleteHandler((_card) => {
      this._card.remove();
      this._cardImage = null;
      this._cardHeading = null;
      this._card = null;
      this._popupWithConfirmation.close();
      this._deleteHandler(this)
    });
    this._popupWithConfirmation.open();
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__picture');
    this._cardHeading = this._card.querySelector('.element__heading');
    this._cardLikesBtn = this._card.querySelector('.element__like-button');
    this._cardLikesCounter = this._card.querySelector('.element__like-counter');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._cardLikesCounter.textContent = this._likes.length
    if(this._canLike) {
      this._cardLikesBtn.classList.add('element__like-button_state_activated')
    }

    if (!this._canDelete) {
      this._card.querySelector('.element__delete-button').remove();
    }

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    if(this._card.querySelector('.element__delete-button')) {
      this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteClick);
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ src: this._link, alt: this._name });
    });
  }
}

export default Card;