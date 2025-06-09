// Функция открытия Popup
export function openPopup(popup) {
  popup.classList.remove("popup_is-animated");
  popup.classList.add("popup_is-opened");
  const handler = closePopupOnEscape(popup);
  popup._escapeHandler = handler;
  document.addEventListener("keydown", handler);
}

// Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", popup._escapeHandler);
}


function closePopupOnEscape(popup) {
  return function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };
}