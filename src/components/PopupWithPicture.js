import Popup from './Popup.js'

class PopupWithPicture extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open({ src, alt }) {
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupCaption.textContent = alt;
    super.open();
  }
}

export default PopupWithPicture;
