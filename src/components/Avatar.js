class Avatar {
  constructor(avatarPicture, avatarLinkInput) {
    this._avatarPicture = avatarPicture;
    this._avatarLinkInput = avatarLinkInput;
  }

  setAvatar(avatar) {
    //const avatarLink = this._avatarLinkInput.value;
    console.log('Ava', avatar, this._avatarPicture)
    this._avatarPicture.src = avatar;
  }
}

export default Avatar;
