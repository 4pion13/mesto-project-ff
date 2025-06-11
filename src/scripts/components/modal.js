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

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}
