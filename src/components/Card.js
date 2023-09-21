class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardImage = null;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick = (event) => {
    event.target.classList.toggle('element__like-button_state_activated');
  }

  _handleDeleteClick = () => {
    this._card.remove();
    this._cardImage = null;
    this._cardHeading = null;
    this._card = null;
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__picture');
    this._cardHeading = this._card.querySelector('.element__heading');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteClick);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ src: this._link, alt: this._name });
    });
  }
}

export default Card;
