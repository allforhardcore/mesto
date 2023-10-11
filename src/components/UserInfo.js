class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, avatarLinkInput}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarPicture = document.querySelector(avatarSelector);
    this._userId = null;
    this._avatarLinkInput = avatarLinkInput;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarPicture.src,
      _id: this._userId
    };
  }



  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarPicture.src = avatar;
    this._userId = _id;
  }

}

export default UserInfo;



