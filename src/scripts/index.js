import "../styles/index.css";
import {
  openPopup,
  closePopup,
  loadingPopupState,
} from "./components/modal.js";
import {
  deleteCard,
  addToggleLikeButton,
  formingCardTemplate,
} from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getPersonalInformation,
  getInitialCards,
  updateProfileData,
  addCardData,
  deleteCardRequest,
  addLikeRequest,
  deleteLikeRequest,
  updateAvatarRequest,
} from "./components/api.js";
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

const popupAvatarEdit = document.querySelector(".popup_type_edit_avatar");
const popupAvatarEditOpenButton = profile.querySelector(".profile__image");
const popupAvatarEditCloseButton =
  popupAvatarEdit.querySelector(".popup__close");
const popupAvatarEditForm = popupAvatarEdit.querySelector(".popup__form");

[popupImage, popupNewCard, popupProfileEdit, popupAvatarEdit].forEach(
  (element) => {
    element.classList.add("popup_is-animated");
  }
);
// Конфиг валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardConfigRequests = {
  deleteCardRequest: deleteCardRequest,
  addLikeRequest: addLikeRequest,
  deleteLikeRequest: deleteLikeRequest,
};
function setProfileImage(imageUrl) {
  profile.querySelector(
    ".profile__image"
  ).style.backgroundImage = `url(${imageUrl})`;
}

function fillingProfileData(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  setProfileImage(profileData.avatar);
}

// Обработчики событий
function closePopupEvent(popup, closeButton) {
  closeButton.addEventListener("click", () => {
    closePopup(popup);
    clearValidation(popupProfileEditForm, validationConfig);
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
      clearValidation(popupProfileEditForm, validationConfig);
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
    loadingPopupState(popup, true);
    addCardData(data.name, data.link).then((res) => {
      getPersonalInformation().then((profileData) => {
        cardList.prepend(
          formingCardTemplate(
            res,
            openImagePopupEvent,
            profileData._id,
            cardConfigRequests
          )
        );
        form.reset();
        closePopup(popup);
        loadingPopupState(popup, false);
      });
    });
  });
}

function updateAvatarEvent(popup, form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    loadingPopupState(popup, true);
    updateAvatarRequest(formData.get("link")).then((res) => {
      setProfileImage(res.avatar);
      form.reset();
      closePopup(popup);
      loadingPopupState(popup, false);
    });
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
    loadingPopupState(popup, true);
    updateProfileData(data.name, data.description).then((updateData) => {
      fillingProfileData(updateData);
      form.reset();
      closePopup(popup);
      loadingPopupState(popup, false);
    });
  });
}

function addListenerPopup() {
  // Обработчики закрытия модальных окон
  closePopupEvent(popupNewCard, popupNewCardCloseButton);
  closePopupEvent(popupProfileEdit, popupProfileEditCloseButton);
  closePopupEvent(popupImage, popupImageCloseButton);
  closePopupEvent(popupAvatarEdit, popupAvatarEditCloseButton);

  //   Обработчики закрытия модальных окон через оверлей
  closePopupOnOverlayClick(popupNewCard);
  closePopupOnOverlayClick(popupProfileEdit);
  closePopupOnOverlayClick(popupImage);
  closePopupOnOverlayClick(popupAvatarEdit);

  // Обработчик открытия модальных окон
  openProfilePopupEditEvent(popupProfileEdit, popupProfileEditOpenButton);
  openPopupOnclickEvent(popupNewCard, popupNewCardOpenButton);
  openPopupOnclickEvent(popupAvatarEdit, popupAvatarEditOpenButton);

  // Обработчик события добавления карточки
  appendNewCardEvent(popupNewCard, popupNewCardForm);

  // Обработчик события изменения данных профиля
  changingProfileDataEvent(popupProfileEdit, popupProfileEditForm);

  // Обработчик события изменения картинки профиля
  updateAvatarEvent(popupAvatarEdit, popupAvatarEditForm);
}

// Вывод карточек на страницу
function renderCards(cardContent, profileData) {
  function addElementToCardList() {
    cardContent.forEach((element) => {
      cardList.append(
        formingCardTemplate(
          element,
          openImagePopupEvent,
          profileData._id,
          cardConfigRequests
        )
      );
    });
  }
  addElementToCardList();
}

// start
Promise.all([getPersonalInformation(), getInitialCards()])
  .then(([profileData, cards]) => {
    fillingProfileData(profileData);
    renderCards(cards, profileData);
  })
  .catch((err) => {
    console.error("Ошибка при получении данных:", err);
  });
addListenerPopup();
enableValidation(validationConfig);
