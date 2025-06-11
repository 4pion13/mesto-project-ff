import "../styles/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  deleteCard,
  addToggleLikeButton,
  formingCardTemplate,
} from "./components/card.js";
import profileImage from "../images/avatar.jpg";
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImageCloseButton = popupImage.querySelector(".popup__close");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenButton = document.querySelector(".profile__add-button");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");
const popupNewCardForm = popupNewCard.querySelector(".popup__form");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileEditOpenButton = document.querySelector(
  ".profile__edit-button"
);
const popupProfileEditForm = popupProfileEdit.querySelector(".popup__form");
const popupProfileEditCloseButton =
  popupProfileEdit.querySelector(".popup__close");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");

profile.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${profileImage})`;
[popupImage, popupNewCard, popupProfileEdit].forEach((element) => {
  element.classList.add("popup_is-animated");
});
// Обработчики событий
function closePopupEvent(popup, closeButton) {
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
}
// Обработчик открытия модального окна (редактирование профиля) по нажатию на кнопку
function openProfilePopupEditEvent(popup, openButton) {
  openButton.addEventListener("click", () => {
    openPopup(popup);
    const popupInputTitle = popupProfileEdit.querySelector(
      ".popup__input_type_name"
    );
    const popupInputDescription = popupProfileEdit.querySelector(
      ".popup__input_type_description"
    );
    popupInputTitle.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
  });
}

// Обработчик открытия модального окна по нажатию на кнопку
function openPopupOnclickEvent(popup, openButton) {
  openButton.addEventListener("click", () => {
    openPopup(popup);
  });
}

// Обработчик закрытия модального окна по нажатию на Оверлей
function closePopupOnOverlayClick(popup) {
  const popupContent = popup.querySelector(".popup__content");
  popup.addEventListener("click", (evt) => {
    if (!popupContent.contains(evt.target)) {
      closePopup(popup);
    }
  });
}

// Обработчик открытия Popup с просмотром изображения
function openImagePopupEvent(evt) {
  openPopup(popupImage);
  popupImagePhoto.src = evt.target.src || "";
  popupImagePhoto.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
}

// Функция создания карточки
function appendNewCardEvent(popup, form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("place-name"),
      link: formData.get("link"),
    };
    cardList.prepend(formingCardTemplate(data, openImagePopupEvent));
    form.reset();
    closePopup(popup);
  });
}

// Функция изменения данных в профиле
function changingProfileDataEvent(popup, form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
    };
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.description;
    form.reset();
    closePopup(popup);
  });
}

function addListenerPopup() {
  // Обработчики закрытия модальных окон
  closePopupEvent(popupNewCard, popupNewCardCloseButton);
  closePopupEvent(popupProfileEdit, popupProfileEditCloseButton);
  closePopupEvent(popupImage, popupImageCloseButton);

  //   Обработчики закрытия модальных окон через оверлей
  closePopupOnOverlayClick(popupNewCard);
  closePopupOnOverlayClick(popupProfileEdit);
  closePopupOnOverlayClick(popupImage);

  // Обработчик открытия модальных окон
  openProfilePopupEditEvent(popupProfileEdit, popupProfileEditOpenButton);
  openPopupOnclickEvent(popupNewCard, popupNewCardOpenButton);

  // Обработчик события добавления карточки
  appendNewCardEvent(popupNewCard, popupNewCardForm);

  // Обработчик события изменения данных профиля
  changingProfileDataEvent(popupProfileEdit, popupProfileEditForm);
}

// Вывод карточек на страницу
function renderCards(cardContent) {
  function addElementToCardList() {
    cardContent.forEach((element) => {
      cardList.append(formingCardTemplate(element, openImagePopupEvent));
    });
  }
  addElementToCardList();
}

// start
renderCards(initialCards);
addListenerPopup();
