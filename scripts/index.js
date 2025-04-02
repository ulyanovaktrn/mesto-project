const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

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