const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const cardFormElement = document.querySelector('.popup__form[name="new-place"]');

const profileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEditButton = profilePopup.querySelector('.popup__close');
const cardAddButton = document.querySelector('.profile__add-button');
const closeCardAddButton = cardPopup.querySelector('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const nameCardInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlCardInput = cardPopup.querySelector('.popup__input_type_url');

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

//Функция создания карточки
function createCard(itemCard) {
  const cloneCardTemplate = cardTemplate.content.cloneNode(true);
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

}

function handleLikeCard(evt){

}

function openImageCardPopup(imageCard){
  
}

//Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item));
});


function openModal(popup){
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
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
}

function handleCardFormSubmit(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  placesList.prepend(createCard({name: nameCardInput.value, link: urlCardInput.value}));
  closeModal(cardPopup);
}

profileEditButton.addEventListener('click', openProfilePopup);
closeProfileEditButton.addEventListener('click', () => closeModal(profilePopup));
cardAddButton.addEventListener('click', openCardPopup);
closeCardAddButton.addEventListener('click', () => closeModal(cardPopup));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);