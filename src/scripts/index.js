import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard, renderCards } from "./components/card.js";
import {
  popupNewCard,
  popupNewCardForm,
  addListenerPopup,
  popupProfileEditForm,
  popupProfileEdit,
} from "./components/modal.js";
import { changingProfileData } from "./components/profile.js";

// start
(function start() {
  renderCards(initialCards);
  createCard(popupNewCard, popupNewCardForm);
  changingProfileData(popupProfileEdit, popupProfileEditForm);
  addListenerPopup();
})();
