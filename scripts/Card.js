

class Card {
  constructor(data, templateSelector, showPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPopup = showPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    this._card.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteClick);
    this._card.querySelector('.element__picture').addEventListener('click', this._handleImageClick);
  }

  _handleLikeClick = (event) => {
    event.target.classList.toggle('element__like-button_state_activated');
  }

  _handleDeleteClick = () => {
    this._card.remove();
    this._card = null;
  }

  _handleImageClick = () => {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    this._showPopup(popupPic);
  }

  createCard() {
    this._card = this._getTemplate();
    const cardImage = this._card.querySelector('.element__picture');
    const cardHeading = this._card.querySelector('.element__heading');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardHeading.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
export default Card;


