import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
    this._cardToDelete = null;
    this._deleteHandler = null;
  }

  setCardToDelete(card) {
    this._cardToDelete = card;
  }

  _setDeleteHandler(handler) {
    this._deleteHandler = handler;
  }

  _handleConfirmClick() {
    if (this._deleteHandler) {
      this._deleteHandler(this._cardToDelete);
    }
  }

  open() {
    super.open();
    this._confirmButton.addEventListener('click', this._handleConfirmClick);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener('click', this._handleConfirmClick);
  }
}

export default PopupWithConfirmation;
