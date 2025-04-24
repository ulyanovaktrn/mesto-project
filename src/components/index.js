import { enableValidation, inactivateButton, resetValidation } from './validate.js'
import { closeModal, openModal } from './modal.js'
import { createCard } from './card.js';
import { getUserInfo, getInitialCards, editProfile, addCard, updateAvatar } from './api.js';
import '../pages/index.css';


const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const cardFormElement = document.querySelector('.popup__form[name="new-place"]');

const profileEditButton = document.querySelector('.profile__edit-button');
//const closeProfileEditButton = profilePopup.querySelector('.popup__close');
const cardAddButton = document.querySelector('.profile__add-button');
const cardSubmitBtn = cardPopup.querySelector('.popup__button');
//const closeCardAddButton = cardPopup.querySelector('.popup__close');
//const closeImageButton = imagePopup.querySelector('.popup__close');
//const closePopupsButtons = document.querySelectorAll('.popup__close');
//const cardSubmitBtn = cardPopup.querySelector('.popup__button');
const profileSubmitBtn = profilePopup.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image-picture');
let profileId;

const avatarUpdateBtn = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarFormElement = document.querySelector('.popup__form[name="update-avatar"]');
const urlAvatarInput = avatarPopup.querySelector('.popup__input_type_url');
const avatarSubmitBtn = avatarPopup.querySelector('.popup__button');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const nameCardInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlCardInput = cardPopup.querySelector('.popup__input_type_url');
const nameImage = imagePopup.querySelector('.popup__caption');
const urlImage = imagePopup.querySelector('.popup__image');

const placesList = document.querySelector('.places__list');

const loadingSubmitText = 'Сохранение...';
const defaultSubmitText = 'Сохранить';

popups.forEach((item) => item.classList.add('popup_is-animated'));

popups.forEach((item) => {
  item.querySelector('.popup__close').addEventListener('click', () => closeModal(item));
  item.addEventListener('mousedown', function(evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(item);
    }
  })
});

function openImageCardPopup(imageCard){
  nameImage.textContent = imageCard.alt;
  urlImage.src = imageCard.src;
  urlImage.alt = imageCard.alt;
  openModal(imagePopup);
}

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  resetValidation(profileFormElement, validationSettings);
  openModal(profilePopup);
}

function openCardPopup() {
  nameCardInput.value = null;
  urlCardInput.value = null;
  resetValidation(cardFormElement, validationSettings);
  openModal(cardPopup);
}

function openAvatarPopup() {
  urlAvatarInput.value = null;
  resetValidation(avatarFormElement, validationSettings);
  openModal(avatarPopup);
}

function renderBtnText(btn, text) {
  btn.textContent = text;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderBtnText(profileSubmitBtn, loadingSubmitText);
  editProfile(nameInput.value, jobInput.value)
    .then(profileData => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(profilePopup);
      inactivateButton(profileSubmitBtn, validationSettings);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderBtnText(profileSubmitBtn, defaultSubmitText);
    })
}

function handleCardFormSubmit(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderBtnText(cardSubmitBtn, loadingSubmitText);
  addCard(nameCardInput.value, urlCardInput.value)
    .then(cardData => {
      placesList.prepend(createCard(cardData, profileId, openImageCardPopup));
      closeModal(cardPopup);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderBtnText(cardSubmitBtn, defaultSubmitText);
    });
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  renderBtnText(avatarSubmitBtn, loadingSubmitText);
  updateAvatar(urlAvatarInput.value)
    .then(avatarData => {
      profileImage.src = avatarData.avatar;
      closeModal(avatarPopup);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderBtnText(avatarSubmitBtn, defaultSubmitText);
    });
}

profileEditButton.addEventListener('click', openProfilePopup);
//closeProfileEditButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', openCardPopup);
//closeCardAddButton.addEventListener('click', () => closeModal(cardPopup));
//closeImageButton.addEventListener('click', () => closeModal(imagePopup));
avatarUpdateBtn.addEventListener('click', openAvatarPopup);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    profileId = userData._id;
    initialCards.forEach((item) => {
      placesList.append(createCard(item, profileId, openImageCardPopup));
    })
  })
  .catch((err) => {
    console.log(err);
  })