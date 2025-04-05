const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileFormElement = document.querySelector('.popup__form');

const profileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEditButton = profilePopup.querySelector('.popup__close')

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector(".places__list");

// @todo: DOM узлы

//Функция создания карточки
function createCard(itemCard) {
  const cloneCardTemplate = cardTemplate.content.cloneNode(true);
  const imageCard = cloneCardTemplate.querySelector('.card__image');
  const titleCard = cloneCardTemplate.querySelector('.card__title');

  imageCard.src = itemCard.link;
  imageCard.alt = itemCard.name;
  titleCard.textContent = itemCard.name;

  return itemCard;
}

//Функция удаления карточки


//Вывести карточки на страницу
initialCards.forEach((item) => {
  //console.log(createCard(item));
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

profileEditButton.addEventListener('click', openProfilePopup);
closeProfileEditButton.addEventListener('click', () => closeModal(profilePopup));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);