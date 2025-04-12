const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


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