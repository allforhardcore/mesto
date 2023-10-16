class Card {
  constructor(data, templateSelector, handleCardClick, popupWithConfirmation, deleteHandler, likeHandler, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardImage = null;
    this._popupWithConfirmation = popupWithConfirmation;
    this._canDelete = data.owner ? data.owner._id === userId : false;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._userId = userId;
    this._canLike = data.likes && data.likes.some((like) => like._id === userId);

    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__picture');
    this._cardHeading = this._card.querySelector('.element__heading');
    this._cardLikesBtn = this._card.querySelector('.element__like-button');
    this._cardLikesCounter = this._card.querySelector('.element__like-counter');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
//-------------------------------------------------------------------------- Я думал я умру от старости раньше чем это заработает
  _handleLikeClick = (event) => {

    //-------------------------------------------------------------------------- Сохраняем текущее состояние
    const initialLikes = this._likes.slice();
    const initialCanLike = this._canLike;

    //-------------------------------------------------------------------------- Немедленно переключаем кнопку "Нравится"
    this._likes = this._canLike
    ? [...this._likes, { _id: this._userId }]
    : this._likes.filter((userLikes) => userLikes._id !== this._userId);
    this._canLike = !this._canLike;
    this._likeHandler(this)     //------------- Эту штуку не убрать отсюда, если ее убрать не работает корректно изменение состояния кнопки

    .then((data) => {
      this._likes = data.likes;
      this._canLike = data.likes.some((like) => like._id === this._userId);
      this._updateLikeState();
    })
    .catch((error) => {
      console.log('Что-то пошло не так...');
    })
  }

  _updateLikeState() {
    this._cardLikesCounter.textContent = this._likes.length;
    if (this._canLike) {
      this._cardLikesBtn.classList.add('element__like-button_state_activated');
    } else {
      this._cardLikesBtn.classList.remove('element__like-button_state_activated');
    }
  }

  _handleDeleteClick = () => {
    this._popupWithConfirmation.setCardToDelete(this);
    this._popupWithConfirmation.setDeleteHandler(() => {
      this._deleteHandler(this)
    });
    this._popupWithConfirmation.open();
  }

  deleteElement() {
    this._card.remove();
    this._cardImage = null;
    this._cardHeading = null;
    this._card = null;
    this._popupWithConfirmation.close();
  }


  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._cardLikesCounter.textContent = this._likes.length;

    if (this._canLike) {
      this._cardLikesBtn.classList.add('element__like-button_state_activated');
    }

    if (!this._canDelete) {
      const deleteButton = this._card.querySelector('.element__delete-button');
      if (deleteButton) {
        deleteButton.remove();
      }
    }

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardLikesBtn.addEventListener('click', this._handleLikeClick);

    if (this._canLike) {
      this._cardLikesBtn.classList.add('element__like-button_state_activated');
    }

    if (this._card.querySelector('.element__delete-button')) {
      this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteClick);
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ src: this._link, alt: this._name });
    });
  }
}

export default Card;

