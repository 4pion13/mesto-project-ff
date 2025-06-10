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
  const popupIsOpened = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popupIsOpened);
  }
}
