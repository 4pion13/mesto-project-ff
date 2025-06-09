// Функция удаления карточки
function deleteCard(card) {
  card.remove(card);
}

// Функция переключателя лайка
function addToggleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { addToggleLikeButton, deleteCard };
