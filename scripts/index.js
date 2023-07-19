let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-item_el_name');
let jobInput = document.querySelector('.popup__input-item_el_about');
let profileHeading = document.querySelector('.profile__heading');
let profileCaption = document.querySelector('.profile__caption');

function showPopup() {
  popup.classList.add("popup_state_show");

  let headingContent = profileHeading.textContent;
  nameInput.value = headingContent;

  let captionContent = profileCaption.textContent;
  jobInput.value = captionContent;

}

function hidePopup() {
  popup.classList.remove("popup_state_show");
}








function handleFormSubmit(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;

  profileHeading.textContent = newName;
  profileCaption.textContent = newJob;
  hidePopup();
}

popupForm.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
