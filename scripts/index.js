let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');

function showPopup() {
  popup.style.display = 'flex';
}

function hidePopup() {
  popup.style.display = 'none';
}

editButton.addEventListener('click', showPopup);

closeButton.addEventListener('click', hidePopup);


let saveButton = document.querySelector('.popup__submit-button');
let nameInput = document.querySelector('.popup__input-item_el_name');
let jobInput = document.querySelector('.popup__input-item_el_about');
let profileHeading = document.querySelector('.profile__heading');
let profileCaption = document.querySelector('.profile__caption');

function handleFormSubmit(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;

  profileHeading.textContent = newName;
  profileCaption.textContent = newJob;
}

saveButton.addEventListener('click', handleFormSubmit);
