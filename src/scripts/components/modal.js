// Функция открытия Popup
export function openPopup(popup) {
  popup.classList.replace("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", closePopupOnEscape);
}

// Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.replace("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closePopupOnEscape);
}

export function loadingPopupState(popup, state) {
  if (state) {
    popup.querySelector(".popup__button").textContent = "Сохранение...";
  } else {
    popup.querySelector(".popup__button").textContent = "Сохранить";
  }
}



function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}
