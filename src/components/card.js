//Функция создания карточки
function createCard(itemCard, handleImageClick) {
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
    imageCard.addEventListener('click', () => handleImageClick(imageCard));
  
    return cloneCardTemplate;
}
  
  //Функция удаления карточки
function handleDelCard(evt){
    evt.target.closest('.places__item').remove();
}
  
function handleLikeCard(evt){
    evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard}