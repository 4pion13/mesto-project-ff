// Формирования карточки
function formingCardTemplate(card, openPopupEvent) {
  const сardTemplate = document.querySelector("#card-template").content;
  const cardElement = сardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  deleteCardButton.addEventListener("click", (evt) => {
    deleteCard(evt.target.parentElement);
  });

  likeCardButton.addEventListener("click", (evt) => {
    addToggleLikeButton(evt);
  });

  cardImage.addEventListener("click", (evt) => {
    openPopupEvent(evt);
  });
  return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove(card);
}

// Функция переключателя лайка
function addToggleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { formingCardTemplate, addToggleLikeButton, deleteCard };
