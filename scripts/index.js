// @todo: Темплейт карточки
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
    cardDelete(evt.target.parentElement);
  });

  likeCardButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  enablePopupToggle(popupImage, cardImage, popupImageCloseButton, {
    caption: cardImage.alt,
    image: cardImage.src,
  });

  return cardElement;
}

// @todo: DOM узлы
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenButton = document.querySelector(".profile__add-button");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");
const popupForm = popupNewCard.querySelector(".popup__form");
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// @todo: Функция создания карточки
function createCard(form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("place-name"),
      link: formData.get("link"),
    };
    initialCards.push(data);
    renderCards(initialCards);
    form.reset();
  });
}

// @todo: Функция удаления карточки
function cardDelete(card) {
    console.log(card)
  card.remove(card);
}

// Открытие/Закрытие popup
function enablePopupToggle(popup, openButton, closeButton, data) {
  openButton.addEventListener("click", () => {
    popup.classList.add("popup_is-opened");
    if (data) {
      appendDataImagePopup(data);
    }
  });

  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_is-opened");
  });
}

function appendDataImagePopup(data) {
  console.log(data.image);
  popupImagePhoto.src = data.image;
  popupImagePhoto.alt = data.caption;
  popupImageCaption.textContent = data.caption;
}

// @todo: Вывести карточки на страницу

function renderCards(cardContent) {
  const cardList = document.querySelector(".places__list");
  function cardListAddElements() {
    cardContent.forEach((element) => {
      cardList.append(cardTempalte(element));
    });
  }
  if (cardList.children.length === 0) {
    cardListAddElements();
  } else {
    while (cardList.firstChild) {
      cardList.removeChild(cardList.firstChild);
    }
    cardListAddElements();
  }
}

renderCards(initialCards);
enablePopupToggle(
  popupNewCard,
  popupNewCardOpenButton,
  popupNewCardCloseButton,
  popupForm
);
createCard(popupForm);
