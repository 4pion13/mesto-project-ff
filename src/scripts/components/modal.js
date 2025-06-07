import { profileTitle, profileDescription } from "./profile.js";

// @todo: DOM узлы
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

// Функция открытия/закрытия popup
function showPopup(popup, show = true) {
  if (show) {
    popup.classList.remove("popup_is-animated");
    popup.classList.add("popup_is-opened");
  } else {
    popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
  }
}

// Открытие/Закрытие popup через кнопку
function enablePopupToggle(
  popup,
  openButton,
  closeButton,
  data = false,
  dataType
) {
  popup.classList.add("popup_is-animated");
  openButton.addEventListener("click", () => {
    showPopup(popup);
    closePopupOnEscape(popup);
    if (data) {
      appendDataPopup(data, dataType);
    }
  });

  closeButton.addEventListener("click", () => {
    showPopup(popup, false);
    closePopupOnEscape(popup, true);
  });
}

// Закрытие popup через нажатие на overlay
function closePopupOnOverlayClick(popup) {
  const popupContent = popup.querySelector(".popup__content");
  popup.addEventListener("click", (evt) => {
    if (!popupContent.contains(evt.target)) {
      showPopup(popup, false);
    }
  });
  popup.addEventListener("mousemove", (evt) => {
    if (!popupContent.contains(evt.target)) {
      popup.style.cursor = "pointer";
    } else {
      popup.style.cursor = "default";
    }
  });
}

// Функция закрытия Popup по кнопке Escape
function closePopupOnEscape(popup, deleteEventListener = false) {
  function close(evt) {
    if (evt.key === "Escape") {
      showPopup(popup, false);
      document.removeEventListener("keydown", close);
    }
  }
  document.addEventListener("keydown", close);
  if (deleteEventListener) {
    document.removeEventListener("keydown", close);
  }
}

// Добавление данных в popup
function appendDataPopup(data, type) {
  switch (type) {
    case "image":
      popupImagePhoto.src = data.image || "";
      popupImagePhoto.alt = data.caption;
      popupImageCaption.textContent = data.caption;
      break;
    case "text":
      const popupInputTitle = popupProfileEdit.querySelector(
        ".popup__input_type_name"
      );
      const popupInputDescription = popupProfileEdit.querySelector(
        ".popup__input_type_description"
      );
      popupInputTitle.value = profileTitle.textContent;
      popupInputDescription.value = profileDescription.textContent;
      break;
  }
}

function addListenerPopup() {
  // Слушатели открытия и закрытия модальных окон
  enablePopupToggle(
    popupNewCard,
    popupNewCardOpenButton,
    popupNewCardCloseButton,
    popupNewCardForm
  );
  enablePopupToggle(
    popupProfileEdit,
    popupProfileEditOpenButton,
    popupProfileEditCloseButton,
    true,
    "text"
  );

  //   Слушатели закрытия модальных окон через оверлей
  closePopupOnOverlayClick(popupNewCard);
  closePopupOnOverlayClick(popupProfileEdit);
}

export {
  enablePopupToggle,
  popupImageCloseButton,
  popupImage,
  popupNewCardForm,
  addListenerPopup,
  closePopupOnOverlayClick,
  popupNewCard,
  showPopup,
  popupProfileEdit,
  popupProfileEditForm,
};
