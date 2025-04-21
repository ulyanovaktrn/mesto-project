import { toggleLike } from "./api";

//Функция создания карточки
function createCard(itemCard, profileId, handleImageClick) {
    const cloneCardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const imageCard = cloneCardTemplate.querySelector('.card__image');
    const titleCard = cloneCardTemplate.querySelector('.card__title');
  
    const likeCardBtn = cloneCardTemplate.querySelector('.card__like-button');
    const delCardBtn = cloneCardTemplate.querySelector('.card__delete-button');

    const likeNum = cloneCardTemplate.querySelector('.card__like-num');
    const cardId = itemCard._id;

    imageCard.src = itemCard.link;
    imageCard.alt = itemCard.name;
    titleCard.textContent = itemCard.name;
    likeNum.textContent = itemCard.likes.length;

    if (itemCard.likes.some(like => like._id === profileId)) {
        likeCardBtn.classList.add('card__like-button_is-active');
    }
  
    likeCardBtn.addEventListener('click', (evt) => handleLikeCard(evt, likeNum, cardId));
    delCardBtn.addEventListener('click', handleDelCard);
    imageCard.addEventListener('click', () => handleImageClick(imageCard));
  
    return cloneCardTemplate;
}
  
  //Функция удаления карточки
function handleDelCard(evt){
    evt.target.closest('.places__item').remove();
}
  
function handleLikeCard(evt, likeNum, cardId){
    toggleLike(cardId, !evt.target.classList.toggle('card__like-button_is-active'))
        .then(cardData => {
            likeNum.textContent = cardData.likes.length;
        })
        .catch(err => {
            console.log(err);
        });
}

export {createCard}