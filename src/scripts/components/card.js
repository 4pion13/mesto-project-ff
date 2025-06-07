import {
  popupImageCloseButton,
  enablePopupToggle,
  popupImage,
  closePopupOnOverlayClick,
  showPopup,
} from "./modal.js";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// Формирования карточки
function cardTempalte(card) {
  const cardTempalte = document.querySelector("#card-template").content;
  const cardElement = cardTempalte
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

  enablePopupToggle(
    popupImage,
    cardImage,
    popupImageCloseButton,
    {
      caption: cardImage.alt,
      image: cardImage.src,
    },
    "image"
  );
  closePopupOnOverlayClick(popupImage);
  return cardElement;
}

// @todo: Функция создания карточки
function createCard(popup, form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("place-name"),
      link: formData.get("link"),
    };
    cardList.prepend(cardTempalte(data));
    form.reset();
    showPopup(popup, false);
  });
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove(card);
}

function addToggleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Вывести карточки на страницу

function renderCards(cardContent) {
  function addElementToCardList() {
    cardContent.forEach((element) => {
      cardList.append(cardTempalte(element));
    });
  }
  addElementToCardList();
}

export { createCard, renderCards, addToggleLikeButton, deleteCard };
