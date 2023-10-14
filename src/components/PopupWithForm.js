import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, buttonText) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input-item');
    this._defaultButtonText = buttonText || 'Сохранить';
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(loading) {
    if (loading) {
      this._form.querySelector('.popup__submit-button').textContent = 'Сохранение...';
    } else {
      this._form.querySelector('.popup__submit-button').textContent =  this._defaultButtonText;
    }
  }
}

export default PopupWithForm;
