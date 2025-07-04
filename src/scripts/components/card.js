// Формирования карточки
function formingCardTemplate(
  card,
  openPopupEvent,
  profileId,
  cardConfigRequests
) {
  const сardTemplate = document.querySelector("#card-template").content;
  const cardElement = сardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardCounter = cardElement.querySelector(".card__like-counter");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  setCardCounter(cardCounter, card);

  if (card.owner._id !== profileId) {
    deleteCardButton.remove();
  }

  card.likes.map((card) => {
    if (card._id === profileId) {
      likeCardButton.classList.add("card__like-button_is-active");
    }
  });

  deleteCardButton.addEventListener("click", (evt) => {
    deleteCard(
      evt.target.parentElement,
      cardConfigRequests.deleteCardRequest,
      card._id
    );
  });

  likeCardButton.addEventListener("click", (evt) => {
    addToggleLikeButton(card, profileId, cardConfigRequests)
      .then((res) => {
        evt.target.classList.toggle("card__like-button_is-active");
        card.likes = res.likes;
        setCardCounter(cardCounter, card);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  cardImage.addEventListener("click", (evt) => {
    openPopupEvent(evt);
  });
  return cardElement;
}

function setCardCounter(cardCounter, card) {
  cardCounter.textContent = card.likes.length;
}

// Функция удаления карточки
function deleteCard(card, deleteCardRequest, cardId) {
  deleteCardRequest(cardId)
    .then((res) => {
      card.remove(card);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция переключателя лайка
function addToggleLikeButton(card, profileId, cardConfigRequests) {
  const cardLikesListId = [];
  card.likes.map((like) => {
    cardLikesListId.push(like._id);
  });
  if (cardLikesListId.includes(profileId)) {
    return cardConfigRequests.deleteLikeRequest(card._id).then((res) => {
      return res;
    });
  } else {
    return cardConfigRequests.addLikeRequest(card._id).then((res) => {
      return res;
    });
  }
}

export { formingCardTemplate, addToggleLikeButton, deleteCard };
