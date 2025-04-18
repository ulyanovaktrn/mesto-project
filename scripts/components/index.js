import { enableValidation, inactivateButton } from './validate.js'

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const cardFormElement = document.querySelector('.popup__form[name="new-place"]');

const profileEditButton = document.querySelector('.profile__edit-button');
//const closeProfileEditButton = profilePopup.querySelector('.popup__close');
const cardAddButton = document.querySelector('.profile__add-button');
//const closeCardAddButton = cardPopup.querySelector('.popup__close');
//const closeImageButton = imagePopup.querySelector('.popup__close');
//const closePopupsButtons = document.querySelectorAll('.popup__close');
//const cardSubmitBtn = cardPopup.querySelector('.popup__button');
const profileSubmitBtn = profilePopup.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const nameCardInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlCardInput = cardPopup.querySelector('.popup__input_type_url');
const nameImage = imagePopup.querySelector('.popup__caption');
const urlImage = imagePopup.querySelector('.popup__image');

//Темплейт карточки
//const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

popups.forEach((item) => item.classList.add('popup_is-animated'));
// @todo: DOM узлы

//Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item));
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  } 
}

function openModal(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

//Функция создания карточки
function createCard(itemCard) {
  const cloneCardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const imageCard = cloneCardTemplate.querySelector('.card__image');
  const titleCard = cloneCardTemplate.querySelector('.card__title');

  const likeCardBtn = cloneCardTemplate.querySelector('.card__like-button');
  const delCardBtn = cloneCardTemplate.querySelector('.card__delete-button');

  imageCard.src = itemCard.link;
  imageCard.alt = itemCard.name;
  titleCard.textContent = itemCard.name;

  likeCardBtn.addEventListener('click', handleLikeCard);
  delCardBtn.addEventListener('click', handleDelCard);
  imageCard.addEventListener('click', () => openImageCardPopup(imageCard));

  return cloneCardTemplate;
}

//Функция удаления карточки
function handleDelCard(evt){
  evt.target.closest('.places__item').remove();
}

function handleLikeCard(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}

function openImageCardPopup(imageCard){
  nameImage.textContent = imageCard.alt;
  urlImage.src = imageCard.src;
  urlImage.alt = imageCard.alt;
  openModal(imagePopup);
}

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function openCardPopup() {
  nameCardInput.value = null;
  urlCardInput.value = null;
  openModal(cardPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
  inactivateButton(profileSubmitBtn, validationSettings);
}

function handleCardFormSubmit(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  placesList.prepend(createCard({name: nameCardInput.value, link: urlCardInput.value}));
  closeModal(cardPopup);
}

profileEditButton.addEventListener('click', openProfilePopup);
//closeProfileEditButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', openCardPopup);
//closeCardAddButton.addEventListener('click', () => closeModal(cardPopup));
//closeImageButton.addEventListener('click', () => closeModal(imagePopup));
popups.forEach((item) => {
  item.querySelector('.popup__close').addEventListener('click', () => closeModal(item));
  item.addEventListener('mousedown', function(evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(item);
    }
  })
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

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